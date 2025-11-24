# Setup Guide

## Prerequisites

### Install Volta

Volta automatically manages Node.js and pnpm versions:

```bash
curl https://get.volta.sh | bash
```

### Verify Installation

```bash
volta --version
```

Volta will automatically install the correct Node.js and pnpm versions specified in `package.json`.

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/MicheleJohn/react-native-scaffolding.git
cd react-native-scaffolding
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
EXPO_PUBLIC_ENV=development
```

4. **Start the development server**

```bash
pnpm start
```

## Platform-Specific Setup

### iOS

1. Install Xcode from the Mac App Store
2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```
3. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
4. Run on iOS simulator:
   ```bash
   pnpm ios
   ```

### Android

1. Install Android Studio
2. Configure Android SDK
3. Create an Android Virtual Device (AVD)
4. Run on Android emulator:
   ```bash
   pnpm android
   ```

## Development Workflow

### Pre-commit Hooks

Husky is configured to run linting and formatting before each commit:

```bash
# These run automatically on commit
pnpm lint
pnpm format
```

### Type Checking

```bash
pnpm type-check
```

### Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test -- --coverage

# Watch mode
pnpm test -- --watch
```

## Building for Production

### EAS Build

1. Install EAS CLI:
   ```bash
   pnpm add -g eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure your project:
   ```bash
   eas build:configure
   ```

4. Build for Android:
   ```bash
   eas build --platform android --profile production
   ```

5. Build for iOS:
   ```bash
   eas build --platform ios --profile production
   ```

### Submit to Stores

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## Troubleshooting

### Metro bundler issues

```bash
pnpm start -- --clear
```

### iOS build issues

```bash
cd ios && pod install && cd ..
```

### Android build issues

```bash
cd android && ./gradlew clean && cd ..
```
