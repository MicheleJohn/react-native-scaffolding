# 🔧 NativeWind Troubleshooting Guide

## 💥 Common Issues & Solutions

### 1. ⚠️ Width/Height Not Working with `className`

**Symptom:**
```tsx
// ❌ This doesn't work
<View 
  style={{ backgroundColor: '#FF0000' }}
  className="w-16 h-16"  // ❌ Ignored!
/>
```

**Cause:**
In React Native + NativeWind, **inline `style` prop ALWAYS overrides `className`** for conflicting properties. When you use both, the sizing from `className` gets ignored.

**Solution 1: Use ONLY className (Recommended)**
```tsx
// ✅ Use Tailwind arbitrary values for colors
<View className="w-16 h-16 bg-[#FF0000] rounded-lg border border-border" />
```

**Tailwind Arbitrary Values Syntax:**
```tsx
// Colors
className="bg-[#009FE3]"        // Hex colors
className="bg-[rgb(0,159,227)]" // RGB colors

// Sizes
className="w-[100px] h-[50px]"  // Specific pixels
className="w-[50%] h-[100%]"    // Percentages

// Any CSS property
className="[shadowRadius:10]"   // Custom properties
```

**Solution 2: Use style for ALL properties (Not Recommended)**
```tsx
// ⚠️ Works but defeats the purpose of Tailwind
<View 
  style={{
    backgroundColor: '#FF0000',
    width: 64,
    height: 64,
    borderRadius: 8,
  }}
/>
```

**Solution 3: Use `!important` modifier (Last Resort)**
```tsx
// ⚠️ Forces className to override style
<View 
  style={{ backgroundColor: '#FF0000' }}
  className="!w-16 !h-16"  // ! = important
/>
```

---

### 2. 🎨 Colors from `global.css` Not Working

**Symptom:**
```tsx
// ❌ Doesn't apply the color
<View className="bg-primary" />
```

**Checklist:**

✅ **1. Check `global.css` has `@theme` block:**
```css
@theme {
  --color-primary: #009FE3;
}
```

✅ **2. Import `global.css` in root layout:**
```tsx
// app/_layout.tsx
import '../global.css';
```

✅ **3. Restart dev server + clear cache:**
```bash
pnpm start --clear
```

✅ **4. Check TypeScript types are generated:**
```bash
# Should exist: nativewind-env.d.ts
ls nativewind-env.d.ts
```

---

### 3. 🔍 `className` Not Working At All

**Symptom:**
```tsx
<Text className="text-red-500">Hello</Text>  // ❌ No styling
```

**Solution 1: Check TypeScript Setup**

Create/update `nativewind-env.d.ts` in project root:
```typescript
/// <reference types="nativewind/types" />
```

Update `tsconfig.json`:
```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "nativewind-env.d.ts"  // ← Add this
  ]
}
```

**Solution 2: Restart TypeScript Server**

In VS Code:
- Press `Cmd/Ctrl + Shift + P`
- Type "TypeScript: Restart TS Server"
- Or restart VS Code entirely

**Solution 3: Clear Metro Cache**
```bash
pnpm start --clear
# or
rm -rf node_modules/.cache
```

---

### 4. 🐛 `gap` Not Working on `View`

**Symptom:**
```tsx
<View className="flex-row gap-4">
  <Text>Item 1</Text>
  <Text>Item 2</Text>  // ❌ No gap between items
</View>
```

**Cause:**
`gap` is a **Flexbox** property. React Native requires **explicit `flex` direction**.

**Solution:**
```tsx
// ✅ Always specify flex direction
<View className="flex flex-row gap-4">  // ← Add `flex`
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>

// Or column
<View className="flex flex-col gap-4">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</View>
```

---

### 5. 📱 `Image` Size Not Working

**Symptom:**
```tsx
<Image 
  source={{ uri: 'https://...' }}
  className="w-20 h-20"  // ❌ Image not showing
/>
```

**Cause:**
React Native `Image` requires **explicit dimensions** via `style` prop, especially for remote images.

**Solution 1: Use `style` for images (Recommended)**
```tsx
// ✅ Images are special - use style
<Image 
  source={{ uri: 'https://...' }}
  style={{ width: 80, height: 80 }}
  className="rounded-lg"
/>
```

**Solution 2: Use NativeWind's `cssInterop` (Advanced)**
```tsx
// In a separate file (e.g., components/StyledImage.tsx)
import { Image } from 'react-native';
import { cssInterop } from 'nativewind';

cssInterop(Image, {
  className: { target: 'style' },
});

export { Image };

// Then use it
import { Image } from '@/components/StyledImage';

<Image 
  source={{ uri: 'https://...' }}
  className="w-20 h-20 rounded-lg"  // ✅ Now works!
/>
```

---

### 6. 🔤 Text Color Not Cascading to Children

**Symptom:**
```tsx
<View className="text-red-500">  // ❌ Doesn't cascade
  <Text>This should be red</Text>  // ❌ Still default color
</View>
```

**Cause:**
React Native **does NOT cascade styles** like CSS. Each component must have its own styles.

**Solution 1: Apply to Text directly**
```tsx
// ✅ Put text styles on Text components
<View>
  <Text className="text-red-500">This is red</Text>
</View>
```

**Solution 2: Create a styled component**
```tsx
import { styled } from 'nativewind';
import { Text } from 'react-native';

// Define once
const RedText = styled(Text, 'text-red-500 font-bold');

// Use everywhere
<RedText>This is red</RedText>
```

---

### 7. ⚡ Conditional Styles Not Updating

**Symptom:**
```tsx
const [active, setActive] = useState(false);

<View className={active ? 'bg-primary' : 'bg-neutral-50'}>  
  // ❌ Doesn't update on state change
</View>
```

**Cause:**
NativeWind may not detect dynamic class changes without proper string templates.

**Solution: Use explicit strings**
```tsx
// ✅ Declare all possible classes explicitly
<View 
  className={`
    ${active ? 'bg-primary' : 'bg-neutral-50'}
    ${active ? 'text-inverse' : 'text-primary'}
  `}
/>

// ✅ Or use cn() helper
import { cn } from '@/utils/cn';

<View 
  className={cn(
    'px-4 py-2 rounded-lg',
    active ? 'bg-primary text-inverse' : 'bg-neutral-50 text-primary'
  )}
/>
```

---

### 8. 📊 Platform-Specific Styles Not Working

**Symptom:**
```tsx
<View className="shadow-lg">  // ❌ No shadow on Android
</View>
```

**Cause:**
`shadow-*` classes work differently on iOS vs Android. Android uses `elevation`.

**Solution: Use platform-specific styles**
```tsx
import { Platform } from 'react-native';

// Option 1: Inline platform check
<View 
  className="rounded-lg bg-white"
  style={{
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
      android: { elevation: 5 },
    }),
  }}
/>

// Option 2: Create a shadow utility
// In utils/shadows.ts
export const shadows = {
  sm: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.18, shadowRadius: 1.0 },
    android: { elevation: 2 },
  }),
  md: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
    android: { elevation: 5 },
  }),
};

// Use it
<View className="rounded-lg bg-white" style={shadows.md} />
```

---

## 📝 Best Practices

### ✅ DO

1. **Use `className` for ALL styling when possible**
   ```tsx
   <View className="w-16 h-16 bg-[#FF0000] rounded-lg" />
   ```

2. **Use arbitrary values for dynamic colors**
   ```tsx
   <View className={`bg-[${dynamicColor}] w-full`} />
   ```

3. **Import global.css in root layout**
   ```tsx
   import '../global.css';
   ```

4. **Clear cache after config changes**
   ```bash
   pnpm start --clear
   ```

5. **Use `cn()` helper for complex conditionals**
   ```tsx
   <View className={cn('base-classes', condition && 'conditional-classes')} />
   ```

### ❌ DON'T

1. **Don't mix `style` and `className` for same properties**
   ```tsx
   // ❌ BAD
   <View style={{ width: 100 }} className="w-16" />
   ```

2. **Don't expect style cascading from parent to child**
   ```tsx
   // ❌ WON'T WORK
   <View className="text-red-500">
     <Text>This won't be red</Text>
   </View>
   ```

3. **Don't forget to restart after TypeScript changes**
   - Always restart TS server + Metro bundler

4. **Don't use web-only Tailwind classes**
   - Check NativeWind docs for compatibility
   - Example: `backdrop-blur` is web-only

---

## 🖊️ Priority Order (Specificity)

From **highest** to **lowest** priority:

1. 🔴 **`!important` modifier in className** (`!w-16`)
2. 🟡 **Inline `style` prop** (`style={{ width: 64 }}`)
3. 🟢 **Regular className** (`className="w-16"`)

**Example:**
```tsx
<View 
  className="!w-32 h-16"              // 1. !w-32 wins (important)
  style={{ width: 64, height: 64 }}   // 2. height: 64 wins (no !important on h-16)
/>
// Result: width = 128px (!w-32), height = 64px (style)
```

---

## 🛠️ Debug Checklist

When styles don't work:

- [ ] Cleared Metro cache (`pnpm start --clear`)
- [ ] Restarted TypeScript server (VS Code: `Cmd/Ctrl + Shift + P` → "Restart TS Server")
- [ ] Checked `global.css` is imported in root layout
- [ ] Verified `nativewind-env.d.ts` exists and is in `tsconfig.json`
- [ ] No mixing of `style` and `className` for same property
- [ ] Used arbitrary values for dynamic colors (`bg-[${color}]`)
- [ ] Added `flex` for `gap` to work (`flex flex-row gap-4`)
- [ ] Checked NativeWind docs for component compatibility
- [ ] Tried on both iOS and Android (platform differences)

---

## 📚 Resources

- [NativeWind v5 Docs](https://www.nativewind.dev/v5)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Style Specificity](https://www.nativewind.dev/docs/core-concepts/style-specificity)
- [Arbitrary Values](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)
- [Platform Differences](https://www.nativewind.dev/docs/core-concepts/platform-differences)

---

**Pro Tip:** When in doubt, use **ONLY `className`** and leverage **arbitrary values** (`bg-[#HEX]`, `w-[100px]`) for dynamic styling. This avoids 90% of style conflicts! ✨
