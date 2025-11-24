# Quick Start Guide

🚀 Get your React Native app running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:

```bash
# Check if Volta is installed
volta --version

# If not installed, install Volta:
curl https://get.volta.sh | bash

# Restart your terminal, then verify:
volta --version
```

## 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/MicheleJohn/react-native-scaffolding.git
cd react-native-scaffolding

# Install dependencies (Volta will auto-install correct Node & pnpm versions)
pnpm install
```

## 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
# For now, you can use the defaults for development
```

## 3. Start Development Server

```bash
# Start Expo dev server
pnpm start
```

This will open Expo DevTools in your browser at `http://localhost:8081`.

## 4. Run on Device/Emulator

### Option A: Physical Device (Recommended for beginners)

1. Install **Expo Go** app:
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan QR code from terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Option B: iOS Simulator (Mac only)

```bash
# Install Xcode from App Store first, then:
pnpm ios
```

### Option C: Android Emulator

```bash
# Install Android Studio first, then:
pnpm android
```

## 5. Verify Everything Works

You should see:
- Welcome screen with "Ready to start!" message
- Feature cards (NativeWind, TanStack Query, i18n, Sentry)
- "Portali" navigation button

## Next Steps

### Explore the Code

```bash
# Open in your favorite editor
code .

# Or VSCode
code .
```

### Key Files to Check

1. **`src/app/index.tsx`** - Home screen
2. **`src/components/ui/`** - UI components
3. **`src/features/portals/`** - Example feature module
4. **`src/lib/`** - Library configurations (Sentry, TanStack Query)

### Make Your First Change

1. Open `src/app/index.tsx`
2. Change the welcome text
3. Save - Hot reload will update automatically! ⚡

### Add Your First Feature

```bash
# Create a new feature module
mkdir -p src/features/my-feature

# Add your components, hooks, schemas
touch src/features/my-feature/index.ts
```

## Common Commands

```bash
# Start dev server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## Troubleshooting

### Issue: "Command not found: pnpm"

```bash
# Install Volta first
curl https://get.volta.sh | bash

# Restart terminal, then:
volta install pnpm
```

### Issue: Metro bundler won't start

```bash
# Clear Metro cache
pnpm start -- --clear

# Or manually:
rm -rf node_modules/.cache
```

### Issue: iOS build fails

```bash
# Clean and reinstall pods
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

### Issue: Android build fails

```bash
# Clean gradle
cd android && ./gradlew clean && cd ..

# Clear gradle cache
rm -rf ~/.gradle/caches/
```

### Issue: "Cannot find module"

```bash
# Clear all caches
rm -rf node_modules
pnpm install
```

## Need Help?

1. Check [docs/SETUP.md](./SETUP.md) for detailed setup
2. Check [docs/ARCHITECTURE.md](./ARCHITECTURE.md) for project structure
3. Open an [issue](https://github.com/MicheleJohn/react-native-scaffolding/issues)

## What's Next?

- [ ] Configure Sentry DSN in `.env`
- [ ] Set up your API endpoint
- [ ] Customize theme in `tailwind.config.js`
- [ ] Add your app icons in `assets/`
- [ ] Update `app.json` with your app info
- [ ] Build your first feature!

Happy coding! 🎉
