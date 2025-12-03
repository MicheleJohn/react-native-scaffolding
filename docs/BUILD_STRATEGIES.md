# Build Strategies

## 🎯 Overview

Questo progetto supporta **3 strategie di build** diverse:

| Strategy | Platform | Cost | When to Use |
|----------|----------|------|-------------|
| **Web Build** | Web | ✅ FREE | Static export per hosting |
| **EAS Build** | iOS/Android | 💰 PAID ($99/mo) | Se hai budget, build più semplici |
| **React Native CLI** | iOS/Android | ✅ FREE | Alternative gratis a EAS |

---

## 1️⃣ Web Build (FREE)

### 📝 Description
Build statico web usando `expo export`. Output: cartella `dist/` pronta per hosting.

### 💰 Cost
**FREE** - Usa solo GitHub Actions minutes (gratuiti)

### 🚀 How to Use

**Manuale da GitHub:**
1. Actions → **Build Web**
2. Run workflow
3. Download da Artifacts

**Automatico:**
- Trigger automatico su push a `main`

**Locale:**
```bash
pnpm run build:web
# Output: dist/
```

### 📦 Deploy Options
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=dist

# GitHub Pages
# Upload dist/ content to gh-pages branch
```

### ✅ Pros
- ✅ Completamente gratuito
- ✅ Build veloce (~2-3 min)
- ✅ Zero setup
- ✅ Automatic on merge

### ❌ Cons
- ❌ Solo web (no native)

---

## 2️⃣ EAS Build (PAID)

### 📝 Description
EAS (Expo Application Services) cloud builds. Gestito completamente da Expo.

### 💰 Cost
**$99/month** per unlimited builds
- Free tier: Solo development builds
- Production builds: Richiede subscription

### 🚀 How to Use

**Setup (una tantum):**
```bash
# 1. Login
eas login

# 2. Generate token
eas token:create

# 3. Add to GitHub Secrets
# Settings → Secrets → EXPO_TOKEN
```

**Manuale da GitHub:**
1. Actions → **Build EAS (Paid)**
2. Run workflow
3. Seleziona:
   - Platform: all/ios/android
   - Profile: development/preview/production
4. Check su expo.dev

**Locale:**
```bash
eas build --platform android --profile preview
eas build --platform ios --profile production
```

### ✅ Pros
- ✅ Setup semplicissimo
- ✅ Managed infrastructure
- ✅ OTA updates inclusi
- ✅ Zero config nativo
- ✅ Support ufficiale Expo

### ❌ Cons
- ❌ **Costoso** ($99/mo)
- ❌ Vendor lock-in
- ❌ Build più lente (cloud queue)

---

## 3️⃣ React Native CLI Build (FREE)

### 📝 Description
Build nativi usando GitHub Actions direttamente. **Alternative GRATUITA a EAS!**

### 💰 Cost
**FREE** - Usa solo GitHub Actions minutes
- Public repo: Unlimited
- Private repo: 2000 min/month free

### 🚀 How to Use

**Android Setup (una tantum):**
```bash
# 1. Generate keystore
cd android/app
keytool -genkey -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 2. Convert to base64
cat release.keystore | base64 > keystore.base64

# 3. Add GitHub Secrets:
# ANDROID_KEYSTORE_BASE64 (content of keystore.base64)
# KEYSTORE_PASSWORD
# KEY_ALIAS
# KEY_PASSWORD
```

**iOS Setup (una tantum):**
```bash
# Richiede Apple Developer account ($99/year)
# 1. Setup Fastlane Match per code signing
cd ios
bundle init
bundle add fastlane
bundle exec fastlane init
bundle exec fastlane match init

# 2. Add GitHub Secrets:
# MATCH_PASSWORD
# FASTLANE_USER (Apple ID)
# FASTLANE_PASSWORD (App-specific password)
```

**Manuale da GitHub:**
1. Actions → **Build React Native (Free)**
2. Run workflow
3. Seleziona:
   - Platform: android/ios
   - Build type: debug/release
4. Download da Artifacts

**Locale:**
```bash
# Android
cd android
./gradlew assembleRelease  # APK
./gradlew bundleRelease    # AAB

# iOS
cd ios
xcodebuild -workspace YourApp.xcworkspace -scheme YourApp archive
```

### ✅ Pros
- ✅ **Completamente gratuito**
- ✅ Build più veloci (no queue)
- ✅ Controllo totale
- ✅ No vendor lock-in
- ✅ Unlimited builds

### ❌ Cons
- ❌ Setup iniziale più complesso
- ❌ Richiede gestione code signing
- ❌ iOS richiede macOS runner
- ❌ Più configurazione nativa

---

## 📊 Comparison Matrix

| Feature | Web Build | EAS Build | RN CLI Build |
|---------|-----------|-----------|-------------|
| **Cost** | ✅ FREE | 💰 $99/mo | ✅ FREE |
| **Setup Complexity** | ✅ Easy | ✅ Easy | ⚠️ Medium |
| **Build Speed** | ✅ Fast (2-3min) | ⚠️ Medium (10-20min) | ✅ Fast (5-10min) |
| **Platforms** | Web only | iOS + Android | iOS + Android |
| **Code Signing** | N/A | ✅ Managed | ❌ Manual |
| **OTA Updates** | N/A | ✅ Included | ❌ Manual (Codepush) |
| **Control** | Full | Limited | Full |
| **Best For** | Web apps | Teams with budget | Free/OSS projects |

---

## 🎯 Decision Guide

### Choose **Web Build** if:
- ✅ Stai buildando solo per web
- ✅ Vuoi deploy rapido su Vercel/Netlify
- ✅ Budget = $0

### Choose **EAS Build** if:
- ✅ Hai budget ($99/mo OK)
- ✅ Vuoi setup minimo
- ✅ Preferisci managed service
- ✅ Team non ha esperienza native

### Choose **React Native CLI** if:
- ✅ Budget = $0 (NO subscription)
- ✅ Hai esperienza con native builds
- ✅ Vuoi controllo completo
- ✅ Open source project

---

## 🚀 Recommended Setup

### Per progetti nuovi:
```
1. Start with: Web Build (sempre FREE)
2. Add: React Native CLI Build (FREE alternative)
3. Later: EAS Build solo se hai budget e team grande
```

### Per progetti esistenti:
```
- Già su EAS? Valuta switch a RN CLI per save $$
- Nuovo? Start con RN CLI (FREE)
```

---

## 💡 Tips

### Risparmiare su iOS:
```
- Apple Developer: $99/year (required)
- EAS Build: $99/month = $1188/year
- RN CLI Build: $0/year

Savings: $1188/year! 🎉
```

### GitHub Actions Minutes:
```
- Public repo: Unlimited FREE
- Private repo: 2000 min/month FREE
- Android build: ~10 min
- iOS build: ~15 min

→ ~100-150 builds/month FREE!
```

### Best Practice:
```yaml
# Use cheap builds per development
- PR checks: Web build only (fastest)
- Testing: RN CLI debug builds (FREE)
- Production: RN CLI release OR EAS (se hai budget)
```

---

## 📚 Resources

### Web Build:
- [Expo Web Docs](https://docs.expo.dev/workflow/web/)
- [Static Export Guide](https://docs.expo.dev/guides/customizing-metro/#web-support)

### EAS Build:
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [Pricing](https://expo.dev/pricing)

### React Native CLI:
- [Building APK/AAB](https://reactnative.dev/docs/signed-apk-android)
- [Building iOS](https://reactnative.dev/docs/publishing-to-app-store)
- [Fastlane Guide](https://docs.fastlane.tools/)
- [Free GitHub Actions Alternative](https://github.com/TanayK07/expo-react-native-cicd)

---

**Summary:** Start FREE (Web + RN CLI), upgrade to EAS solo se necessario! 🚀
