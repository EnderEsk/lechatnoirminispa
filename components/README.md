# Footer Component

This directory contains the universal footer component for the Le Chat Noir Mini Spa website.

## Files

- `footer.html` - The HTML structure of the footer
- `footer.css` - All footer-specific styles
- `footer.js` - Footer-specific JavaScript functionality
- `footer-loader.js` - Script to dynamically load the footer component

## Usage

### Basic Implementation

1. Add a footer placeholder to your HTML:
```html
<!-- Footer Component will be loaded here -->
<div id="footer-placeholder"></div>
```

2. Include the footer loader script before the closing `</body>` tag:
```html
<script src="components/footer-loader.js"></script>
```

### For Subdirectory Pages

If your page is in a subdirectory (e.g., `career-objective/index.html`), use:
```html
<script src="../components/footer-loader.js"></script>
```

## Features

- **Responsive Design**: Automatically adapts to mobile and desktop screens
- **Dynamic Loading**: Loads footer HTML, CSS, and JavaScript automatically
- **Path Detection**: Automatically adjusts logo paths for different page locations
- **Smooth Animations**: Includes fade-in animations and hover effects
- **Consistent Styling**: Maintains the same look across all pages

## Customization

To modify the footer:
- Edit `footer.html` for structural changes
- Edit `footer.css` for styling changes
- Edit `footer.js` for functional changes

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Fallback support for older browsers

## Dependencies

- No external dependencies required
- Uses standard HTML5, CSS3, and ES6+ JavaScript
- Compatible with the existing navbar component
