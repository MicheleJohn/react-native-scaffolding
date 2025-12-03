# GitHub → GitLab Auto-Mirror

## 🎯 Overview

Questo workflow GitHub Actions **automaticamente** pusha ogni commit da GitHub a GitLab.

**Perché:** GitLab Pull mirroring richiede **Premium tier** ($19/user/month). Questa è un'alternativa **FREE** usando GitHub Actions!

---

## 🚀 Setup

### **Step 1: Crea Progetto GitLab**

```
GitLab → New project → Create blank project

Project name: react-native-scaffolding
Visibility: Private/Internal
Initialize repository: ❌ NO (importeremo da GitHub)

Create project ✅
```

### **Step 2: Genera GitLab Access Token**

```
GitLab → Settings → Access Tokens

Token name: GitHub Mirror
Expiration: No expiration (o 1 year)

Scopes:
✅ api
✅ read_repository
✅ write_repository

Create project access token ✅

Copia token: glpat-xxxxxxxxxxxxx
```

### **Step 3: Aggiungi Secrets su GitHub**

```
GitHub → Repository → Settings → Secrets and variables → Actions

New repository secret:

1. Name: GITLAB_URL
   Value: https://gitlab.com/your-username/react-native-scaffolding.git
   Add secret ✅

2. Name: GITLAB_TOKEN
   Value: glpat-xxxxxxxxxxxxx (token from Step 2)
   Add secret ✅
```

### **Step 4: Test**

```bash
# Fai un commit su GitHub
git commit -m "Test mirror" --allow-empty
git push origin main

# Check GitHub Actions
GitHub → Actions → Mirror to GitLab → Should be running

# Check GitLab (dopo ~30 sec)
GitLab → Repository → Commits → Dovrebbe esserci il commit!
```

---

## 🔄 How It Works

```
GitHub (origin)
    ↓
    Commit/Push
    ↓
    Trigger GitHub Actions
    ↓
    git push --mirror to GitLab
    ↓
GitLab (mirror)
```

**Automatic:**
- ✅ Ogni push su GitHub → Auto-push a GitLab
- ✅ Tutti i branch copiati
- ✅ Branch deletions sincronizzate
- ✅ Full history preservata
- ✅ ~30 secondi di delay

---

## 📊 Comparison: GitHub Actions vs GitLab Pull Mirroring

| Feature | GitHub Actions | GitLab Pull Mirror |
|---------|----------------|--------------------|
| **Cost** | FREE | $19/user/month |
| **Delay** | ~30 sec | ~5 min |
| **Setup** | 5 min | 2 min |
| **Works with** | GitLab Free ✅ | GitLab Premium only |
| **Limitations** | None | Tier-locked |

**Winner:** GitHub Actions (FREE + faster!) 🏆

---

## 🔧 Configuration

### **Mirror Specific Branches Only**

```yaml
# .github/workflows/mirror-to-gitlab.yml
on:
  push:
    branches:
      - main        # Solo main
      - develop     # E develop
      # Remove '**' per non mirror tutti i branch
```

### **Skip CI on Mirror Commits**

Su GitLab, aggiungi in `.gitlab-ci.yml`:

```yaml
workflow:
  rules:
    # Skip CI se commit viene da mirror
    - if: '$CI_COMMIT_MESSAGE =~ /\[skip ci\]/'
      when: never
    - when: always
```

E modifica workflow GitHub:

```yaml
# .github/workflows/mirror-to-gitlab.yml
run: |
  git commit -m "Mirror commit [skip ci]" --allow-empty || true
  git push gitlab --mirror --force
```

### **Notifications**

Aggiungi notifications su failure:

```yaml
# .github/workflows/mirror-to-gitlab.yml
jobs:
  mirror:
    steps:
      # ... existing steps ...
      
      - name: Notify on failure
        if: failure()
        run: |
          echo "❌ Mirror to GitLab failed!"
          # Add Slack/email notification here
```

---

## 🔐 Security Best Practices

### **Token Permissions**

```
✅ Use Project Access Token (not Personal)
✅ Set expiration (1 year max)
✅ Minimal scopes (api, read_repository, write_repository)
❌ Don't use Maintainer role tokens
```

### **GitHub Secrets**

```
✅ Use repository secrets (not environment)
✅ Never commit tokens to code
✅ Rotate tokens every 6-12 months
```

---

## 🐛 Troubleshooting

### **Error: Authentication failed**

```
✅ Check GITLAB_TOKEN is valid
✅ Token has write_repository scope
✅ Token not expired
✅ GITLAB_URL format correct (must include .git)
```

### **Error: Repository not found**

```
✅ Check GITLAB_URL correct
✅ GitLab project exists
✅ Token has access to project
```

### **Mirror not happening**

```
GitHub → Actions → Check workflow runs
→ If failed, check logs
→ If not triggered, check workflow trigger conditions
```

### **GitLab shows old commits**

```bash
# Force re-mirror from GitHub Actions
GitHub → Actions → Mirror to GitLab → Re-run jobs
```

---

## 💡 Pro Tips

### **1. Monitor Mirror Health**

```yaml
# .github/workflows/mirror-health-check.yml
name: Mirror Health Check
on:
  schedule:
    - cron: '0 0 * * *'  # Daily

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check last mirror
        run: |
          # Check if GitLab is up to date
          # Alert if behind
```

### **2. GitLab CI/CD Still Works**

```yaml
# .gitlab-ci.yml works normally!
# CI runs on GitLab after mirror
stages:
  - test
  - build

ci:lint-and-test:
  stage: test
  script:
    - pnpm run lint
    - pnpm run test
```

### **3. Separate Development Workflows**

```
GitHub:
├─ Primary development
├─ GitHub Actions CI
└─ Auto-mirror to GitLab

GitLab:
├─ Mirror (read-only in practice)
├─ GitLab CI/CD
└─ Internal tooling
```

---

## ✅ Advantages

- ✅ **FREE** (no Premium tier needed)
- ✅ **Faster** (~30 sec vs 5 min)
- ✅ **More control** (customize mirror logic)
- ✅ **Works with GitLab Free**
- ✅ **Transparent** (see mirror status in GitHub Actions)
- ✅ **Reliable** (GitHub Actions SLA)

---

## ❌ Limitations

- ⚠️ Uses GitHub Actions minutes (2000/month free)
- ⚠️ ~30 sec delay (vs 5 min for GitLab pull mirror)
- ⚠️ Requires GitHub Actions enabled

**But:** For most projects, GitHub Actions free tier is more than enough!

---

## 📊 GitHub Actions Minutes Usage

```
Mirror job: ~30 seconds per run

Example project:
- 100 commits/month
- = 50 minutes/month
- = 2.5% of 2000 free minutes

✅ Plenty of headroom!
```

---

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitLab Mirroring Docs](https://docs.gitlab.com/ee/user/project/repository/mirror/)
- [Git Mirror Guide](https://docs.gitlab.com/ee/user/project/repository/mirror/push.html)

---

**Summary:** FREE GitHub → GitLab mirroring usando GitHub Actions! 🚀
