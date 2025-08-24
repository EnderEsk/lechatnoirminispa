// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const navGroups = document.querySelectorAll('.nav-group');
const mobileBottomNav = document.getElementById('mobile-bottom-nav');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const submenuBubbles = document.querySelectorAll('.submenu-bubble');

// Navbar transparency on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(51, 58, 87, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(51, 58, 87, 0.85)';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Allow external links to work normally
        if (href.startsWith('http') || href.startsWith('../career-objective/') || href.startsWith('../personal-management/') || href.startsWith('../work-history/')) {
            return; // Don't prevent default, let the link work normally
        }
        
        // Only handle internal anchor links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileGroupTitles = document.querySelectorAll('.mobile-group-title');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close mobile menu
    mobileMenuClose.addEventListener('click', function() {
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close mobile menu when clicking outside
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Toggle mobile navigation groups
    mobileGroupTitles.forEach(title => {
        title.addEventListener('click', function() {
            const group = this.getAttribute('data-group');
            const linksContainer = document.getElementById(`${group}-links`);
            
            // Close all other groups
            document.querySelectorAll('.mobile-nav-links-container').forEach(container => {
                if (container !== linksContainer) {
                    container.classList.remove('active');
                }
            });
            
            // Toggle current group
            linksContainer.classList.toggle('active');
        });
        });
});

// Mobile Bottom Navigation Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Function to close all submenu bubbles
    function closeAllSubmenus() {
        submenuBubbles.forEach(bubble => {
            bubble.classList.remove('active');
            bubble.classList.remove('edge-left', 'edge-right');
        });
    }

    // Function to position submenu bubble smartly
    function positionSubmenuBubble(submenu, navItem) {
        // Reset any edge positioning
        submenu.classList.remove('edge-left', 'edge-right');
        
        // Get the submenu dimensions and position
        const submenuRect = submenu.getBoundingClientRect();
        const navItemRect = navItem.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        
        // Calculate if submenu would go off-screen
        const submenuWidth = submenu.offsetWidth;
        const navItemCenter = navItemRect.left + (navItemRect.width / 2);
        
        // Check left edge
        if (navItemCenter - (submenuWidth / 2) < 20) {
            submenu.classList.add('edge-left');
        }
        // Check right edge
        else if (navItemCenter + (submenuWidth / 2) > viewportWidth - 20) {
            submenu.classList.add('edge-right');
        }
    }

    // Handle mobile bottom navigation item clicks
    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            
            // Remove active class from all items
            mobileNavItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle navigation based on section
            switch(section) {
                case 'home':
                    // Close any open submenus
                    closeAllSubmenus();
                    // Navigate to home page
                    window.location.href = '../index.html';
                    break;
                default:
                    // Toggle submenu for other sections
                    const submenu = item.querySelector('.submenu-bubble');
                    if (submenu) {
                        // Close all other submenus first
                        closeAllSubmenus();
                        
                        // Position the submenu smartly before showing it
                        positionSubmenuBubble(submenu, item);
                        
                        // Toggle current submenu
                        submenu.classList.toggle('active');
                    }
                    break;
            }
        });
    });

    // Close submenus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-nav-item')) {
            closeAllSubmenus();
        }
    });

    // Handle submenu item clicks
    document.querySelectorAll('.submenu-bubble-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const href = item.getAttribute('href');
            
            // Allow external links to work normally
            if (href.startsWith('http') || href.startsWith('../career-objective/') || href.startsWith('../personal-management/') || href.startsWith('../work-history/')) {
                closeAllSubmenus();
                return; // Don't prevent default, let the link work normally
            }
            
            // Only handle internal anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Timeline animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.8s ease-out';
        timelineObserver.observe(item);
    });

    // Skills cards animation
    const skillCards = document.querySelectorAll('.skill-card');
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        skillsObserver.observe(card);
    });

    // Floating elements parallax effect
    const floatingShapes = document.querySelectorAll('.floating-shape');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add click effect to timeline markers
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.background = 'rgba(212, 175, 55, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add hover effect to achievement tags
    const achievementTags = document.querySelectorAll('.achievement-tag');
    achievementTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.5)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #D4AF37, #B8860B)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
});
