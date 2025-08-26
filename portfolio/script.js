// Portfolio Page JavaScript

// Photoshoot Gallery functionality
function initializePhotoshootGallery() {
    const photos = document.querySelectorAll('.photoshoot-image');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    const currentPhotoSpan = document.getElementById('currentPhoto');
    
    let currentPhotoIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 4000; // 4 seconds between transitions
    
    // Initialize the gallery
    function showPhoto(index) {
        // Remove active class from all photos and indicators
        photos.forEach(photo => photo.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current photo and indicator
        photos[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // Update counter
        currentPhotoSpan.textContent = index + 1;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === photos.length - 1;
    }
    
    // Next photo function
    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        showPhoto(currentPhotoIndex);
        resetAutoPlay();
    }
    
    // Previous photo function
    function prevPhoto() {
        currentPhotoIndex = currentPhotoIndex === 0 ? photos.length - 1 : currentPhotoIndex - 1;
        showPhoto(currentPhotoIndex);
        resetAutoPlay();
    }
    
    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextPhoto, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextPhoto);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevPhoto);
    }
    
    // Indicator click events
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentPhotoIndex = index;
            showPhoto(currentPhotoIndex);
            resetAutoPlay();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        }
    });
    
    // Pause auto-play on hover
    const photoshootContainer = document.querySelector('.photoshoot-container');
    if (photoshootContainer) {
        photoshootContainer.addEventListener('mouseenter', stopAutoPlay);
        photoshootContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    photoshootContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    photoshootContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next photo
                nextPhoto();
            } else {
                // Swipe right - previous photo
                prevPhoto();
            }
        }
    }
    
    // Initialize the gallery
    showPhoto(0);
    startAutoPlay();
    
    console.log('Photoshoot gallery initialized with', photos.length, 'photos');
}

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
        
            // Add click event for image enlargement
    img.addEventListener('click', () => {
        openImageModal(img.src, img.alt);
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

// Image Modal/Lightbox functionality
function openImageModal(imageSrc, imageAlt) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (modal && modalImage && modalCaption) {
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        
        // Set caption based on image type
        if (imageAlt.toLowerCase().includes('before')) {
            modalCaption.textContent = 'Before Treatment';
        } else if (imageAlt.toLowerCase().includes('after')) {
            modalCaption.textContent = 'After Treatment';
        } else {
            modalCaption.textContent = imageAlt;
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize modal event listeners
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    
    if (modal && modalClose) {
        // Close modal when clicking close button
        modalClose.addEventListener('click', closeImageModal);
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeImageModal();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializePortfolio();
    initializeModal();
    initializePhotoshootGallery(); // Initialize photoshoot gallery
});

// Initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeNavigation();
        initializePortfolio();
        initializeModal();
        initializePhotoshootGallery(); // Initialize photoshoot gallery
    });
} else {
    initializeNavigation();
    initializePortfolio();
    initializeModal();
    initializePhotoshootGallery(); // Initialize photoshoot gallery
}
