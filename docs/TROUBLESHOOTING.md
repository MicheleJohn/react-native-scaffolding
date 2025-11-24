# Troubleshooting Guide

## Installation Issues

### Volta Installation Failed

**Problem**: `curl https://get.volta.sh | bash` fails

**Solutions**:
1. Check internet connection
2. Try manual installation:
   ```bash
   # Download installer
   curl -fsSL https://get.volta.sh -o install-volta.sh
   bash install-volta.sh
   ```
3. Check [Volta docs](https://docs.volta.sh/guide/getting-started)

### pnpm Install Hangs

**Problem**: `pnpm install` gets stuck

**Solutions**:
```bash
# Clear pnpm cache
pnpm store prune

# Try with verbose logging
pnpm install --no-frozen-lockfile --loglevel info

# Or use npm as fallback
npm install
```

## Development Server Issues

### Metro Bundler Won't Start

**Problem**: `pnpm start` fails or hangs

**Solutions**:
```bash
# Method 1: Clear cache
pnpm start -- --clear

# Method 2: Reset Metro
rm -rf node_modules/.cache
rm -rf /tmp/metro-*
pnpm start

# Method 3: Kill port 8081
lsof -ti:8081 | xargs kill -9
pnpm start
```

### Hot Reload Not Working

**Problem**: Changes don't reflect in app

**Solutions**:
1. Shake device and tap "Reload"
2. Press `r` in terminal
3. Restart dev server:
   ```bash
   # Stop (Ctrl+C) and restart
   pnpm start -- --clear
   ```

## Build Issues

### iOS Build Fails

**Problem**: `pnpm ios` fails with CocoaPods error

**Solutions**:
```bash
# Solution 1: Reinstall pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# Solution 2: Update CocoaPods
sudo gem install cocoapods

# Solution 3: Clean derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Solution 4: Reset Xcode
xcode-select --install
```

### Android Build Fails

**Problem**: `pnpm android` fails with Gradle error

**Solutions**:
```bash
# Solution 1: Clean build
cd android
./gradlew clean
cd ..

# Solution 2: Clear Gradle cache
rm -rf ~/.gradle/caches/

# Solution 3: Check Java version
java -version  # Should be Java 17

# Solution 4: Invalidate Android Studio cache
# File > Invalidate Caches and Restart
```

### Hermes Build Fails

**Problem**: Build fails with Hermes-related errors

**Solutions**:
```bash
# Clear Hermes cache
rm -rf node_modules/.cache/hermes

# Reinstall node_modules
rm -rf node_modules
pnpm install
```

## Runtime Errors

### "Cannot find module" Error

**Problem**: Import errors despite file existing

**Solutions**:
```bash
# Solution 1: Restart bundler
pnpm start -- --clear

# Solution 2: Check path aliases in tsconfig.json
# Verify @ paths match your imports

# Solution 3: Clear watchman (Mac/Linux)
watchman watch-del-all
```

### Red Screen: "Unable to resolve module"

**Problem**: Module resolution fails

**Solutions**:
1. Check import paths are correct
2. Verify module is installed:
   ```bash
   pnpm list <module-name>
   ```
3. Reinstall:
   ```bash
   pnpm add <module-name>
   ```

### TypeScript Errors

**Problem**: TS errors in editor but builds fine

**Solutions**:
```bash
# Restart TypeScript server in VSCode
# Cmd+Shift+P > "TypeScript: Restart TS Server"

# Or regenerate types
pnpm type-check
```

## Expo Specific Issues

### Expo CLI Not Found

**Problem**: `expo` command not recognized

**Solutions**:
```bash
# Use npx (recommended)
npx expo start

# Or install globally
pnpm add -g expo-cli
```

### EAS Build Fails

**Problem**: `eas build` fails

**Solutions**:
```bash
# Check credentials
eas login

# Check build status
eas build:list

# View logs
eas build:view [build-id]

# Clear EAS cache
eas build --clear-cache
```

## Testing Issues

### Jest Tests Fail

**Problem**: `pnpm test` fails

**Solutions**:
```bash
# Clear Jest cache
pnpm test -- --clearCache

# Run with verbose output
pnpm test -- --verbose

# Update snapshots if needed
pnpm test -- -u
```

## Performance Issues

### App Runs Slowly

**Solutions**:
1. Enable Hermes (already enabled in this scaffold)
2. Use production build:
   ```bash
   # Android
   cd android && ./gradlew bundleRelease
   
   # iOS
   # Archive in Xcode with Release configuration
   ```
3. Profile with React DevTools
4. Check for memory leaks

### Large Bundle Size

**Solutions**:
```bash
# Analyze bundle
npx react-native-bundle-visualizer

# Tips:
# - Use dynamic imports
# - Remove unused dependencies
# - Enable Hermes
# - Use ProGuard (Android)
```

## Network Issues

### API Calls Fail

**Problem**: Fetch/axios requests fail

**Solutions**:
1. Check `.env` file has correct API URL
2. For iOS, check ATS settings in `app.json`
3. For Android, check `AndroidManifest.xml` for internet permission
4. Test API with curl/Postman first
5. Check CORS if testing with local API

### Sentry Not Working

**Problem**: Errors not appearing in Sentry

**Solutions**:
1. Verify SENTRY_DSN in `.env`
2. Check Sentry is initialized in production mode
3. Force an error to test:
   ```typescript
   import { captureException } from '@lib/sentry';
   captureException(new Error('Test error'));
   ```

## Platform-Specific Issues

### macOS

```bash
# Watchman issues
brew install watchman

# Xcode issues
sudo xcode-select --reset
```

### Windows

```bash
# Long path issues
git config --system core.longpaths true

# Use WSL2 for better performance
```

### Linux

```bash
# File watchers limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Getting More Help

### Enable Debug Logs

```bash
# React Native
REACT_DEBUGGER="unset ELECTRON_RUN_AS_NODE && open -g 'rndebugger://set-debugger-loc?port=8081' ||" pnpm start

# Expo
EXPO_DEBUG=true pnpm start
```

### Useful Commands

```bash
# Check versions
node --version
pnpm --version
react-native --version
watchman version

# System info
npx react-native info

# Expo doctor
npx expo-doctor
```

### Community Help

1. [React Native Discord](https://discord.gg/react-native)
2. [Expo Discord](https://chat.expo.dev)
3. [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
4. [GitHub Issues](https://github.com/MicheleJohn/react-native-scaffolding/issues)

## Still Stuck?

Open an issue with:
- Error message (full stack trace)
- Steps to reproduce
- System info (`npx react-native info`)
- Relevant code snippets
- What you've already tried
