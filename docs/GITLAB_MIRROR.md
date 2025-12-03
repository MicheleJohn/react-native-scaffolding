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

### **Step 2: Unprotect Default Branch (IMPORTANTE!)**

**CRITICAL:** GitLab protegge il default branch per default, bloccando force pushes.

```
GitLab Project → Settings → Repository → Protected branches

Find: main (or master)
Click: Unprotect

⚠️ Questo permette al workflow di pushare!
```

**Alternative (più sicura):**

```
GitLab Project → Settings → Repository → Protected branches

Find: main
Allowed to push: Maintainers
Allowed to force push: ✅ Enable (toggle ON)

✅ Save changes
```

### **Step 3: Genera GitLab Access Token**

```
GitLab → Settings → Access Tokens

Token name: GitHub Mirror
Expiration: No expiration (o 1 year)

Select a role: Maintainer (needed for force push)

Scopes:
✅ api
✅ read_repository
✅ write_repository

Create project access token ✅

Copia token: glpat-xxxxxxxxxxxxx
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
   Value: glpat-xxxxxxxxxxxxx (token from Step 3)
   Add secret ✅
```

### **Step 5: Test**

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
    Push to main
    ↓
    Trigger GitHub Actions
    ↓
    For each branch:
      git push gitlab origin/branch:refs/heads/branch --force
    ↓
GitLab (mirror)
```

**Features:**
- ✅ Pushes all branches individually (not --mirror)
- ✅ Avoids "deny updating a hidden ref" errors
- ✅ Works with protected branches (if force push enabled)
- ✅ Full history preserved
- ✅ ~30-60 seconds delay

---

## 🐛 Troubleshooting

### **Error: pre-receive hook declined**

```
remote: GitLab: The default branch of a project cannot be deleted.
! [remote rejected] main (pre-receive hook declined)
```

**Solution:** Unprotect branch o enable force push

```
GitLab → Settings → Repository → Protected branches
→ main → Unprotect
OR
→ main → Allowed to force push: ✅ Enable
```

---

### **Error: deny updating a hidden ref**

```
! [remote rejected] origin/main -> origin/main (deny updating a hidden ref)
```

**Solution:** ✅ Already fixed in workflow!

Workflow now pushes only real branches:
```bash
# ❌ OLD (broken):
git push gitlab --mirror

# ✅ NEW (works):
for branch in $(git branch -r | grep 'origin/'); do
  git push gitlab origin/$branch:refs/heads/$branch
done
```

---

### **Error: Authentication failed**

```
✅ Check GITLAB_TOKEN is valid
✅ Token has write_repository scope
✅ Token role is Maintainer (not Developer)
✅ Token not expired
✅ GITLAB_URL format correct (must end with .git)
```

---

### **Error: Repository not found**

```
✅ Check GITLAB_URL correct
✅ GitLab project exists
✅ Token has access to project
✅ Project visibility allows token access
```

---

### **Mirror not happening**

```
GitHub → Actions → Check workflow runs
→ If failed, check logs
→ If not triggered, check workflow trigger (only on main branch)
```

---

### **GitLab shows old commits**

```bash
# Force re-mirror from GitHub Actions
GitHub → Actions → Mirror to GitLab → Re-run workflow (manual trigger)
```

---

## ⚙️ Configuration

### **Mirror Multiple Branches**

```yaml
# .github/workflows/mirror-to-gitlab.yml
on:
  push:
    branches:
      - main
      - develop      # Add more branches
      - 'release/**' # Branch patterns
```

### **Skip CI on Mirror Commits**

Su GitLab, modifica `.gitlab-ci.yml`:

```yaml
workflow:
  rules:
    # Skip CI se commit da mirror
    - if: '$CI_COMMIT_AUTHOR == "GitHub Mirror Bot"'
      when: never
    - when: always
```

### **Notifications on Failure**

```yaml
# .github/workflows/mirror-to-gitlab.yml
jobs:
  mirror:
    steps:
      # ... existing steps ...
      
      - name: Notify on failure
        if: failure()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {"text": "❌ GitLab mirror failed!"}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📊 Comparison: GitHub Actions vs GitLab Pull Mirroring

| Feature | GitHub Actions | GitLab Pull Mirror |
|---------|----------------|--------------------|
| **Cost** | FREE | $19/user/month |
| **Delay** | ~30-60 sec | ~5 min |
| **Setup** | 5 min | 2 min |
| **Works with** | GitLab Free ✅ | GitLab Premium only |
| **Protected branches** | Need to configure | Works OOTB |
| **Force push** | Supported | Not needed |

---

## 💡 Pro Tips

### **1. Use Project Access Token**

```
✅ Project Access Token (scoped to project)
❌ Personal Access Token (access to all repos)
```

### **2. Set Token Expiration**

```
✅ 1 year expiration (add calendar reminder)
⚠️ No expiration (risk if token leaked)
```

### **3. Rotate Tokens Regularly**

```
1. Generate new token
2. Update GitHub secret
3. Test mirror
4. Revoke old token
```

### **4. Monitor Mirror Health**

```
GitHub → Actions → Mirror to GitLab
→ Check recent runs
→ Enable notifications on failure
```

---

## ✅ Advantages

- ✅ **FREE** (no Premium tier needed)
- ✅ **Faster** (~30-60 sec vs 5 min)
- ✅ **More control** (customize mirror logic)
- ✅ **Works with GitLab Free**
- ✅ **Transparent** (see mirror status in GitHub Actions)
- ✅ **Reliable** (GitHub Actions SLA)

---

## ❌ Limitations

- ⚠️ Uses GitHub Actions minutes (2000/month free)
- ⚠️ ~30-60 sec delay (vs 5 min for GitLab pull mirror)
- ⚠️ Requires unprotecting default branch OR enabling force push
- ⚠️ Only mirrors on push to specified branches

---

## 📊 GitHub Actions Minutes Usage

```
Mirror job: ~30-60 seconds per run

Example project:
- 100 commits/month to main
- = 50-100 minutes/month
- = 2.5-5% of 2000 free minutes

✅ Plenty of headroom!
```

---

## 🔐 Security Best Practices

### **Token Permissions (Minimal)**

```
✅ Role: Maintainer (minimum for force push)
✅ Scopes: api, read_repository, write_repository (only what's needed)
❌ Don't use Owner tokens
```

### **GitHub Secrets**

```
✅ Use repository secrets (not environment)
✅ Never commit tokens to code
✅ Rotate tokens every 6-12 months
✅ Use separate tokens per environment
```

### **Protected Branches (GitLab)**

```
Option A (less secure):
→ Unprotect main branch

Option B (more secure):
→ Keep protected
→ Enable "Allowed to force push"
→ Only for Maintainers
```

---

## 📚 Additional Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [GitLab Protected Branches](https://docs.gitlab.com/ee/user/project/protected_branches.html)
- [GitLab Access Tokens](https://docs.gitlab.com/ee/user/project/settings/project_access_tokens.html)
- [Git Push Force](https://git-scm.com/docs/git-push#Documentation/git-push.txt---force)

---

**Summary:** FREE GitHub → GitLab mirroring with proper error handling! 🚀
