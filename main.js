// ═══════════════════════════════════════════════════
//  main.js — LawLoom Landing Page
//  FIXES:
//   ✅ Auth guard: redirect to dashboard if already logged in
//   ✅ Escape key closes modal
//   ✅ showLogin() no longer flashes on page load
//   ✅ Email stored in sessionStorage for protected API calls
//   ✅ Removed duplicate history.scrollRestoration code
//   ✅ Forms start hidden; active state set only when modal opens
//   ✅ Register uses FormData (fixes multer/JSON conflict)
//   ✅ Fixed inconsistent indentation in fetch blocks
//   ✅ Fixed bare catch blocks (added error param)
// ═══════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function () {

    // ── AUTH GUARD ─────────────────────────────────
    const existingUser = sessionStorage.getItem("lawloom_user");
    const existingRole = sessionStorage.getItem("lawloom_role");
    if (existingUser && existingRole) {
        window.location.href = existingRole === "lawyer"
            ? "lawyer-dashboard.html?user=" + encodeURIComponent(existingUser)
            : "dashboard.html?user=" + encodeURIComponent(existingUser);
        return;
    }

    const loginForm     = document.getElementById("login");
    const roleSelect    = document.getElementById("role-select");
    const registerForm  = document.getElementById("register");
    const authContainer = document.getElementById("authContainer");
    const formShadow    = document.getElementById("formShadow");
    let currentRole     = null;
    let modalOpen       = false;

    function setInitialState() {
        [loginForm, roleSelect, registerForm].forEach(el => {
            el.classList.remove("active", "hide");
        });
    }

    function hideAll() {
        [loginForm, roleSelect, registerForm].forEach(el => {
            el.classList.remove("active");
            el.classList.add("hide");
        });
    }

    function showLogin() {
        hideAll();
        loginForm.classList.remove("hide");
        loginForm.classList.add("active");
    }

    function showRoleSelect() {
        hideAll();
        roleSelect.classList.remove("hide");
        roleSelect.classList.add("active");
    }

    function showRegister(role) {
        currentRole = role;
        const barGroup = document.getElementById("barCouncilGroup");
        const badge    = document.getElementById("selectedRoleBadge");
        const subtitle = document.getElementById("register-subtitle");
        if (role === "lawyer") {
            barGroup.style.display = "flex";
            subtitle.textContent   = "Registering as a Licensed Lawyer";
            badge.textContent      = "⚖ Lawyer";
            badge.className        = "selected-role-badge lawyer";
        } else {
            barGroup.style.display = "none";
            subtitle.textContent   = "Registering as a Regular User";
            badge.textContent      = "👤 Regular User";
            badge.className        = "selected-role-badge user";
        }
        hideAll();
        registerForm.classList.remove("hide");
        registerForm.classList.add("active");
    }

    // ── Public functions called from HTML onclick ──
    window.openForm = function (type) {
        if (!modalOpen) {
            setInitialState();
            if (type === "login") {
                loginForm.classList.add("active");
            } else {
                roleSelect.classList.add("active");
            }
        } else {
            if (type === "login") showLogin();
            else showRoleSelect();
        }
        authContainer.classList.add("active");
        formShadow.classList.add("active");
        document.body.style.overflow = "hidden";
        modalOpen = true;
    };

    window.closeForm = function () {
        authContainer.classList.remove("active");
        formShadow.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    window.selectRole = function (role) { showRegister(role); };

    // ── Escape key closes modal ───────────────────
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && authContainer.classList.contains("active")) {
            window.closeForm();
        }
    });

    // ── Nav link wiring ───────────────────────────
    document.getElementById("goToRegister").addEventListener("click",          e => { e.preventDefault(); showRoleSelect(); });
    document.getElementById("goToLoginFromRole").addEventListener("click",     e => { e.preventDefault(); showLogin(); });
    document.getElementById("goToLoginFromRegister").addEventListener("click", e => { e.preventDefault(); showLogin(); });
    document.getElementById("backToRoleSelect").addEventListener("click",      () => showRoleSelect());

    // ── Password toggle ───────────────────────────
    document.querySelectorAll(".password-toggle").forEach(toggle => {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling;
            input.setAttribute("type", input.type === "password" ? "text" : "password");
            this.classList.toggle("bx-show");
            this.classList.toggle("bx-hide");
        });
    });

    // ── Validation helpers ────────────────────────
    function showError(inputEl, message) {
        clearError(inputEl);
        inputEl.classList.add("input-error");
        const err = document.createElement("span");
        err.className   = "error-msg";
        err.textContent = message;
        inputEl.closest(".input-group").appendChild(err);
    }

    function clearError(inputEl) {
        inputEl.classList.remove("input-error");
        const existing = inputEl.closest(".input-group").querySelector(".error-msg");
        if (existing) existing.remove();
    }

    function clearAllErrors(container) {
        container.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
        container.querySelectorAll(".error-msg").forEach(el => el.remove());
    }

    function showToast(message, type = "error") {
        const existing = document.querySelector(".toast");
        if (existing) existing.remove();
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class='bx ${type === "success" ? "bx-check-circle" : "bx-error-circle"}'></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }

    const isValidEmail      = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const isValidBarCouncil = val   => /^[A-Z]{2,}\/\d{4}\/\d{3,6}$/i.test(val.trim());

    // ── LOGIN ─────────────────────────────────────
    document.getElementById("loginSubmitBtn").addEventListener("click", async function () {
        clearAllErrors(loginForm);
        const emailEl    = document.getElementById("login-email");
        const passwordEl = document.getElementById("login-password");
        let valid = true;

        if (!emailEl.value.trim())             { showError(emailEl, "Email address is required."); valid = false; }
        else if (!isValidEmail(emailEl.value)) { showError(emailEl, "Please enter a valid email address."); valid = false; }
        if (!passwordEl.value.trim())          { showError(passwordEl, "Password is required."); valid = false; }
        else if (passwordEl.value.length < 6)  { showError(passwordEl, "Password must be at least 6 characters."); valid = false; }
        if (!valid) return;

        const btn = this;
        btn.disabled  = true;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Signing in...`;

        try {
            const res = await fetch("https://lawloom-backend.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: emailEl.value.trim(),
                    password: passwordEl.value
                })
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.message || "Login failed.", "error");
                btn.disabled  = false;
                btn.innerHTML = `<i class='bx bx-log-in'></i> Sign In`;
                return;
            }

            sessionStorage.setItem("lawloom_user",  data.user.name);
            sessionStorage.setItem("lawloom_role",  data.user.role);
            sessionStorage.setItem("lawloom_email", data.user.email);
            sessionStorage.setItem("lawloom_token", data.token);

            showToast("Signed in successfully! Welcome back.", "success");
            setTimeout(() => {
                window.location.href = data.user.role === "lawyer"
                    ? "lawyer-dashboard.html?user=" + encodeURIComponent(data.user.name)
                    : "dashboard.html?user=" + encodeURIComponent(data.user.name);
            }, 1200);

        } catch (err) {
            console.error("Login error:", err);
            showToast("Cannot reach server. Please try again.", "error");
            btn.disabled  = false;
            btn.innerHTML = `<i class='bx bx-log-in'></i> Sign In`;
        }
    });

    // ── REGISTER ─────────────────────────────────
    document.getElementById("registerSubmitBtn").addEventListener("click", async function () {
        clearAllErrors(registerForm);
        const fullnameEl        = document.getElementById("register-fullname");
        const emailEl           = document.getElementById("register-email");
        const barCouncilEl      = document.getElementById("bar-council-number");
        const passwordEl        = document.getElementById("register-password");
        const confirmPasswordEl = document.getElementById("register-confirm-password");
        let valid = true;

        if (!fullnameEl.value.trim())                { showError(fullnameEl, "Full name is required."); valid = false; }
        else if (fullnameEl.value.trim().length < 3) { showError(fullnameEl, "Name must be at least 3 characters."); valid = false; }
        if (!emailEl.value.trim())                   { showError(emailEl, "Email address is required."); valid = false; }
        else if (!isValidEmail(emailEl.value))       { showError(emailEl, "Please enter a valid email address."); valid = false; }

        if (currentRole === "lawyer") {
            if (!barCouncilEl.value.trim())                  { showError(barCouncilEl, "Bar Council Enrollment Number is required."); valid = false; }
            else if (!isValidBarCouncil(barCouncilEl.value)) { showError(barCouncilEl, "Format must be e.g. STATE/1234/2025"); valid = false; }
        }

        if (!passwordEl.value.trim())                { showError(passwordEl, "Password is required."); valid = false; }
        else if (passwordEl.value.length < 6)        { showError(passwordEl, "Password must be at least 6 characters."); valid = false; }
        if (!confirmPasswordEl.value.trim())         { showError(confirmPasswordEl, "Please confirm your password."); valid = false; }
        else if (passwordEl.value !== confirmPasswordEl.value) { showError(confirmPasswordEl, "Passwords do not match."); valid = false; }
        if (!valid) return;

        const btn = this;
        btn.disabled  = true;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Creating Account...`;

        try {
            // ✅ FIX: Use FormData so multer can parse the request correctly
            const formData = new FormData();
            formData.append("name",     fullnameEl.value.trim());
            formData.append("email",    emailEl.value.trim());
            formData.append("password", passwordEl.value);
            formData.append("role",     currentRole || "user");
            if (currentRole === "lawyer") {
                formData.append("barCouncilNumber", barCouncilEl.value.trim());
                const pdfFile = document.getElementById("bar-council-pdf")?.files[0];
                if (pdfFile) formData.append("barCouncilPDF", pdfFile);
            }

            const res = await fetch("https://lawloom-backend.onrender.com/api/auth/register", {
                method: "POST",
                // ⚠️ Do NOT set Content-Type — browser sets it with boundary automatically
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                showToast(data.message || "Registration failed.", "error");
                btn.disabled  = false;
                btn.innerHTML = `<i class='bx bx-user-plus'></i> Create Account`;
                return;
            }

            sessionStorage.setItem("lawloom_user",  data.user.name);
            sessionStorage.setItem("lawloom_role",  data.user.role);
            sessionStorage.setItem("lawloom_email", data.user.email);
            sessionStorage.setItem("lawloom_token", data.token);

            showToast("Account created! Welcome to LawLoom.", "success");
            setTimeout(() => {
                window.location.href = currentRole === "lawyer"
                    ? "lawyer-dashboard.html?user=" + encodeURIComponent(data.user.name)
                    : "dashboard.html?user=" + encodeURIComponent(data.user.name);
            }, 1200);

        } catch (err) {
            console.error("Register error:", err);
            showToast("Cannot reach server. Please try again.", "error");
            btn.disabled  = false;
            btn.innerHTML = `<i class='bx bx-user-plus'></i> Create Account`;
        }
    });

    // ── Clear error as user types ─────────────────
    document.querySelectorAll(".input-field").forEach(input => {
        input.addEventListener("input", function () { clearError(this); });
    });

    // ── SCROLL SPY ────────────────────────────────
    const sections = ["home", "about", "contact"];
    const navLinks = document.querySelectorAll(".nav .link");

    function updateActiveLink() {
        const scrollY = window.scrollY + 120;
        let current = "home";
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && section.offsetTop <= scrollY) current = id;
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-section") === current) link.classList.add("active");
        });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.getElementById(this.getAttribute("data-section"));
            if (target) window.scrollTo({ top: target.offsetTop - 85, behavior: "smooth" });
        });
    });

    // ── CONTACT FORM ──────────────────────────────
    const nameInput    = document.getElementById("contact-name");
    const emailInput   = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    const sendBtn      = document.getElementById("sendBtn");

    function showContactError(input, msg) {
        clearContactError(input);
        input.style.borderColor = "#e53e3e";
        input.style.boxShadow   = "0 0 0 3px rgba(229,62,62,0.15)";
        const err = document.createElement("span");
        err.className   = "contact-error-msg";
        err.textContent = "⚠ " + msg;
        err.style.cssText = "color:#fc8181;font-size:12px;margin-top:5px;display:block;";
        input.parentNode.appendChild(err);
    }

    function clearContactError(input) {
        input.style.borderColor = "";
        input.style.boxShadow   = "";
        const err = input.parentNode.querySelector(".contact-error-msg");
        if (err) err.remove();
    }

    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener("input", () => clearContactError(input));
    });

    sendBtn.addEventListener("click", function () {
        let valid = true;
        clearContactError(nameInput);
        clearContactError(emailInput);
        clearContactError(messageInput);

        if (!nameInput.value.trim())                   { showContactError(nameInput, "Your name is required."); valid = false; }
        else if (nameInput.value.trim().length < 2)    { showContactError(nameInput, "Name must be at least 2 characters."); valid = false; }
        if (!emailInput.value.trim())                  { showContactError(emailInput, "Email address is required."); valid = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) { showContactError(emailInput, "Please enter a valid email address."); valid = false; }
        if (!messageInput.value.trim())                { showContactError(messageInput, "Please enter your message."); valid = false; }
        else if (messageInput.value.trim().length < 10) { showContactError(messageInput, "Message must be at least 10 characters."); valid = false; }

        if (valid) {
            showToast("Message sent successfully! We'll get back to you soon.", "success");
            nameInput.value    = "";
            emailInput.value   = "";
            messageInput.value = "";
        }
    });

    // ── Scroll restoration ────────────────────────
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

}); // end DOMContentLoaded

window.addEventListener("pageshow", () => window.scrollTo(0, 0));
