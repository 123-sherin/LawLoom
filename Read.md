// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event to each nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(212, 168, 67, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Hero button actions
    const primaryBtn = document.querySelector('.primary-btn');
    const secondaryBtn = document.querySelector('.secondary-btn');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const ctaMainButton = document.querySelector('.cta-main-button');

    // Primary button - Test My Argument
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            alert('Test My Argument feature - This will open the argument submission form!');
            // In actual implementation, this would open a modal or redirect to form page
        });
    }

    // Secondary button - See How It Works
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            const howItWorksSection = document.querySelector('#how-it-works');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // CTA buttons in navbar
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Try ArguMentor - Redirecting to signup page!');
            // In actual implementation, this would redirect to signup/login
        });
    });

    // Main CTA button
    if (ctaMainButton) {
        ctaMainButton.addEventListener('click', function() {
            alert('Try ArguMentor Now - Opening registration form!');
            // In actual implementation, this would open registration modal
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .feature-card, .step-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Add hover effect sound (optional - commented out for basic version)
    /*
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Play hover sound effect
        });
    });
    */

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-item span:last-child');
    let hasAnimated = false;

    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats');
        if (statsSection && !hasAnimated) {
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                hasAnimated = true;
                animateStats();
            }
        }
    });

    function animateStats() {
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '0';
                stat.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    stat.style.transition = 'all 0.5s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateX(0)';
                }, 50);
            }, index * 200);
        });
    }

    // Card hover effects
    const cards = document.querySelectorAll('.card, .feature-card, .step-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(212, 168, 67, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Footer year update
    const copyrightYear = document.querySelector('.copyright');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = `© ${currentYear} ArguMentor. All rights reserved.`;
    }

    // Loading screen (optional)
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const navbar = document.querySelector('.nav-content');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        menuButton.style.fontSize = '24px';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.color = '#D4A843';
        menuButton.style.cursor = 'pointer';
        
        // Only show on mobile
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        }
        
        navbar.appendChild(menuButton);
        
        menuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = '#000';
                navLinks.style.padding = '20px';
            }
        });
    }

    // Resize handler
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
            }
        }
    });

    // Form validation (for future use)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Scroll to top button (optional)
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #D4A843;
        color: #000;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#F0C050';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#D4A843';
        this.style.transform = 'scale(1)';
    });

    console.log('ArguMentor website loaded successfully!');
});

// Additional utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#D4A843'};
        color: #000;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);