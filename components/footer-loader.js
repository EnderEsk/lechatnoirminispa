// Footer Loader Component
document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});

function loadFooter() {
    try {
        console.log('Loading footer component');
        
        // Load footer HTML from file
        loadFooterHTML();
        
    } catch (error) {
        console.error('Error loading footer:', error);
        // Fallback: create a simple footer if loading fails
        createFallbackFooter();
    }
}

function loadFooterHTML() {
    // Universal path detection that works across all platforms and protocols
    const basePath = getBasePath();
    
    console.log('Loading footer from path:', basePath);
    console.log('Current location:', window.location.href);
    console.log('Protocol:', window.location.protocol);
    console.log('Footer placeholder element:', document.getElementById('footer-placeholder'));
    
    // Try to fetch the footer HTML file
    fetch(`${basePath}footer.html`)
        .then(response => {
            console.log('Footer fetch response:', response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log('Footer HTML loaded, length:', html.length);
            
            // Process the HTML to fix paths for subdirectories
            const processedHtml = processFooterHTML(html, basePath);
            
            // Find or create footer placeholder
            let footerPlaceholder = document.getElementById('footer-placeholder');
            if (!footerPlaceholder) {
                console.log('No footer placeholder found, creating footer at end of body');
                // If no placeholder exists, append footer to body
                document.body.insertAdjacentHTML('beforeend', processedHtml);
            } else {
                console.log('Footer placeholder found, replacing content');
                // Replace placeholder with footer
                footerPlaceholder.innerHTML = processedHtml;
            }
            
            // Load footer CSS
            loadFooterCSS(basePath);
            
            // Load footer JavaScript
            loadFooterJS(basePath);
            
            console.log('Footer component loaded successfully');
        })
        .catch(error => {
            console.error('Error fetching footer HTML:', error);
            console.log('Falling back to inline footer creation');
            // Fallback to inline footer creation
            createInlineFooter();
        });
}

function getBasePath() {
    // Simple, universal path detection that works across all platforms
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment !== '');
    
    console.log('Current path:', currentPath);
    console.log('Path segments:', pathSegments);
    
    // If we're in a subdirectory (not root), go up one level to find components
    if (pathSegments.length > 1) {
        console.log('In subdirectory, paths will be adjusted');
        return '../components/';
    } else {
        console.log('In root directory, no path adjustment needed');
        return 'components/';
    }
}

function processFooterHTML(html, basePath) {
    let processedHtml = html;
    
    // Fix logo path if we're in a subdirectory
    if (basePath === '../components/') {
        processedHtml = processedHtml.replace('src="logo-test.png"', 'src="../logo-test.png"');
    }
    
    return processedHtml;
}

function processFooterCSS(css, basePath) {
    let processedCSS = css;
    
    // Fix any relative paths in CSS if we're in a subdirectory
    if (basePath === '../components/') {
        // Fix any image paths that might be relative
        processedCSS = processedCSS.replace(/url\(['"]?([^'")\s]+)['"]?\)/g, (match, url) => {
            // Skip data URLs and absolute URLs
            if (url.startsWith('data:') || url.startsWith('http') || url.startsWith('/')) {
                return match;
            }
            // Make relative paths go up one level
            return `url("../${url}")`;
        });
    }
    
    return processedCSS;
}

function createInlineFooter() {
    // Universal path detection
    const basePath = getBasePath();
    const isSubdirectory = basePath === '../components/';
    const pathPrefix = isSubdirectory ? '../' : '/';
    const logoPath = isSubdirectory ? '../logo-test.png' : 'logo-test.png';
    
    const footerHtml = `
        <!-- Footer -->
        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="${logoPath}" alt="Le Chat Noir Logo" class="footer-logo-image">
                        <h3>Le Chat Noir</h3>
                        <p class="footer-tagline">Mini Spa</p>
                    </div>
                    <p class="footer-description">
                        Where luxury meets tranquility, and every moment becomes a cherished memory. 
                        Experience the ultimate in relaxation and beauty care.
                    </p>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="${pathPrefix}">Home</a></li>
                        <li><a href="${pathPrefix}career-objective">Career Objective</a></li>
                        <li><a href="${pathPrefix}personal-management">Personal Management</a></li>
                        <li><a href="${pathPrefix}work-history">Work History</a></li>
                        <li><a href="${pathPrefix}career-skills">Career Skills</a></li>
                        <li><a href="${pathPrefix}awards-achievements">Awards & Achievements</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <div class="contact-info">
                        <div class="contact-item">
                            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span>123 Spa Street, Luxury City</span>
                        </div>
                        <div class="contact-item">
                            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                            </svg>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div class="contact-item">
                            <svg class="contact-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                            <span>info@lechatnoirspa.com</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p class="copyright">
                        © 2024 Le Chat Noir Mini Spa. All rights reserved.
                    </p>
                    <div class="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Find or create footer placeholder
    let footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
        // If no placeholder exists, append footer to body
        document.body.insertAdjacentHTML('beforeend', footerHtml);
    } else {
        // Replace placeholder with footer
        footerPlaceholder.innerHTML = footerHtml;
    }
    
    // Load footer CSS
    loadFooterCSS(basePath);
    
    // Load footer JavaScript
    loadFooterJS(basePath);
    
    console.log('Inline footer created successfully');
}

function loadFooterCSS(basePath) {
    // Check if footer CSS is already loaded
    if (document.querySelector('link[href*="footer.css"]')) {
        console.log('Footer CSS already loaded');
        return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${basePath}footer.css`;
    link.type = 'text/css';
    
    link.onerror = () => {
        console.error('Failed to load footer CSS:', link.href);
    };
    
    link.onload = () => {
        console.log('Footer CSS loaded successfully:', link.href);
    };
    
    // Add to head
    document.head.appendChild(link);
    console.log('Footer CSS loading from:', link.href);
}

function loadFooterJS(basePath) {
    // Check if footer JS is already loaded
    if (document.querySelector('script[src*="footer.js"]')) {
        console.log('Footer JS already loaded');
        return;
    }
    
    const script = document.createElement('script');
    script.src = `${basePath}footer.js`;
    script.type = 'text/javascript';
    
    script.onerror = () => {
        console.error('Failed to load footer JS:', script.src);
    };
    
    script.onload = () => {
        console.log('Footer JS loaded successfully:', script.src);
    };
    
    // Add to body
    document.body.appendChild(script);
    console.log('Footer JS loading from:', script.src);
}

function createFallbackFooter() {
    console.log('Creating fallback footer');
    const fallbackFooter = `
        <footer class="footer" style="background: rgba(51, 58, 87, 0.95); color: #fff; padding: 2rem; text-align: center; margin-top: 2rem;">
            <p>© 2024 Le Chat Noir Mini Spa. All rights reserved.</p>
            <p style="font-size: 0.8rem; margin-top: 1rem;">Footer component failed to load</p>
        </footer>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fallbackFooter);
}

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadFooter };
}
