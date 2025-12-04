# iOS Signing Setup for Production Builds

This guide explains how to configure **signed iOS builds** in GitHub Actions when you have an Apple Developer account.

## 🎯 Overview

The workflow supports **two modes** for iOS release builds:

| Mode | Requirements | Output | Use Case |
|------|--------------|--------|----------|
| **Unsigned** | None | `.xcarchive` | Testing build process without Apple account |
| **Signed** | Apple Developer ($99/year) | `.ipa` ready for App Store | Production-ready distribution |

## 📋 Prerequisites

- ✅ Active [Apple Developer Account](https://developer.apple.com) ($99/year)
- ✅ App registered in App Store Connect
- ✅ Valid Distribution Certificate
- ✅ Valid Provisioning Profile

## 🔐 Step 1: Export Your Certificate

### On macOS:

1. **Open Keychain Access**
   - Applications → Utilities → Keychain Access

2. **Find your distribution certificate**
   - Category: "My Certificates"
   - Look for: "Apple Distribution: [Your Name/Company]"

3. **Export as .p12 file**
   - Right-click certificate → Export
   - File Format: Personal Information Exchange (.p12)
   - Save as: `certificate.p12`
   - **Set a password** (you'll need this later)

4. **Convert to base64**
   ```bash
   base64 -i certificate.p12 | pbcopy
   # This copies the base64 string to clipboard
   ```

## 📄 Step 2: Export Provisioning Profile

### Download from Apple Developer:

1. Go to [Apple Developer Portal](https://developer.apple.com/account/resources/profiles/list)
2. Find your **App Store** provisioning profile
3. Download it (e.g., `MyApp_AppStore.mobileprovision`)

### Convert to base64:

```bash
base64 -i MyApp_AppStore.mobileprovision | pbcopy
# This copies the base64 string to clipboard
```

## 🔑 Step 3: Configure GitHub Secrets

### Go to your repository:

1. Navigate to: **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add these 4 secrets:

| Secret Name | Value | How to Get |
|-------------|-------|------------|
| `APPLE_CERTIFICATE_BASE64` | Base64 of `.p12` file | From Step 1 |
| `APPLE_CERTIFICATE_PASSWORD` | Password you set | From Step 1 |
| `APPLE_PROVISIONING_PROFILE_BASE64` | Base64 of `.mobileprovision` | From Step 2 |
| `APPLE_TEAM_ID` | Your Team ID (10 chars) | [Find here](https://developer.apple.com/account/#/membership) |

### Finding Your Team ID:

1. Go to [Apple Developer Membership](https://developer.apple.com/account/#/membership)
2. Look for **"Team ID"** (e.g., `ABC1234XYZ`)
3. Copy the 10-character alphanumeric string

## ✅ Step 4: Run Signed Build

### In GitHub Actions:

1. Go to **Actions** tab
2. Select **"Build React Native (Free)"** workflow
3. Click **"Run workflow"**
4. Configure:
   - **Platform**: `ios`
   - **Build type**: `release`
   - **iOS Signing**: `signed` ⬅️ **Select this!**
5. Click **"Run workflow"**

### Expected Output:

```
✅ OK - iOS build completed
📱 PLATFORM - iOS
🔧 BUILD TYPE - release
🔐 SIGNING - Signed with Apple Developer certificate
📦 OUTPUT - Signed IPA ready for App Store
✅ PRODUCTION READY - Can upload to TestFlight/App Store
```

### Download Artifact:

- Artifact name: `ios-release-signed`
- Contains: `YourApp.ipa`
- Ready for: Upload to App Store Connect

## 📤 Step 5: Upload to App Store

### Option A: Using Xcode (GUI)

1. Download the `ios-release-signed` artifact from GitHub Actions
2. Extract the `.ipa` file
3. Open **Transporter** app (comes with Xcode)
4. Drag and drop your `.ipa` file
5. Click **"Deliver"**

### Option B: Using Command Line

```bash
# Download artifact from GitHub
gh run download [run-id] -n ios-release-signed

# Upload with xcrun
xcrun altool --upload-app \
  --type ios \
  --file YourApp.ipa \
  --username "your@email.com" \
  --password "app-specific-password"
```

### Option C: Automate in GitHub Actions

Add this step to the workflow:

```yaml
- name: Upload to TestFlight
  if: inputs.ios_signing == 'signed'
  run: |
    xcrun altool --upload-app \
      --type ios \
      --file ios/build/*.ipa \
      --apiKey ${{ secrets.APP_STORE_CONNECT_API_KEY_ID }} \
      --apiIssuer ${{ secrets.APP_STORE_CONNECT_ISSUER_ID }}
```

## 🔧 Troubleshooting

### Error: "APPLE_CERTIFICATE_BASE64 secret not configured"

**Solution:** You selected "signed" mode but haven't configured secrets.

Options:
1. Configure the 4 required secrets (see Step 3)
2. OR use "unsigned" mode for testing

### Error: "No valid code signing identity found"

**Possible causes:**
- Certificate password is incorrect → Update `APPLE_CERTIFICATE_PASSWORD`
- Certificate expired → Generate new certificate in Apple Developer
- Wrong certificate type → Must be "Apple Distribution" not "Development"

**Solution:**
1. Verify certificate is valid in Keychain Access
2. Re-export with correct password
3. Update GitHub secrets

### Error: "Provisioning profile doesn't match bundle identifier"

**Solution:**
1. Verify provisioning profile matches your app's bundle ID
2. Re-download correct profile from Apple Developer
3. Convert to base64 and update secret

### Error: "Team ID is invalid"

**Solution:**
1. Go to [Apple Developer Membership](https://developer.apple.com/account/#/membership)
2. Copy exact Team ID (10 characters, e.g., `ABC1234XYZ`)
3. Update `APPLE_TEAM_ID` secret

## 📊 Comparison: Unsigned vs Signed

| Aspect | Unsigned Mode | Signed Mode |
|--------|---------------|-------------|
| **Apple Account** | ❌ Not needed | ✅ Required ($99/year) |
| **GitHub Secrets** | ❌ None | ✅ 4 secrets needed |
| **Output** | `.xcarchive` | `.ipa` |
| **Can test compilation** | ✅ Yes | ✅ Yes |
| **Upload to App Store** | ❌ No | ✅ Yes |
| **Install on device** | ❌ No | ✅ Yes (TestFlight) |
| **Production ready** | ❌ No | ✅ Yes |
| **Use case** | CI testing | Production distribution |

## 🎯 When to Use Each Mode

### Use **Unsigned** mode when:
- ✅ Testing CI/CD pipeline
- ✅ Verifying code compiles
- ✅ Don't have Apple Developer account yet
- ✅ Developing/prototyping

### Use **Signed** mode when:
- ✅ Ready to distribute to testers
- ✅ Releasing to App Store
- ✅ Need installable IPA
- ✅ Have Apple Developer account

## 💡 Pro Tips

1. **Keep certificates safe**: Store `.p12` file in secure location (password manager)
2. **Certificate expiration**: Apple certificates expire after 1 year - update secrets when renewed
3. **Multiple environments**: Create separate profiles for Development/AdHoc/AppStore
4. **Automate uploads**: Use App Store Connect API for fully automated releases

## 📚 Additional Resources

- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Code Signing Guide](https://developer.apple.com/support/code-signing/)
- [Fastlane Match](https://docs.fastlane.tools/actions/match/) - Alternative signing management

## 🆘 Need Help?

If you encounter issues:

1. Check workflow logs in GitHub Actions
2. Verify all 4 secrets are correctly configured
3. Ensure certificate and profile are valid in Apple Developer Portal
4. Try building locally in Xcode first to isolate issues

---

**Remember**: Unsigned mode is FREE and perfect for testing. Only switch to signed mode when you're ready to distribute! 🚀
