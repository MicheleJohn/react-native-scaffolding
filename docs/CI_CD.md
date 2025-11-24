# CI/CD Guide

## Overview

Questo progetto utilizza due workflow GitHub Actions:

1. **CI Workflow** (`ci.yml`) - Automatico su ogni push/PR
2. **EAS Build Workflow** (`eas-build.yml`) - Manuale per build mobile

## CI Workflow (Automatico)

### Quando viene eseguito

- **Push** su branch `main` o `develop`
- **Pull Request** verso `main` o `develop`

### Cosa fa

✅ **Lint** - Controlla code quality con ESLint
✅ **Format Check** - Verifica formattazione con Prettier
✅ **Type Check** - Controlla errori TypeScript
✅ **Tests** - Esegue unit tests con coverage

### Perché NON fa build mobile?

⚠️ **Build mobile sono costose e lente:**
- iOS build richiede macOS runner (6x più costoso)
- Android build richiede 10-15 minuti
- Build sono necessari solo per release, non per ogni commit

✅ **Vantaggi del CI leggero:**
- **Veloce**: ~2-3 minuti invece di 15-30 minuti
- **Economico**: Usa runner Linux standard
- **Feedback rapido**: Sviluppatori vedono subito errori di lint/test

## EAS Build Workflow (Manuale)

### Come eseguirlo

1. Vai su **GitHub** → **Actions**
2. Seleziona **"EAS Build"**
3. Clicca **"Run workflow"**
4. Scegli:
   - **Platform**: `android`, `ios`, o `all`
   - **Profile**: `development`, `preview`, o `production`
5. Clicca **"Run workflow"**

### Build Profiles

#### Development
```bash
# Per testing interno con dev features
Profile: development
Uso: Test su device fisici
Output: APK/IPA installabile via Expo Go
```

#### Preview
```bash
# Per QA e stakeholder review
Profile: preview
Uso: Testing pre-release
Output: APK standalone / TestFlight build
```

#### Production
```bash
# Per release su store
Profile: production
Uso: Deployment finale
Output: AAB per Play Store / IPA per App Store
```

## Setup Secrets

### GitHub Repository Secrets

Aggiungi in **Settings** → **Secrets and variables** → **Actions**:

```bash
# Required per EAS builds
EXPO_TOKEN=your-expo-token

# Optional per coverage reports
CODECOV_TOKEN=your-codecov-token
```

### Come ottenere EXPO_TOKEN

```bash
# 1. Installa EAS CLI
pnpm add -g eas-cli

# 2. Login
eas login

# 3. Genera token
eas build:configure

# 4. Copia il token e aggiungilo ai GitHub Secrets
```

## Branch Strategy

### Recommended Setup

```
main (production)
  ↑
  PR + CI check
  │
develop (staging)
  ↑
  PR + CI check
  │
feature/* (development)
```

### Workflow per Release

1. **Sviluppo**:
   ```bash
   git checkout -b feature/new-feature
   # ... sviluppo ...
   git push origin feature/new-feature
   # Apri PR verso develop
   # CI verifica automaticamente
   ```

2. **Testing**:
   ```bash
   # Dopo merge in develop
   # Esegui manualmente EAS Build (preview profile)
   # Distribuisci a tester via TestFlight/Internal Testing
   ```

3. **Release**:
   ```bash
   # Apri PR da develop a main
   # CI verifica
   # Dopo merge:
   # Esegui EAS Build (production profile)
   # Submit agli store
   ```

## Local Development

### Pre-commit Hooks

Husky esegue automaticamente prima di ogni commit:

```bash
# Configurato in .husky/pre-commit
- ESLint fix
- Prettier format
```

### Manual Checks

```bash
# Esegui tutti i check localmente
pnpm lint
pnpm format:check
pnpm type-check
pnpm test
```

## Troubleshooting CI/CD

### CI Fails: ESLint Errors

```bash
# Locale
pnpm lint:fix
git add .
git commit --amend --no-edit
git push --force
```

### CI Fails: Type Errors

```bash
# Locale
pnpm type-check
# Fix errori
git add .
git commit --amend --no-edit
git push --force
```

### CI Fails: Tests

```bash
# Locale
pnpm test
# Fix test
git add .
git commit --amend --no-edit
git push --force
```

### EAS Build Fails

```bash
# Check logs
eas build:list
eas build:view [build-id]

# Common fixes:
# 1. Verifica EXPO_TOKEN in GitHub Secrets
# 2. Verifica eas.json configuration
# 3. Check app.json bundle identifiers
```

## Cost Optimization

### GitHub Actions Minutes

- **CI (Linux)**: ~2 minuti = 2 minutes
- **Build Android (Linux)**: ~15 minuti = 15 minutes
- **Build iOS (macOS)**: ~20 minuti = 120 minutes (6x multiplier)

### Free Tier Limits

- **Public repos**: Unlimited minutes
- **Private repos**: 
  - Free: 2,000 minutes/month
  - Pro: 3,000 minutes/month

### Best Practices

✅ **Do:**
- Run CI on every commit (fast & cheap)
- Run EAS builds manually when needed
- Use `preview` profile for testing
- Use `production` only for releases

❌ **Don't:**
- Auto-build mobile on every commit
- Build iOS in CI unless necessary
- Use `production` profile for testing

## Advanced: Automated Release

### Release Workflow (Optional)

Crea `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      # ... setup ...
      - name: Build and Submit
        run: |
          eas build --platform all --profile production --auto-submit
```

### Semantic Versioning

```bash
# Release patch (1.0.0 → 1.0.1)
npm version patch
git push --tags

# Release minor (1.0.0 → 1.1.0)
npm version minor
git push --tags

# Release major (1.0.0 → 2.0.0)
npm version major
git push --tags
```
