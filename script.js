

// Intersection Observer for scroll animations
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

// Observe content sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const contentSections = document.querySelectorAll('.content-section');
    
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.3;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
});



// Typing effect for slogan
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const slogan = document.querySelector('.slogan');
    if (slogan) {
        const originalText = slogan.textContent;
        typeWriter(slogan, originalText, 50);
    }
});



// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements sequentially
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add CSS class for loaded state
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// URL Cleaning Function - Prevents index.html from being appended to URLs
function cleanURLs() {
    // Get current URL
    const currentURL = window.location.href;
    
    // Check if we're on a page with index.html in the URL
    if (currentURL.includes('/index.html')) {
        // Remove index.html from the URL
        const cleanURL = currentURL.replace('/index.html', '');
        
        // Update browser history without reloading the page
        window.history.replaceState({}, document.title, cleanURL);
        
        console.log('Cleaned URL from:', currentURL, 'to:', cleanURL);
    }
}

// Clean URLs when page loads
document.addEventListener('DOMContentLoaded', cleanURLs);

// Also clean URLs when navigating (for single-page app behavior)
window.addEventListener('popstate', cleanURLs);

// Intercept navigation clicks to prevent index.html from being added
document.addEventListener('click', function(event) {
    // Check if the clicked element is a navigation link
    if (event.target.tagName === 'A' && event.target.href) {
        const href = event.target.href;
        
        // If the link would result in index.html being added, prevent it
        if (href.includes('/index.html')) {
            event.preventDefault();
            
            // Navigate to the clean URL instead
            const cleanHref = href.replace('/index.html', '');
            window.location.href = cleanHref;
        }
    }
});




