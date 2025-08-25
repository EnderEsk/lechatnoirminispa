// Portfolio Page JavaScript

// Navigation functionality
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navGroups = document.querySelectorAll('.nav-group');
    const mobileBottomNav = document.getElementById('mobile-bottom-nav');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const submenuBubbles = document.querySelectorAll('.submenu-bubble');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileGroupTitles = document.querySelectorAll('.mobile-group-title');

    console.log('DOM elements found:', {
        navbar: !!navbar,
        navLinks: navLinks.length,
        navGroups: navGroups.length,
        mobileBottomNav: !!mobileBottomNav,
        mobileNavItems: mobileNavItems.length,
        mobileMenuToggle: !!mobileMenuToggle,
        mobileMenuOverlay: !!mobileMenuOverlay,
        mobileMenuClose: !!mobileMenuClose,
        mobileGroupTitles: mobileGroupTitles.length
    });

    if (!navbar) {
        console.error('Navbar element not found!');
        return;
    }
    
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
            
            // Allow external links and page navigation to work normally
            if (href.startsWith('http') || 
                href.startsWith('/career-objective') || href.startsWith('career-objective/') || href.startsWith('./career-objective/') || 
                href.startsWith('/personal-management') || href.startsWith('personal-management/') || href.startsWith('./personal-management/') ||
                href.startsWith('/personal-interests') || href.startsWith('personal-interests/') || href.startsWith('./personal-interests/') ||
                href.startsWith('/work-history') || href.startsWith('work-history/') || href.startsWith('./work-history/') ||
                href.startsWith('/career-skills') || href.startsWith('career-skills/') || href.startsWith('./career-skills/') ||
                href.startsWith('/awards-achievements') || href.startsWith('awards-achievements/') || href.startsWith('./awards-achievements/') ||
                href.startsWith('/cover-letter') || href.startsWith('cover-letter/') || href.startsWith('./cover-letter/') ||
                href.startsWith('/references') || href.startsWith('references/') || href.startsWith('./references/') ||
                href.startsWith('/portfolio') || href.startsWith('portfolio/') || href.startsWith('./portfolio/') ||
                href.startsWith('/')) {
                return; // Allow normal navigation
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close mobile menu when clicking outside
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Mobile group titles toggle
    mobileGroupTitles.forEach(title => {
        title.addEventListener('click', () => {
            const group = title.getAttribute('data-group');
            const linksContainer = document.getElementById(`${group}-links`);
            
            if (linksContainer) {
                linksContainer.classList.toggle('active');
                title.classList.toggle('active');
            }
        });
    });

    // Mobile bottom navigation functionality
    if (mobileBottomNav) {
        mobileNavItems.forEach(item => {
            const section = item.getAttribute('data-section');
            const submenu = item.querySelector('.submenu-bubble');
            
            if (submenu) {
                item.addEventListener('click', (e) => {
                    // Don't trigger if clicking on a link
                    if (e.target.tagName === 'A') {
                        return;
                    }
                    
                    // Close all other submenus
                    submenuBubbles.forEach(bubble => {
                        if (bubble !== submenu) {
                            bubble.classList.remove('active');
                        }
                    });
                    
                    // Toggle current submenu
                    submenu.classList.toggle('active');
                });
            }
        });

        // Close submenus when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-nav-item')) {
                submenuBubbles.forEach(bubble => {
                    bubble.classList.remove('active');
                });
            }
        });
    }

    // Hide mobile bottom nav on scroll down, show on scroll up
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (mobileBottomNav) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                mobileBottomNav.style.transform = 'translateY(100%)';
            } else {
                // Scrolling up
                mobileBottomNav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    console.log('Navigation initialized successfully');
}

// Portfolio-specific functionality
function initializePortfolio() {
    console.log('Initializing portfolio...');
    
    // Add loading animation to portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    
    portfolioImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        });
        
        // Add click event for image enlargement (optional)
        img.addEventListener('click', () => {
            // You can add a lightbox or modal here if desired
            console.log('Portfolio image clicked:', img.src);
        });
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe portfolio items for animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    console.log('Portfolio initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePortfolio();
});

// Initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
        initializePortfolio();
    });
} else {
    initializeNavigation();
    initializePortfolio();
}
