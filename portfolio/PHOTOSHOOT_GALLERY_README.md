# Photoshoot Gallery Section

## Overview
The photoshoot gallery is a special section in the portfolio that showcases 13 professional photoshoot images with an elegant, slow-cycling animation. This section appears first in the main content area, before the other portfolio sections.

## Features

### 🎭 Auto-Cycling Gallery
- **Slow transitions**: 4-second intervals between photo changes
- **Smooth animations**: 1.5-second fade transitions
- **Auto-play**: Automatically cycles through all 13 photos
- **Pause on hover**: Stops auto-play when hovering over the gallery

### 🎮 Interactive Controls
- **Navigation buttons**: Previous/Next buttons with hover effects
- **Indicator dots**: Click any dot to jump to a specific photo
- **Photo counter**: Shows current position (e.g., "3 of 13")
- **Keyboard navigation**: Use left/right arrow keys
- **Touch/swipe support**: Swipe left/right on mobile devices

### 📱 Responsive Design
- **Mobile optimized**: Adapts to different screen sizes
- **Touch friendly**: Optimized for mobile interactions
- **Flexible layout**: Responsive container and controls

## Image Format Issue

### Current Status
The photoshoot images are currently in **HEIC format**, which has limited browser support:
- ✅ **Supported**: Safari (macOS/iOS)
- ❌ **Not supported**: Chrome, Firefox, Edge (most browsers)

### Solution: Convert to Web-Compatible Format

#### Option 1: Use the Conversion Script (Recommended)
1. Install dependencies:
   ```bash
   cd portfolio
   npm install sharp
   ```

2. Run the conversion script:
   ```bash
   node convert-heic-images.js
   ```

3. Update the HTML to use converted images:
   ```html
   <!-- Change from: -->
   <img src="images/photo1.heic" alt="Professional photoshoot 1" class="photoshoot-img">
   
   <!-- To: -->
   <img src="images/photo1.png" alt="Professional photoshoot 1" class="photoshoot-img">
   ```

#### Option 2: Manual Conversion
1. Use online converters like:
   - [CloudConvert](https://cloudconvert.com/heic-to-jpg)
   - [Convertio](https://convertio.co/heic-jpg/)
   - [HEIC to JPG](https://heictojpg.com/)

2. Convert all 13 photos to JPEG or PNG format
3. Replace the HEIC files in the `images/` folder
4. Update the HTML file paths

#### Option 3: Use Fallback Content
The gallery includes fallback content that displays when HEIC images fail to load, showing a styled placeholder with the photo number.

## Customization

### Animation Speed
Adjust the transition timing in `styles.css`:
```css
.photoshoot-image {
    transition: opacity 1.5s ease-in-out; /* Change 1.5s to desired duration */
}
```

### Auto-play Interval
Modify the delay in `script.js`:
```javascript
const autoPlayDelay = 4000; // Change 4000ms to desired interval
```

### Gallery Size
Adjust the container dimensions in `styles.css`:
```css
.photoshoot-container {
    height: 600px; /* Change height as needed */
    max-width: 1000px; /* Change max-width as needed */
}
```

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| HEIC Images | ❌ | ❌ | ✅ | ❌ |
| Gallery Animation | ✅ | ✅ | ✅ | ✅ |
| Touch/Swipe | ✅ | ✅ | ✅ | ✅ |
| Keyboard Navigation | ✅ | ✅ | ✅ | ✅ |

## Troubleshooting

### Images Not Loading
- Verify image file paths are correct
- Ensure PNG images are properly placed in the images/ directory
- Check browser console for any 404 errors

### Gallery Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify all required elements are present in the HTML

### Performance Issues
- Optimize image sizes (recommended: max 1920x1080)
- Use WebP format for better compression
- Consider lazy loading for large galleries

## File Structure
```
portfolio/
├── index.html              # Main portfolio page with photoshoot gallery
├── styles.css              # Gallery styles and animations
├── script.js               # Gallery functionality and controls
├── images/
│   ├── photo1.png         # Converted PNG images
│   ├── photo2.png
│   └── ...
├── convert-heic-images.js  # Image conversion utility
└── PHOTOSHOOT_GALLERY_README.md  # This file
```

## Support
For issues or questions about the photoshoot gallery:
1. Check the browser console for error messages
2. Verify all files are properly linked
3. Test with converted JPEG/PNG images
4. Ensure JavaScript is enabled and working
