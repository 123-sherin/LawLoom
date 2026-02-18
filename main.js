document.addEventListener("DOMContentLoaded", function () {

    // ─── Element References ───────────────────────────────────────────────
    const loginForm     = document.getElementById("login");
    const roleSelect    = document.getElementById("role-select");
    const registerForm  = document.getElementById("register");
    const authContainer = document.querySelector(".auth-container");
    const formShadow    = document.getElementById("formShadow");

    let currentRole = null;

    // ─── Hide all panels ──────────────────────────────────────────────────
    function hideAll() {
        [loginForm, roleSelect, registerForm].forEach(el => {
            el.classList.remove("active", "hide");
            el.classList.add("hide");
        });
    }

    function showLogin()      { hideAll(); loginForm.classList.remove("hide");  loginForm.classList.add("active"); }
    function showRoleSelect() { hideAll(); roleSelect.classList.remove("hide"); roleSelect.classList.add("active"); }

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

    window.openForm = function (type) {
        authContainer.classList.add("active");
        formShadow.classList.add("active");
        document.body.style.overflow = "hidden";
        if (type === "login") showLogin();
        else showRoleSelect();
    };

    window.closeForm = function () {
        authContainer.classList.remove("active");
        formShadow.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    window.selectRole = function (role) { showRegister(role); };

    // ─── Navigation Links ─────────────────────────────────────────────────
    document.getElementById("goToRegister").addEventListener("click",          e => { e.preventDefault(); showRoleSelect(); });
    document.getElementById("goToLoginFromRole").addEventListener("click",     e => { e.preventDefault(); showLogin(); });
    document.getElementById("goToLoginFromRegister").addEventListener("click", e => { e.preventDefault(); showLogin(); });
    document.getElementById("backToRoleSelect").addEventListener("click",      () => showRoleSelect());

    // ─── Password Toggle ──────────────────────────────────────────────────
    document.querySelectorAll(".password-toggle").forEach(toggle => {
        toggle.addEventListener("click", function () {
            const input = this.previousElementSibling;
            input.setAttribute("type", input.type === "password" ? "text" : "password");
            this.classList.toggle("bx-show");
            this.classList.toggle("bx-hide");
        });
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  VALIDATION HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    function showError(inputEl, message) {
        clearError(inputEl);
        inputEl.classList.add("input-error");
        const err = document.createElement("span");
        err.className = "error-msg";
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

    // ═══════════════════════════════════════════════════════════════════════
    //  LOGIN VALIDATION
    // ═══════════════════════════════════════════════════════════════════════
    loginForm.querySelector(".submit-btn").addEventListener("click", function () {
        clearAllErrors(loginForm);
        const email    = document.getElementById("login-email");
        const password = document.getElementById("login-password");
        let valid = true;

        if (!email.value.trim()) {
            showError(email, "Email address is required."); valid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, "Please enter a valid email address."); valid = false;
        }

        if (!password.value.trim()) {
            showError(password, "Password is required."); valid = false;
        } else if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters."); valid = false;
        }

        if (valid) {
            showToast("Signed in successfully! Welcome back.", "success");
            // ← Replace with your actual login / API call
        }
    });

    // ═══════════════════════════════════════════════════════════════════════
    //  REGISTER VALIDATION
    // ═══════════════════════════════════════════════════════════════════════
    registerForm.querySelector(".submit-btn").addEventListener("click", function () {
        clearAllErrors(registerForm);
        const fullname        = document.getElementById("register-fullname");
        const email           = document.getElementById("register-email");
        const barCouncil      = document.getElementById("bar-council-number");
        const password        = document.getElementById("register-password");
        const confirmPassword = document.getElementById("register-confirm-password");
        let valid = true;

        // Full Name
        if (!fullname.value.trim()) {
            showError(fullname, "Full name is required."); valid = false;
        } else if (fullname.value.trim().length < 3) {
            showError(fullname, "Name must be at least 3 characters."); valid = false;
        }

        // Email
        if (!email.value.trim()) {
            showError(email, "Email address is required."); valid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, "Please enter a valid email address."); valid = false;
        }

        // Bar Council — lawyers only
        if (currentRole === "lawyer") {
            if (!barCouncil.value.trim()) {
                showError(barCouncil, "Bar Council Enrollment Number is required."); valid = false;
            } else if (!isValidBarCouncil(barCouncil.value)) {
                showError(barCouncil, "Format must be e.g. STATE/1234/2025"); valid = false;
            }
        }

        // Password
        if (!password.value.trim()) {
            showError(password, "Password is required."); valid = false;
        } else if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters."); valid = false;
        }

        // Confirm Password
        if (!confirmPassword.value.trim()) {
            showError(confirmPassword, "Please confirm your password."); valid = false;
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match."); valid = false;
        }

        if (valid) {
            showToast("Account created! Welcome to LawLoom.", "success");
            // ← Replace with your actual register / API call
        }
    });

    // ─── Live: clear error as user types ─────────────────────────────────
    document.querySelectorAll(".input-field").forEach(input => {
        input.addEventListener("input", function () { clearError(this); });
    });

    // ─── Default state ───────────────────────────────────────────────────
    showLogin();
});

// ─── Force page to top ───────────────────────────────────────────────────────
window.addEventListener("load", () => window.scrollTo(0, 0));
window.addEventListener("pageshow", () => window.scrollTo(0, 0));
if ("scrollRestoration" in history) history.scrollRestoration = "manual";