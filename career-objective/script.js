// Career Objective Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality handled by components/navbar.js

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 100; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Desktop navigation functionality handled by components/navbar.js

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.objective-card, .goal-item, .value-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Parallax effect for floating elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add hover effects for objective cards
    const objectiveCards = document.querySelectorAll('.objective-card');
    
    objectiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects for value items
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Typing effect for career title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect if desired
    const careerTitle = document.querySelector('.career-title');
    if (careerTitle && window.innerWidth > 768) {
        const originalText = careerTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(careerTitle, originalText, 150);
    }

    // Add scroll-triggered animations for timeline
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const goalItems = entry.target.querySelectorAll('.goal-item');
                goalItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });

    const goalsTimeline = document.querySelector('.goals-timeline');
    if (goalsTimeline) {
        const goalItems = goalsTimeline.querySelectorAll('.goal-item');
        goalItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        timelineObserver.observe(goalsTimeline);
    }

    // Add floating animation to abstract shapes
    const abstractShapes = document.querySelectorAll('.abstract-shape');
    
    abstractShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
        shape.style.animationDuration = `${4 + index * 0.5}s`;
    });

    // Enhanced mobile experience
    if (window.innerWidth <= 768) {
        // Add touch feedback for mobile
        const touchElements = document.querySelectorAll('.objective-card, .value-item, .goal-content');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(requestTick, 16); // ~60fps
    window.removeEventListener('scroll', requestTick);
    window.addEventListener('scroll', throttledScrollHandler);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.career-hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    });

    // Add CSS class for loaded state
    document.body.classList.add('js-enabled');
});

// Add some CSS animations via JavaScript for better performance
const style = document.createElement('style');
style.textContent = `
    .js-enabled .career-hero-content {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .js-enabled.loaded .career-hero-content {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    .floating-element {
        will-change: transform;
    }
    
    .abstract-shape {
        will-change: transform, opacity;
    }
    
    .objective-card,
    .goal-item,
    .value-item {
        will-change: transform, opacity;
    }
`;

document.head.appendChild(style);
