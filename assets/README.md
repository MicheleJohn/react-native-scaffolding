# Assets Directory

This directory contains all static assets for the application.

## Required Assets

To run the app properly, you need to add the following image files:

### App Icon
- `icon.png` - 1024x1024px app icon
- `adaptive-icon.png` - 1024x1024px Android adaptive icon
- `favicon.png` - 48x48px web favicon

### Splash Screen
- `splash-icon.png` - Splash screen image (centered on background color)

## Image Guidelines

### Icon
- **Size**: 1024x1024px
- **Format**: PNG with transparency
- **Content**: Your app logo centered, with padding
- **Background**: Transparent or solid color

### Adaptive Icon (Android)
- **Size**: 1024x1024px
- **Format**: PNG with transparency
- **Safe area**: Keep important content within central 66% circle
- **Background color**: Set in `app.json` under `android.adaptiveIcon.backgroundColor`

### Splash Screen
- **Size**: Flexible (will be centered)
- **Format**: PNG with transparency
- **Content**: Your logo or brand mark
- **Recommended**: 1200x1200px for logo portion

## Generating Assets

You can use [Figma](https://figma.com) or [Canva](https://canva.com) to design your assets.

### Quick Setup

1. Create your icon design (1024x1024px)
2. Export as `icon.png`
3. For adaptive icon, ensure centered design
4. Export as `adaptive-icon.png`
5. Create a smaller version (1200x1200px) for splash
6. Export as `splash-icon.png`

### Using Expo Icon Generator

Expo provides a tool to generate all required sizes:

```bash
npx expo-icon-generator --icon your-icon.png
```

## Additional Assets

Add other assets in organized subdirectories:

```
assets/
├── icon.png
├── adaptive-icon.png
├── splash-icon.png
├── favicon.png
├── images/         # App images
├── fonts/          # Custom fonts
└── animations/     # Lottie files
```

## Placeholder Assets

For development, you can use placeholder images from:
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Placeholder.com](https://placeholder.com)

## Image Optimization

Before adding images to production:

1. **Compress images**:
   - Use [TinyPNG](https://tinypng.com)
   - Or [Squoosh](https://squoosh.app)

2. **Use appropriate formats**:
   - PNG for icons and transparency
   - JPEG for photos
   - WebP for better compression (with fallback)

3. **Optimize for different densities**:
   - Provide @2x and @3x versions for iOS
   - Use appropriate density buckets for Android
