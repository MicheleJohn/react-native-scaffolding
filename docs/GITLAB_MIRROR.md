# GitHub → GitLab Auto-Mirror (Branch-Safe)

## 🎯 Overview

Questo workflow GitHub Actions **automaticamente**:
1. Pusha ogni branch da GitHub a GitLab
2. Crea/aggiorna Merge Request su GitLab per feature/* e hotfix/*
3. **NON** tocca main direttamente su GitLab (merge avviene là)

**Perché:** GitLab Pull mirroring richiede **Premium tier** ($19/user/month). Questa è un'alternativa **FREE** e **più sicura** per ambienti enterprise.

---

## 🔄 Come Funziona

```
GitHub (origin)
    ↓
    Push to any branch (main, develop, feature/*, hotfix/*)
    ↓
    GitHub Actions workflow triggered
    ↓
    git push gitlab HEAD:refs/heads/<branch>
    ↓
    If feature/* or hotfix/*:
      Create/Update Merge Request on GitLab
    ↓
GitLab (mirror)
    ↓
    Review & Approve MR
    ↓
    Merge to main (on GitLab)
```

**Benefits:**
- ✅ Preserva GitLab review process
- ✅ Mantiene approvals e protected branches
- ✅ GitLab CI/CD runs normalmente
- ✅ Nessun force push su main
- ✅ Completamente FREE

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

### **Step 2: Ottieni GitLab Project ID**

```
GitLab Project → Settings → General

📋 Project ID: 12345678 (numero in alto)

Copia questo ID!
```

### **Step 3: Genera GitLab Access Token**

```
GitLab Project → Settings → Access Tokens

Token name: GitHub Mirror Bot
Expiration: 1 year (recommended)

Select a role: Maintainer (needed for MR creation)

Scopes:
✅ api (for MR creation)
✅ read_repository
✅ write_repository

Create project access token ✅

📋 Copia token: glpat-xxxxxxxxxxxxx
```

### **Step 4: Aggiungi Secrets su GitHub**

```
GitHub → Repository → Settings → Secrets and variables → Actions

New repository secret:

1. Name: GITLAB_URL
   Value: https://gitlab.com/your-company/react-native-scaffolding.git
   ⚠️ Must end with .git!
   Add secret ✅

2. Name: GITLAB_TOKEN
   Value: glpat-xxxxxxxxxxxxx (from Step 3)
   Add secret ✅

3. Name: GITLAB_HOST
   Value: gitlab.com (or gitlab.yourcompany.com)
   Add secret ✅

4. Name: GITLAB_PROJECT_ID
   Value: 12345678 (from Step 2)
   Add secret ✅
```

### **Step 5: Configure GitLab Protected Branches (Raccomandato)**

**Proteggi main su GitLab:**

```
GitLab → Settings → Repository → Protected branches

main:
├─ Allowed to merge: Maintainers
├─ Allowed to push: No one (✅ Raccomandato)
└─ Allowed to force push: ❌ Disabled

Save changes ✅
```

**Perché:** Main viene aggiornato solo via MR (review process)

### **Step 6: Test**

```bash
# Crea feature branch su GitHub
git checkout -b feature/test-mirror
git commit -m "Test mirror" --allow-empty
git push origin feature/test-mirror

# Wait ~30-60 sec

# Check GitHub Actions
GitHub → Actions → Mirror to GitLab → Should succeed ✅

# Check GitLab
GitLab → Repository → Branches → feature/test-mirror presente ✅
GitLab → Merge Requests → Nuova MR creata! ✅
```

---

## 📝 Workflow Behavior

### **Branch Mirroring**

| GitHub Branch | GitLab Push | MR Created? | Target Branch |
|---------------|-------------|-------------|---------------|
| `main` | ✅ Yes | ❌ No | N/A |
| `develop` | ✅ Yes | ❌ No | N/A |
| `feature/*` | ✅ Yes | ✅ Yes | `main` |
| `hotfix/*` | ✅ Yes | ✅ Yes | `main` |
| Other | ❌ No | ❌ No | N/A |

### **Merge Request Auto-Creation**

**Per feature/* e hotfix/*:**

1. **First push** → Crea nuova MR su GitLab
2. **Subsequent pushes** → Aggiorna MR esistente
3. **MR title:** 🔄 Mirror: feature/xyz → main
4. **MR description:** Include source, target, e link GitHub

---

## 🐛 Troubleshooting

### **Error: Authentication failed**

```
✅ Check GITLAB_TOKEN is valid
✅ Token has api, read_repository, write_repository scopes
✅ Token role is Maintainer (not Developer)
✅ Token not expired
```

### **Error: Project not found**

```
✅ Check GITLAB_URL format: https://gitlab.com/namespace/project.git
✅ Check GITLAB_PROJECT_ID is correct (numeric ID)
✅ Token has access to project
```

### **Error: Cannot create MR**

```
✅ GITLAB_HOST correct (gitlab.com or your instance)
✅ GITLAB_PROJECT_ID correct (numeric)
✅ Token has 'api' scope
✅ Source branch exists on GitLab
```

### **MR not created for feature branch**

```
Check:
✅ Branch name starts with 'feature/' or 'hotfix/'
✅ GitHub Actions workflow completed successfully
✅ GITLAB_PROJECT_ID and GITLAB_HOST secrets exist
```

### **Mirror not happening**

```
GitHub → Actions → Check workflow runs
→ If failed, check logs
→ If not triggered, check branch matches trigger patterns
```

---

## ⚙️ Configuration

### **Mirror Additional Branch Patterns**

```yaml
# .github/workflows/mirror-to-gitlab.yml
on:
  push:
    branches:
      - main
      - develop
      - 'feature/**'
      - 'hotfix/**'
      - 'release/**'  # Add release branches
      - 'bugfix/**'   # Add bugfix branches
```

### **Change MR Target Branch**

```yaml
# .github/workflows/mirror-to-gitlab.yml
# In "Create or update Merge Request" step:

- TARGET_BRANCH="main"  # Change to "develop" if needed
+ TARGET_BRANCH="develop"
```

### **Skip MR for Certain Branches**

```yaml
# .github/workflows/mirror-to-gitlab.yml

- if: startsWith(steps.vars.outputs.BRANCH, 'feature/') || startsWith(steps.vars.outputs.BRANCH, 'hotfix/')
+ if: startsWith(steps.vars.outputs.BRANCH, 'feature/')  # Only feature branches
```

### **Manual Trigger for Any Branch**

```
GitHub → Actions → Mirror to GitLab (Branch-Safe)
→ Run workflow
→ Branch: feature/my-branch (optional, leave empty for current)
→ Run workflow ✅
```

---

## 📊 Comparison: Solutions

| Method | Cost | Delay | Direct main push | Review process | Works with |
|--------|------|-------|------------------|----------------|------------|
| **GitHub Actions (MR)** | FREE | 30-60s | ❌ No (safer) | ✅ Preserved | GitLab Free ✅ |
| **GitHub Actions (Force)** | FREE | 30s | ✅ Yes | ❌ Bypassed | GitLab Free ✅ |
| **GitLab Pull Mirror** | $19/mo | 5 min | ✅ Yes | ❌ Bypassed | Premium only |

**Winner:** GitHub Actions with MR! 🏆

---

## 💡 Pro Tips

### **1. GitLab CI/CD Still Works**

```yaml
# .gitlab-ci.yml on GitLab runs normally
stages:
  - test
  - build

test:
  stage: test
  script:
    - pnpm run lint
    - pnpm run test
  only:
    - merge_requests  # Run on MRs
```

### **2. Require Approvals on GitLab**

```
GitLab → Settings → Merge requests

Merge request approvals:
├─ Approvals required: 1 (or more)
├─ Prevent approval by author: ✅ Enable
└─ Require approval on new commits: ✅ Enable

Save changes ✅
```

### **3. Auto-Close MR on Merge**

GitLab automatically closes MR when merged. No configuration needed!

### **4. Monitor Mirror Health**

```
GitHub → Actions → Mirror to GitLab (Branch-Safe)
→ Check recent runs
→ Enable notifications on failure
```

### **5. Branch Protection Best Practices**

**GitHub (development):**
```
Branch protection for main:
✅ Require pull request reviews
✅ Require status checks
✅ Require conversation resolution
```

**GitLab (production/internal):**
```
Protected branch for main:
✅ Allowed to push: No one
✅ Allowed to merge: Maintainers
✅ Require approvals: 1+
```

---

## 🔐 Security Best Practices

### **Token Permissions (Minimal)**

```
✅ Use Project Access Token (not Personal)
✅ Role: Maintainer (minimum needed)
✅ Scopes: api, read_repository, write_repository ONLY
✅ Expiration: 1 year (add calendar reminder)
❌ Don't use Owner/Admin tokens
```

### **GitHub Secrets**

```
✅ Use repository secrets (not environment)
✅ Never commit tokens to code
✅ Rotate tokens every 6-12 months
✅ Use separate tokens per environment (prod/staging)
```

### **GitLab Access Control**

```
✅ Restrict who can approve MRs
✅ Enable "Require approval on new commits"
✅ Use CODEOWNERS for automatic reviewers
✅ Audit access tokens regularly
```

---

## ✅ Advantages

- ✅ **FREE** (no Premium tier needed)
- ✅ **Fast** (~30-60 sec delay)
- ✅ **Safe** (no direct push to main)
- ✅ **Review process** (GitLab MR workflow intact)
- ✅ **Approvals** (GitLab approval rules work)
- ✅ **CI/CD** (GitLab pipelines run normally)
- ✅ **Audit trail** (all changes via MR)
- ✅ **Works with GitLab Free**
- ✅ **Enterprise-ready** (respects protection rules)

---

## ❌ Limitations

- ⚠️ Uses GitHub Actions minutes (2000/month free)
- ⚠️ ~30-60 sec delay (vs 5 min for GitLab pull mirror)
- ⚠️ Requires manual merge on GitLab (by design - safer!)
- ⚠️ Only mirrors configured branch patterns

---

## 📊 GitHub Actions Minutes Usage

```
Mirror job: ~30-60 seconds per run

Example project:
- 50 feature branches/month
- 5 pushes per feature = 250 pushes
- = 125-250 minutes/month
- = 6-12% of 2000 free minutes

✅ Still plenty of headroom!
```

---

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitLab MR API](https://docs.gitlab.com/ee/api/merge_requests.html)
- [GitLab Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html)
- [GitLab Approval Rules](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)

---

**Summary:** FREE, safe, enterprise-ready GitHub → GitLab mirroring with review process! 🚀
