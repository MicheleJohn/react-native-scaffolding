# 📱 App Distribution Guide

Guida completa per **distribuire e installare** le tue app iOS e Android.

---

## 📋 Table of Contents

- [Android Distribution](#-android-distribution-easy)
- [iOS Distribution](#-ios-distribution-complex)
- [Understanding iOS File Formats](#-understanding-ios-file-formats)
- [Installation Methods Comparison](#-installation-methods-comparison)
- [Recommendations](#-recommendations)

---

## 🤖 Android Distribution (EASY!)

### ✅ Android è SEMPLICE!

Android permette installazione diretta di APK senza restrizioni.

### 📦 Build Android APK

**Da GitHub Actions:**

```yaml
# .github/workflows/build-react-native.yml
Platform: android
Build type: release
```

**Output:** `android-release.zip` → `app-release.apk`

### 📲 Distribuzione APK

**Metodo 1 - Direct Share (PIÙ FACILE):**

```bash
# 1. Download APK da GitHub Actions
# 2. Share APK via:
#    - Email
#    - WhatsApp
#    - Google Drive
#    - Dropbox
#    - Qualsiasi metodo!

# 3. Su Android device:
#    - Download APK
#    - Tap per installare
#    - "Install from Unknown Sources" → Allow
#    - Done! ✅
```

**Metodo 2 - Google Play (Internal Testing):**

```bash
# 1. Google Play Console
# 2. Create Internal Testing track
# 3. Upload AAB (non APK)
# 4. Add tester emails
# 5. Testers ricevono link
```

### ✅ Android Pros:
- ✅ Zero restrizioni
- ✅ Installazione diretta
- ✅ Nessun account developer necessario per testing
- ✅ Condivisione facile

---

## 🍎 iOS Distribution (COMPLEX!)

### ⚠️ iOS ha MOLTE restrizioni!

Apple controlla rigidamente la distribuzione app. Hai **4 opzioni**:

---

## 📦 Understanding iOS File Formats

### Cosa ottieni da GitHub Actions?

| Build Type | Output | Can Install? | What Is It? |
|------------|--------|--------------|-------------|
| **Unsigned** | `.xcarchive` | ❌ NO | Intermediate format (ingredients) |
| **Signed** | `.ipa` | ✅ YES | Final app package (ready to install) |

### 🤔 Cosa è `.xcarchive`?

```
.xcarchive/
├── Products/
│   └── Applications/
│       └── YourApp.app      ← Actual app bundle
├── dSYMs/                    ← Debug symbols
└── Info.plist                ← Metadata
```

**Analogia:**
- `.xcarchive` = Ingredienti (farina, uova, latte)
- `.ipa` = Torta pronta
- **iPhone può installare solo "torte" (`.ipa`), non ingredienti!**

**Workflow:**
```
GitHub Actions
     |
     v
.xcarchive (unsigned build)
     |
     | Export/Sign
     v
  .ipa (signed)
     |
     v
iPhone ✅
```

---

## 🎯 iOS Distribution Methods

### Method 1: TestFlight (PROFESSIONAL)

**Best for:** Beta testing, client demos, investor pitches

#### Requirements:
- ✅ Apple Developer Account ($99/year)
- ✅ Signed IPA
- ✅ App Store Connect access

#### Setup:

```bash
# 1. Setup Apple Developer Account
# https://developer.apple.com ($99/year)

# 2. Create App ID
# developer.apple.com → Identifiers → +

# 3. Generate Certificates & Provisioning Profiles
# (See docs/IOS_SIGNING_SETUP.md)

# 4. Add GitHub Secrets:
# APPLE_CERTIFICATE_BASE64
# APPLE_CERTIFICATE_PASSWORD
# APPLE_PROVISIONING_PROFILE_BASE64
# APPLE_TEAM_ID

# 5. Build Signed IPA
# Platform: ios
# Build type: release
# iOS Signing: signed

# 6. Upload to TestFlight
xcrun altool --upload-app \
  -f YourApp.ipa \
  -u YOUR_APPLE_ID \
  -p APP_SPECIFIC_PASSWORD

# 7. Add beta testers in App Store Connect
# 8. Testers receive email → Download TestFlight → Install
```

#### Pros:
- ✅ Professional distribution
- ✅ Easy for testers (just TestFlight app)
- ✅ OTA updates
- ✅ Up to 10,000 testers
- ✅ No device limits
- ✅ App lasts forever (until you remove it)

#### Cons:
- ❌ Requires Apple Developer ($99/year)
- ❌ Review process (1-2 days for first build)
- ❌ Setup complexity (certificates, provisioning)

---

### Method 2: Xcode Direct Install (FREE!)

**Best for:** Quick testing with friends nearby

#### Requirements:
- ✅ Mac with Xcode
- ✅ iPhone connected via USB or WiFi
- ✅ `.xcarchive` file (from unsigned build)

#### Step-by-Step Guide:

```bash
# === ON YOUR MAC ===

# 1. Download ios-release-unsigned.zip from GitHub Actions
unzip ios-release-unsigned.zip
cd ios-release-unsigned/

# 2. Verify .xcarchive structure
ls -la reactnativescaffolding.xcarchive/Products/Applications/
# You should see: reactnativescaffolding.app/

# 3. Connect iPhone via USB
# - First time: "Trust This Computer?" → Trust
# - Enable Developer Mode:
#   Settings > Privacy & Security > Developer Mode > ON
#   (iPhone will restart)

# 4. Install app using Xcode GUI (EASIEST)
# - Open Xcode
# - Window > Devices and Simulators (Cmd+Shift+2)
# - Select your iPhone
# - Click "+" under "Installed Apps"
# - Navigate to: reactnativescaffolding.xcarchive/Products/Applications/
# - Select: reactnativescaffolding.app
# - Click "Open"
# - ✅ App installs on iPhone!

# OR using Terminal (FASTER)
brew install ios-deploy
ios-deploy --bundle reactnativescaffolding.xcarchive/Products/Applications/reactnativescaffolding.app
```

#### Pros:
- ✅ **Completely FREE**
- ✅ No Apple Developer Account needed
- ✅ Fast (2 commands)
- ✅ Works for testing

#### Cons:
- ❌ App expires after **7 days**
- ❌ Only **1 iPhone at a time**
- ❌ iPhone must be **connected to Mac**
- ❌ Must reinstall every 7 days

#### Why 7 Days?

Apple allows "free provisioning" only for short-term testing. After 7 days, certificate expires and app won't launch.

---

### Method 3: Ad-Hoc Distribution (MEDIUM)

**Best for:** Distributing to specific devices (max 100/year)

#### Requirements:
- ✅ Apple Developer Account ($99/year)
- ✅ Device UDIDs registered
- ✅ Ad-Hoc Provisioning Profile

#### Setup:

```bash
# 1. Get iPhone UDID
# Connect iPhone → iTunes/Finder → Click Serial Number
# Copy UDID (e.g., 00008030-001234567890ABCD)

# 2. Register device on developer.apple.com
# Devices → + → Add UDID

# 3. Create Ad-Hoc Provisioning Profile
# Profiles → + → Ad Hoc → Include device UDIDs

# 4. Build with Ad-Hoc profile
# (Update GitHub secrets with ad-hoc profile)

# 5. Export IPA
xcodebuild -exportArchive \
  -archivePath YourApp.xcarchive \
  -exportPath build \
  -exportOptionsPlist ExportOptions.plist

# 6. Distribute IPA
# - Send IPA to testers
# - Install with Apple Configurator or Xcode Devices
```

#### Pros:
- ✅ App doesn't expire (7 days)
- ✅ Can install on registered devices remotely
- ✅ No TestFlight review

#### Cons:
- ❌ Requires Apple Developer ($99/year)
- ❌ Max 100 devices per year
- ❌ Must collect UDIDs from each device
- ❌ Complex setup

---

### Method 4: Expo Go (EASIEST for Testing!)

**Best for:** Rapid testing, development, showing app to friends

#### Requirements:
- ✅ Nothing! Completely FREE

#### How It Works:

```bash
# On your Mac (or any computer with the project):
cd ~/projects/react-native-scaffolding
npx expo start --tunnel

# Output:
# ┌─────────────────────────────────────┐
# │  QR CODE HERE                       │
# │  [████████████████]                 │
# └─────────────────────────────────────┘

# On tester's iPhone:
# 1. Download "Expo Go" from App Store (FREE)
# 2. Open Expo Go
# 3. Scan QR code from terminal
# 4. ✅ App runs immediately!
```

#### Pros:
- ✅ **Completely FREE**
- ✅ **INSTANT** (no build/install)
- ✅ Works remotely (with --tunnel)
- ✅ Live reload (change code → auto refresh)
- ✅ Zero setup
- ✅ Unlimited testers

#### Cons:
- ❌ Not a "standalone" app
- ❌ Requires Expo Go installed
- ❌ Requires internet connection
- ❌ Some native modules may not work
- ❌ Not suitable for production

---

## 📊 Installation Methods Comparison

| Method | Cost | Setup | App Lifespan | Best For | Devices |
|--------|------|-------|--------------|----------|----------|
| **TestFlight** | $99/year | ⭐⭐⭐⭐ | Unlimited | Production beta | 10,000 |
| **Xcode Direct** | FREE | ⭐⭐ | 7 days | Quick test nearby | 1 at a time |
| **Ad-Hoc** | $99/year | ⭐⭐⭐⭐⭐ | Unlimited | Specific devices | 100/year |
| **Expo Go** | FREE | ⭐ | Unlimited | Dev/testing | Unlimited |

### Cost Analysis:

```
Apple Developer Account: $99/year (required for TestFlight/Ad-Hoc)

FREE Options:
- Xcode Direct Install: $0 (but 7-day limit)
- Expo Go: $0 (best for testing)

Professional Options:
- TestFlight: $99/year (best value)
- Ad-Hoc: $99/year (more complex than TestFlight)
```

---

## 💡 Recommendations

### For Different Scenarios:

#### 🧪 **Testing with Friends (Nearby)**

```
Method: Xcode Direct Install
Cost: FREE
Time: 5 minutes

Steps:
1. Download .xcarchive from GitHub Actions
2. Friend brings iPhone
3. Connect to Mac
4. ios-deploy --bundle [...]
5. Done! (Valid for 7 days)
```

---

#### 🌍 **Testing with Friends (Remote)**

**Option A - Expo Go (EASIEST):**

```
Method: Expo Go
Cost: FREE
Time: 2 minutes

Steps:
1. You: npx expo start --tunnel
2. Friend: Install Expo Go
3. Friend: Scan QR code
4. Done! ✅
```

**Option B - TestFlight (PROFESSIONAL):**

```
Method: TestFlight
Cost: $99/year
Time: 1 hour setup + 1-2 days review

Steps:
1. Setup Apple Developer Account
2. Configure signing
3. Build signed IPA
4. Upload to TestFlight
5. Invite testers
6. Done! ✅ (App lasts forever)
```

---

#### 🎯 **Beta Testing (Many Users)**

```
Method: TestFlight
Cost: $99/year
Capacity: Up to 10,000 testers

Best choice for:
- Startup beta programs
- Client demos
- Investor pitches
- Pre-launch testing
```

---

#### 🚀 **Production Distribution**

**Android:**
```
Google Play Store
- One-time fee: $25
- Unlimited distribution
- Auto-updates
```

**iOS:**
```
App Store
- Developer account: $99/year
- Unlimited distribution
- Auto-updates
- TestFlight included
```

---

## 🎯 Decision Tree

```
Need to distribute app?
  |
  ├─ Android?
  │   └─ → Share APK directly! ✅ (FREE, EASY)
  │
  └─ iOS?
      |
      ├─ Quick test with friend nearby?
      │   └─ → Xcode Direct Install (FREE, 7 days)
      │
      ├─ Quick test with friend remote?
      │   └─ → Expo Go (FREE, instant)
      │
      ├─ Beta testing / clients?
      │   └─ → TestFlight ($99/year, professional)
      │
      └─ Production?
          └─ → App Store ($99/year)
```

---

## 📝 Quick Start Commands

### Android (EASY):

```bash
# Build
Platform: android
Build type: release

# Share APK directly
# Done! ✅
```

### iOS - Expo Go (EASIEST):

```bash
npx expo start --tunnel
# Friend: Install Expo Go → Scan QR
# Done! ✅
```

### iOS - Xcode Direct (FREE):

```bash
# Build
Platform: ios
Build type: release
iOS Signing: unsigned

# Download .xcarchive
# Connect iPhone to Mac
brew install ios-deploy
ios-deploy --bundle reactnativescaffolding.xcarchive/Products/Applications/reactnativescaffolding.app
# Done! ✅ (Valid 7 days)
```

### iOS - TestFlight (PROFESSIONAL):

```bash
# Setup once:
# 1. Apple Developer Account ($99/year)
# 2. Configure signing (docs/IOS_SIGNING_SETUP.md)
# 3. Add GitHub secrets

# Build
Platform: ios
Build type: release
iOS Signing: signed

# Upload to TestFlight
xcrun altool --upload-app -f YourApp.ipa [...]

# Invite testers in App Store Connect
# Done! ✅
```

---

## 🆘 Troubleshooting

### "Cannot install .xcarchive on iPhone"

**Problem:** `.xcarchive` is intermediate format, not installable.

**Solutions:**
1. Use Xcode Direct Install (extract .app from .xcarchive)
2. Build signed IPA instead (iOS Signing: signed)
3. Use Expo Go for testing

### "App expires after 7 days"

**Problem:** Free provisioning certificates expire.

**Solutions:**
1. Reinstall every 7 days (Xcode Direct)
2. Upgrade to Apple Developer + TestFlight ($99/year)
3. Use Expo Go for unlimited testing (FREE)

### "How to share with multiple iPhones?"

**For testing:**
- Use Expo Go (unlimited devices, FREE)
- Use TestFlight (up to 10,000 testers, $99/year)

**Not recommended:**
- Xcode Direct (only 1 device at a time)
- Ad-Hoc (max 100 devices, complex setup)

---

## 📚 Additional Resources

- [iOS Signing Setup](./IOS_SIGNING_SETUP.md)
- [Build Strategies](./BUILD_STRATEGIES.md)
- [CI/CD Guide](./CI_CD.md)
- [Deployment Options](./DEPLOYMENT.md)

---

## 💬 Summary

**Android:** ✅ Easy! Share APK directly.

**iOS Testing (FREE):**
- Nearby: Xcode Direct Install (7 days)
- Remote: Expo Go (best option!)

**iOS Production:** TestFlight + App Store ($99/year)

**Recommendation:** Start with Expo Go for testing, upgrade to TestFlight when ready for production beta! 🚀
