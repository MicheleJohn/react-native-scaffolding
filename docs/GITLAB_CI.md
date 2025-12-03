# GitLab CI/CD Setup

## 🎯 Overview

Questo repository include configurazione **GitLab CI/CD** che replica esattamente le funzionalità di GitHub Actions.

---

## 📋 Workflows Disponibili

### 1. **CI - Lint & Test** (Automatico)

**Trigger:**
- Merge Request
- Push su `main` o `develop`

**Cosa fa:**
- ✅ Install dependencies + icon generation
- ✅ Verifica icon generation
- ✅ Lint (ESLint)
- ✅ Type check (TypeScript)
- ✅ Format check (Prettier)
- ✅ Run tests con coverage

**GitLab UI:**
```
Merge Request → Pipelines → ci:lint-and-test
```

---

### 2. **Build Web** (Manuale/Automatico)

**Trigger:**
- Push su `main` (automatico)
- Manual trigger

**Cosa fa:**
- ✅ Build static export (`dist/`)
- ✅ Upload artifacts (30 giorni)

**Download:**
```
Pipelines → Job → Download artifacts
```

**Locale:**
```bash
pnpm run build:web
```

---

### 3. **Build Android** (Manuale - FREE)

**Trigger:** Manual only

**Cosa fa:**
- ✅ Build APK debug/release
- ✅ Upload artifacts
- ✅ Completamente GRATIS!

**Variables:**
- `BUILD_TYPE`: `debug` o `release` (default: debug)

**Usage:**
```
1. Pipelines → Run pipeline
2. Variables → BUILD_TYPE = release
3. Run pipeline → build:android → Manual trigger
4. Download APK da Artifacts
```

**Secrets necessari (per release):**
```
Settings → CI/CD → Variables:
- ANDROID_KEYSTORE_BASE64
- KEYSTORE_PASSWORD
- KEY_ALIAS
- KEY_PASSWORD
```

---

### 4. **Build EAS** (Manuale - PAID)

**Trigger:** Manual only (richiede `EXPO_TOKEN`)

**Cosa fa:**
- ✅ Trigger EAS cloud build
- ✅ iOS/Android builds

**Variables:**
- `PLATFORM`: `all`, `ios`, `android`
- `PROFILE`: `development`, `preview`, `production`

**Setup:**
```bash
# 1. Generate token
eas login
eas token:create

# 2. Add to GitLab
Settings → CI/CD → Variables
Name: EXPO_TOKEN
Value: <your-token>
Masked: ✅
Protected: ✅
```

**Usage:**
```
1. Pipelines → Run pipeline
2. Variables:
   - PLATFORM = all
   - PROFILE = preview
3. Run pipeline → build:eas → Manual trigger
4. Check expo.dev per status
```

**Cost:** $99/month

---

### 5. **EAS Update (OTA)** (Manuale - PAID)

**Trigger:**
- Automatico su push `main` (se `EXPO_TOKEN` configurato)
- Manual trigger

**Cosa fa:**
- ✅ Publish over-the-air update
- ✅ No app store review needed

**Variables:**
- `BRANCH`: `preview` o `production`
- `MESSAGE`: Update message

**Usage:**
```bash
# Via GitLab
Pipelines → Run pipeline → update:eas → Manual trigger

# Via CLI locale
eas update --branch preview --message "Fix bug"
```

---

## 🔧 Setup Iniziale

### **1. Copia File su GitLab**

Se il tuo progetto è su GitLab:

```bash
# Il file .gitlab-ci.yml è già nel repo!
# Niente da fare, funziona subito ✅
```

Se stai migrando da GitHub a GitLab:

```bash
# Mirror repository
git remote add gitlab git@gitlab.com:username/repo.git
git push gitlab main
```

---

### **2. Configurazione pnpm Cache**

Il caching pnpm è già configurato in `.gitlab-ci.yml`:

```yaml
cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store
```

**Performance:**
- First run: ~2-3 min
- Cached runs: ~30-60 sec ⚡

---

### **3. Variables & Secrets**

**Location:** `Settings → CI/CD → Variables`

#### **Per Web Build (FREE)**
Nessun secret necessario! ✅

#### **Per Android Release Build (FREE)**
```
ANDROID_KEYSTORE_BASE64  # Base64 del keystore file
KEYSTORE_PASSWORD        # Password keystore
KEY_ALIAS                # Alias chiave
KEY_PASSWORD             # Password chiave
```

#### **Per EAS Build (PAID)**
```
EXPO_TOKEN               # Token da `eas token:create`
```

**Settings consigliati:**
- Type: Variable
- Environment scope: All
- Protected: ✅ (solo su protected branches)
- Masked: ✅ (nasconde nei logs)
- Expand variable reference: ❌

---

## 📊 Pipeline Flow

```
Commit/MR created
    ↓
┌─────────────────┐
│ TEST STAGE      │
│ ci:lint-and-test│  ← Automatico
└─────────────────┘
    ↓
┌─────────────────┐
│ BUILD STAGE     │
│ build:web       │  ← Automatico su main, altrimenti manual
│ build:android   │  ← Manual only
└─────────────────┘
    ↓
┌─────────────────┐
│ DEPLOY STAGE    │
│ build:eas       │  ← Manual only (richiede EXPO_TOKEN)
│ update:eas      │  ← Manual/Auto (richiede EXPO_TOKEN)
└─────────────────┘
```

---

## 🎯 Comparison: GitLab vs GitHub

| Feature | GitLab CI | GitHub Actions |
|---------|-----------|----------------|
| **Config file** | `.gitlab-ci.yml` | `.github/workflows/*.yml` |
| **Cache** | Built-in (faster) | actions/cache@v4 |
| **Artifacts** | Built-in | actions/upload-artifact@v4 |
| **pnpm** | Corepack | pnpm/action-setup |
| **Manual trigger** | `when: manual` | `workflow_dispatch` |
| **Variables** | CI/CD Variables | Secrets |
| **Free minutes** | 400 min/month (free tier) | 2000 min/month (free tier) |

---

## 💡 Best Practices

### **1. Cache Strategy**

```yaml
# ✅ GOOD - Cache per lockfile
cache:
  key:
    files:
      - pnpm-lock.yaml
  paths:
    - .pnpm-store

# ❌ BAD - Cache globale (invalidation lenta)
cache:
  key: global-cache
  paths:
    - .pnpm-store
```

---

### **2. Manual Jobs**

Usa `when: manual` per job costosi:

```yaml
build:android:
  rules:
    - when: manual  # Non parte automaticamente
      allow_failure: true  # Non blocca pipeline se skippato
```

---

### **3. Protected Variables**

Per secrets sensibili:

```yaml
# In .gitlab-ci.yml
build:eas:
  rules:
    - if: $EXPO_TOKEN  # Solo se secret esiste
      when: manual
```

```
# In GitLab UI
Settings → Variables → EXPO_TOKEN
Protected: ✅  # Solo su protected branches (main, develop)
Masked: ✅     # Nasconde nei logs
```

---

### **4. Artifacts Retention**

```yaml
artifacts:
  expire_in: 30 days  # Auto-cleanup dopo 30 giorni
  paths:
    - dist/
```

Quota artifacts su GitLab.com free tier: **10 GB**

---

## 🧪 Testing Locale

### **Test Icon Generation**
```bash
rm -rf src/components/icons node_modules
pnpm install
ls src/components/icons/
```

### **Test Lint & Type Check**
```bash
pnpm run lint
pnpm run type-check
pnpm run format:check
pnpm run test:ci
```

### **Test Web Build**
```bash
pnpm run build:web
ls -lah dist/

# Test in browser
cd dist
python3 -m http.server 8000
# Apri: http://localhost:8000
```

---

## 🐛 Troubleshooting

### **Icon Generation Fallisce**

```bash
# Check SVG files
ls assets/icons/*.svg

# Test locale
pnpm run icons:generate
```

### **pnpm Cache Non Funziona**

```yaml
# Verifica cache config
cache:
  key:
    files:
      - pnpm-lock.yaml  # ✅ Must exist
  paths:
    - .pnpm-store      # ✅ Must be in project root
```

### **Android Build Fallisce**

```bash
# Test locale
cd android
./gradlew assembleDebug

# Check Java version
java -version  # Must be 17
```

### **EAS Build Non Parte**

```bash
# Verifica token
eas whoami

# Check su GitLab
Settings → Variables → EXPO_TOKEN exists?
```

---

## 📚 Resources

- [GitLab CI/CD Docs](https://docs.gitlab.com/ee/ci/)
- [GitLab CI Yaml Reference](https://docs.gitlab.com/ee/ci/yaml/)
- [pnpm in GitLab CI](https://pnpm.io/continuous-integration#gitlab)
- [EAS Build Docs](https://docs.expo.dev/build/introduction/)
- [React Native on GitLab](https://about.gitlab.com/blog/2019/09/30/mobile-cicd-with-gitlab/)

---

## ✅ Quick Start Checklist

- [ ] File `.gitlab-ci.yml` nel repository
- [ ] Push su GitLab
- [ ] Verifica pipeline passa (`ci:lint-and-test`)
- [ ] (Optional) Add `EXPO_TOKEN` per EAS builds
- [ ] (Optional) Setup Android keystore per release builds
- [ ] Test manual trigger `build:web`
- [ ] Profit! 🎉

---

**GitLab CI/CD ready! Stessa funzionalità di GitHub Actions, zero configurazione extra.** 🚀
