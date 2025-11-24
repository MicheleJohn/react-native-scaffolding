# Deployment Guide

## Environment Configuration

### Development

```env
EXPO_PUBLIC_API_URL=https://dev-api.yourapp.com
EXPO_PUBLIC_SENTRY_DSN=https://your-dev-dsn@sentry.io/project-id
EXPO_PUBLIC_ENV=development
```

### Staging

```env
EXPO_PUBLIC_API_URL=https://staging-api.yourapp.com
EXPO_PUBLIC_SENTRY_DSN=https://your-staging-dsn@sentry.io/project-id
EXPO_PUBLIC_ENV=staging
```

### Production

```env
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_SENTRY_DSN=https://your-prod-dsn@sentry.io/project-id
EXPO_PUBLIC_ENV=production
```

## EAS Build Profiles

### Development Build

```bash
# Build for development
eas build --profile development --platform ios
eas build --profile development --platform android
```

Development builds include:
- Debug symbols
- Development client
- Internal distribution

### Preview Build

```bash
# Build for testing
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

Preview builds are for:
- QA testing
- Stakeholder review
- Internal testing

### Production Build

```bash
# Build for production
eas build --profile production --platform ios
eas build --profile production --platform android
```

Production builds include:
- ProGuard/R8 obfuscation (Android)
- Optimized bundles
- Release signing

## Continuous Deployment

### GitHub Actions (Example)

```yaml
name: EAS Build

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: eas build --non-interactive --platform all
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

## Store Submission

### iOS App Store

1. **Prepare assets**:
   - App icon (1024x1024)
   - Screenshots for all device sizes
   - App preview video (optional)

2. **Configure App Store Connect**:
   - App information
   - Pricing and availability
   - App Privacy details

3. **Submit build**:
   ```bash
   eas submit --platform ios
   ```

4. **App Review**:
   - Provide test account if needed
   - Fill out review information
   - Submit for review

### Google Play Store

1. **Prepare assets**:
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots for phone and tablet

2. **Configure Play Console**:
   - App content
   - Store listing
   - Pricing & distribution

3. **Submit build**:
   ```bash
   eas submit --platform android
   ```

4. **Release**:
   - Internal testing
   - Closed testing
   - Open testing
   - Production

## OTA Updates

Expo allows over-the-air updates for JavaScript changes:

```bash
# Publish update
eas update --branch production --message "Bug fixes"

# Preview update
eas update --branch preview --message "New features"
```

### Update Channels

- `production` - Live users
- `preview` - Beta testers
- `development` - Internal development

## Monitoring

### Sentry Integration

1. Create project in Sentry
2. Add DSN to environment variables
3. Configure source maps upload:

```json
{
  "expo": {
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "your-org",
            "project": "your-project"
          }
        }
      ]
    }
  }
}
```

### Analytics

Consider adding:
- Firebase Analytics
- Mixpanel
- Amplitude

## Rollback Strategy

### OTA Rollback

```bash
# Rollback to previous update
eas update:republish --branch production --group [previous-group-id]
```

### Binary Rollback

- Use store's phased rollout features
- Keep previous builds available
- Monitor crash rates closely

## Performance Optimization

### Before Release

1. **Enable Hermes** (default in this setup)
2. **Optimize images** with proper compression
3. **Remove console.logs** in production
4. **Enable ProGuard/R8** (Android)
5. **Test on real devices**

### Bundle Size

```bash
# Analyze bundle
npx react-native-bundle-visualizer
```

## Security Checklist

- [ ] No hardcoded secrets
- [ ] Environment variables properly set
- [ ] SSL pinning (if required)
- [ ] ProGuard enabled (Android)
- [ ] App Transport Security configured (iOS)
- [ ] Proper permissions requested
- [ ] Third-party dependencies audited

## Post-Deployment

1. **Monitor error rates** in Sentry
2. **Check performance metrics**
3. **Review user feedback**
4. **Monitor crash-free rate**
5. **Track key metrics**
