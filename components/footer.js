// Footer Component JavaScript
console.log('Footer.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('Footer.js: DOMContentLoaded event fired');
    // Initialize footer functionality
    initializeFooter();
});

function initializeFooter() {
    console.log('Footer.js: Initializing footer');
    
    // Add smooth scrolling to footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    console.log('Found footer links:', footerLinks.length);
    
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    console.log('Found social links:', socialLinks.length);
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add intersection observer for footer animations
    const footer = document.querySelector('.footer');
    if (footer) {
        console.log('Footer element found, setting up animations');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Set initial state
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'all 0.8s ease-out';
        
        observer.observe(footer);
    } else {
        console.log('Footer element not found');
    }
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeFooter };
}
