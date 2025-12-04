# Build Caching Optimization Guide

This guide explains the **advanced caching strategies** implemented in our CI/CD workflow to achieve **60-70% faster builds**.

## 🎯 Performance Improvements

### Real-World Data (2025)

| Platform | Without Advanced Caching | With Advanced Caching | Improvement |
|----------|-------------------------|----------------------|-------------|
| **Android** | ~13 minutes | ~6-8 minutes | **50-70% faster** |
| **iOS** | ~21 minutes | ~7-10 minutes | **60-70% faster** |
| **First build** | Same | +15% overhead | Cold cache |
| **Subsequent builds** | Same | **70% faster** | Warm cache |

**Sources:** React Native community benchmarks, GitHub Actions optimization guides, real production data from Expensify and Callstack.

## 📦 Android Caching Strategy

### 1. **Gradle Build Cache** (Biggest Impact!)

**What it does:**
Gradle stores task outputs (`.class` files, resources, etc.) and reuses them when inputs haven't changed.

**Implementation:**
```yaml
- name: Enable Gradle performance features
  run: |
    cat >> ~/.gradle/gradle.properties << EOF
    # Enable Gradle build cache
    org.gradle.caching=true
    
    # Enable configuration cache (faster configuration phase)
    org.gradle.configuration-cache=true
    EOF
```

**Impact:** 40-50% faster incremental builds.

### 2. **Configuration Cache**

**What it does:**
Caches Gradle's configuration phase, skipping project evaluation when nothing changed.

```properties
org.gradle.configuration-cache=true
```

**Impact:** 20-30% faster configuration phase (especially for multi-module projects).

### 3. **Multi-Layer Caching**

**Layer 1 - Dependencies:**
```yaml
- name: Cache Gradle packages
  uses: actions/cache@v4
  with:
    path: |
      ~/.gradle/caches
      ~/.gradle/wrapper
      ~/.gradle/native
    key: gradle-${{ hashFiles('**/*.gradle*') }}
```

**Layer 2 - Build Outputs:**
```yaml
- name: Cache Gradle build cache
  uses: actions/cache@v4
  with:
    path: |
      android/.gradle
      android/app/build
      android/build
    key: gradle-build-${{ github.sha }}
    restore-keys: |
      gradle-build-
```

**Layer 3 - Node Modules:**
```yaml
- name: Cache node_modules
  uses: actions/cache@v4
  with:
    path: node_modules
    key: node-modules-${{ hashFiles('**/pnpm-lock.yaml') }}
```

### 4. **Parallel Execution**

```properties
org.gradle.parallel=true
org.gradle.jvmargs=-Xmx4g
```

**Impact:** 20-30% faster on multi-core CI machines.

## 🍎 iOS Caching Strategy

### 1. **ccache** (C++ Compilation Caching) - HUGE!

**What it does:**
Caches compiled C++ object files from React Native's native modules.

**Why it matters:**
React Native's C++ layer (Hermes, JSI, Turbo Modules) is recompiled from scratch every time. ccache fixes this!

**Implementation:**
```yaml
- name: Install ccache
  run: |
    brew install ccache
    ccache --max-size=2G
    ccache --set-config=compression=true

- name: Cache ccache
  uses: actions/cache@v4
  with:
    path: ~/Library/Caches/ccache
    key: ccache-${{ hashFiles('ios/Podfile.lock') }}
```

**Usage in build:**
```yaml
xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  CC="ccache clang" \
  CXX="ccache clang++" \
  CCACHE_DIR="$HOME/Library/Caches/ccache"
```

**Impact:** **40-50% faster builds!** (Confirmed by react-native-firebase team)

### 2. **Xcode DerivedData Cache**

**What it does:**
Caches Xcode's intermediate build artifacts.

```yaml
- name: Cache Xcode DerivedData
  uses: actions/cache@v4
  with:
    path: ~/Library/Developer/Xcode/DerivedData
    key: deriveddata-${{ hashFiles('ios/Podfile.lock') }}
```

**Impact:** 30-40% faster when code hasn't changed.

**⚠️ Caution:** DerivedData can grow large (>5GB). GitHub Actions has 10GB cache limit.

**Solution:**
```bash
# Clean intermediates before caching
find ~/Library/Developer/Xcode/DerivedData \
  -name "Build" -type d \
  -exec rm -rf {}/Intermediates.noindex \;
```

### 3. **CocoaPods Cache**

```yaml
- name: Cache CocoaPods
  uses: actions/cache@v4
  with:
    path: |
      ios/Pods
      ~/Library/Caches/CocoaPods
      ~/.cocoapods
    key: pods-${{ hashFiles('ios/Podfile.lock') }}
```

**Impact:** Skips `pod install` if Podfile.lock hasn't changed (~2-5 minutes saved).

### 4. **Swift Package Manager Cache**

```yaml
- name: Cache Swift Package Manager
  uses: actions/cache@v4
  with:
    path: |
      ios/SourcePackages
      ~/Library/Developer/Xcode/DerivedData/*/SourcePackages
    key: spm-${{ hashFiles('ios/**/*.xcodeproj/project.xcworkspace/xcshareddata/swiftpm/Package.resolved') }}
```

**Impact:** Skips SPM dependency resolution (~1-3 minutes saved).

## 📊 Combined Strategy Impact

### Android Build Timeline

**Without Advanced Caching:**
```
1. Setup (1 min)
2. Install dependencies (2 min)
3. Gradle configuration (1 min)
4. Compile Java/Kotlin (5 min)
5. Compile resources (2 min)
6. Package APK (2 min)
────────────────────────────
Total: ~13 minutes
```

**With Advanced Caching:**
```
1. Setup (1 min)
2. Restore caches (30s)
3. Install dependencies (30s)  ← cached node_modules
4. Gradle configuration (15s)  ← configuration cache
5. Compile Java/Kotlin (2 min) ← build cache reuse
6. Compile resources (1 min)   ← cached resources
7. Package APK (1 min)
────────────────────────────
Total: ~6 minutes (54% faster!)
```

### iOS Build Timeline

**Without Advanced Caching:**
```
1. Setup (1 min)
2. Install dependencies (2 min)
3. CocoaPods install (5 min)
4. Compile Swift (3 min)
5. Compile C++ (React Native) (7 min) ← SLOWEST
6. Link (2 min)
7. Archive (1 min)
────────────────────────────
Total: ~21 minutes
```

**With Advanced Caching:**
```
1. Setup (1 min)
2. Restore caches (1 min)
3. Install dependencies (30s)     ← cached node_modules
4. CocoaPods (skipped)            ← cached Pods
5. Compile Swift (1 min)          ← DerivedData cache
6. Compile C++ (2 min)            ← ccache! (was 7 min)
7. Link (1 min)                   ← cached build products
8. Archive (1 min)
────────────────────────────
Total: ~8 minutes (62% faster!)
```

## 🔑 Cache Keys Strategy

### Deterministic Keys (Exact Match)

```yaml
key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*') }}
```

**When to use:** Dependencies, lock files.

**Invalidation:** Only when files change.

### Fallback Keys (Partial Match)

```yaml
key: gradle-build-${{ github.sha }}
restore-keys: |
  gradle-build-
```

**When to use:** Build outputs that change frequently.

**Invalidation:** Try exact match first, fall back to most recent.

### Version-Specific Keys

```yaml
key: ${{ runner.os }}-pods-v3-${{ hashFiles('ios/Podfile.lock') }}
```

**When to use:** When cache format changes (e.g., new Xcode version).

**Benefit:** Invalidate all caches at once by bumping version (`v3` → `v4`).

## ⚠️ Common Pitfalls

### 1. **Cache Size Exceeded (10GB limit)**

**Problem:**
```
Error: Cache size of ~10240 MB (10 GB) is over the 10GB limit
```

**Solution:**
- Clean DerivedData intermediates before caching
- Use more specific cache keys (separate by branch/scheme)
- Set up cache cleanup with `actions/cache/save`

```yaml
- name: Clean cache before saving
  run: |
    # Remove large intermediate files
    rm -rf ~/Library/Developer/Xcode/DerivedData/*/Build/Intermediates.noindex
```

### 2. **Stale Cache (Wrong Files Cached)**

**Problem:**
Build fails with "module not found" after dependency update.

**Solution:**
Improve cache key specificity:

```yaml
# ❌ BAD - too broad
key: ${{ runner.os }}-pods

# ✅ GOOD - includes Podfile.lock hash
key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}
```

### 3. **First Build Slower**

**Expected Behavior:**
First build with ccache is ~15% slower due to cache population overhead.

**Solution:**
This is normal! Subsequent builds will be 40-50% faster.

### 4. **CI Timestamp Issues (ccache)**

**Problem:**
Files are re-downloaded at every CI run, changing timestamps.

**Solution:**
Use content-based hashing:

```bash
ccache --set-config=sloppiness=file_macro,time_macros,include_file_mtime
```

This tells ccache to hash file content instead of relying on timestamps.

## 📈 Monitoring Cache Performance

### GitHub Actions Cache Analytics

1. Go to **Actions** → **Caches** tab
2. Check:
   - Cache hit rate (should be >80%)
   - Total cache size (should be <10GB)
   - Restore time (should be <2 min)

### ccache Statistics

```yaml
- name: Show ccache stats
  run: |
    ccache -s
```

**Example output:**
```
Summary:
  Hits: 1245 / 1500 (83%)   ← Good!
  Misses: 255 / 1500 (17%)
  Cache size: 1.2 GB / 2.0 GB (60%)
```

**Target:** >80% hit rate after first build.

## 💰 Cost Savings

### GitHub Actions Minutes

**Without caching:**
- Android: 13 min/build
- iOS: 21 min/build
- Total per PR (2 platforms): 34 minutes
- 30 PRs/month: **1,020 minutes/month**

**With advanced caching:**
- Android: 6 min/build
- iOS: 8 min/build
- Total per PR: 14 minutes
- 30 PRs/month: **420 minutes/month**

**Savings: 600 minutes/month (58% reduction!)**

For **GitHub Team plan** ($4/seat):
- Included: 3,000 minutes/month
- Without caching: Uses 1,020 minutes (34% of quota)
- With caching: Uses 420 minutes (14% of quota)
- **Extra headroom: 600 minutes for more PRs!**

## 🚀 Advanced: React Native Enterprise Framework (RNEF)

For **even faster** builds (40 min → 2 min!), consider:

- [React Native Enterprise Framework (RNEF)](https://rnef.io/)
- Pre-compiled React Native binaries
- Shared remote cache

**Cost:** Starts at $99/month

**Best for:** Large teams (>10 developers) with >100 builds/month.

## 📚 Further Reading

- [Gradle Build Cache Documentation](https://docs.gradle.org/current/userguide/build_cache.html)
- [React Native Build Speed Guide](https://reactnative.dev/docs/build-speed)
- [ccache Manual](https://ccache.dev/manual/latest.html)
- [GitHub Actions Caching Guide](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Supercharge GitHub Actions with Smart Caching](https://nowham.dev/posts/github_actions_caching_strategies/)

## 🎯 Quick Start Checklist

**Android:**
- ✅ Enable Gradle build cache (`org.gradle.caching=true`)
- ✅ Enable configuration cache (`org.gradle.configuration-cache=true`)
- ✅ Cache Gradle dependencies (`~/.gradle/caches`)
- ✅ Cache build outputs (`android/app/build`)
- ✅ Cache node_modules

**iOS:**
- ✅ Install and configure ccache
- ✅ Cache ccache directory (`~/Library/Caches/ccache`)
- ✅ Cache DerivedData
- ✅ Cache CocoaPods (`ios/Pods`)
- ✅ Cache Swift Package Manager
- ✅ Cache node_modules

**Expected Result:**
- ✅ First build: Same or +15% slower (cold cache)
- ✅ Second+ builds: **60-70% faster!**
- ✅ Developer happiness: 📈
- ✅ CI costs: 📉

---

**Need help?** Check workflow logs for cache hit/miss rates and ccache statistics! 🚀
