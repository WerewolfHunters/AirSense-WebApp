// Simple script to handle the fade-in animations when scrolling
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
            
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
            
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
        // Set initial state
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // ===== Loader Integration =====
     // ===== Loader handling =====
    const loader = document.getElementById('loader');
    const loginForm = document.querySelector('form');

    // Always hide loader when page loads (fix back button issue)
    loader.style.display = 'none';

    if (loginForm) {
        loginForm.addEventListener('submit', function () {
            loader.style.display = 'flex'; // Show loader

            // Auto-hide loader after 3 seconds in case of no redirect
            setTimeout(() => {
                loader.style.display = 'none';
            }, 3000);
        });
    }
            
    // Mobile menu toggle would go here
    const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function() {
        // Toggle mobile menu visibility
    });

});