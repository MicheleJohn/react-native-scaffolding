# Form Management with React Hook Form & Zod

Complete guide to building type-safe, validated forms in React Native.

## 📚 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Basic Form](#basic-form)
- [Form Validation](#form-validation)
- [Integration with UI Components](#integration-with-ui-components)
- [Advanced Patterns](#advanced-patterns)
- [TanStack Query Integration](#tanstack-query-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Why React Hook Form + Zod?

**React Hook Form** provides:
- ✅ Minimal re-renders (better performance)
- ✅ Uncontrolled components by default
- ✅ Built-in validation
- ✅ Small bundle size (~9KB)

**Zod** provides:
- ✅ TypeScript-first schema validation
- ✅ Type inference from schemas
- ✅ Runtime type checking
- ✅ Reusable schemas

**Together** they provide:
- ✅ Type-safe forms with zero duplication
- ✅ Single source of truth for validation rules
- ✅ Automatic TypeScript types
- ✅ Great DX with autocomplete

---

## Setup

Already installed in this scaffolding:

```json
{
  "dependencies": {
    "react-hook-form": "^7.66.1",
    "@hookform/resolvers": "^5.2.2",
    "zod": "^4.1.13"
  }
}
```

---

## Basic Form

### 1. Define Zod Schema

Create validation schema:

```tsx
import { z } from 'zod';

// Define validation rules
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

// Infer TypeScript type from schema
type LoginFormData = z.infer<typeof loginSchema>;
// Result: { email: string; password: string; }
```

### 2. Create Form Component

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Input } from '@/components/ui';

type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
};

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <View className="gap-4">
      {/* Email Field */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Email"
            placeholder="your@email.com"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      {/* Password Field */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Enter password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
            secureTextEntry
          />
        )}
      />

      {/* Submit Button */}
      <Button
        variant="filled"
        fullWidth
        loading={isSubmitting}
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </View>
  );
}
```

### 3. Use Form in Page

```tsx
import { useRouter } from 'expo-router';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await loginUser(data);
      router.push('/home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

---

## Form Validation

### Common Zod Validators

```tsx
import { z } from 'zod';

const schema = z.object({
  // Required string
  name: z.string().min(1, 'Name is required'),

  // Email
  email: z.string().email('Invalid email'),

  // Min/Max length
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),

  // Number
  age: z
    .number({ required_error: 'Age is required' })
    .min(18, 'Must be 18 or older')
    .max(120, 'Invalid age'),

  // Boolean
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept terms'),

  // URL
  website: z.string().url('Invalid URL'),

  // Phone (regex)
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),

  // Optional field
  bio: z.string().optional(),

  // Optional with default
  country: z.string().default('US'),

  // Enum
  role: z.enum(['user', 'admin', 'moderator']),

  // Array
  tags: z.array(z.string()).min(1, 'At least one tag required'),

  // Date
  birthdate: z.string().datetime('Invalid date format'),
});
```

### Custom Validation

```tsx
const passwordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Error appears on confirmPassword field
  });
```

### Conditional Validation

```tsx
const schema = z.object({
  hasAddress: z.boolean(),
  address: z.string().optional(),
}).refine(
  (data) => {
    // If hasAddress is true, address is required
    if (data.hasAddress) {
      return !!data.address && data.address.length > 0;
    }
    return true;
  },
  {
    message: 'Address is required',
    path: ['address'],
  }
);
```

---

## Integration with UI Components

### Input Component Integration

Our `Input` component is designed for React Hook Form:

```tsx
<Controller
  control={control}
  name="email"
  render={({ field: { onChange, onBlur, value } }) => (
    <Input
      label="Email"
      value={value}
      onChangeText={onChange}  // Maps to field.onChange
      onBlur={onBlur}          // Maps to field.onBlur
      error={errors.email?.message}  // Shows validation error
    />
  )}
/>
```

### Why Controller?

React Native components need controlled inputs, so we use `Controller`:

```tsx
// ✅ Good - Controlled with Controller
<Controller
  control={control}
  name="email"
  render={({ field }) => (
    <Input value={field.value} onChangeText={field.onChange} />
  )}
/>

// ❌ Bad - Won't work in React Native
<input {...register('email')} />  // Web only!
```

### Multiline Input

```tsx
<Controller
  control={control}
  name="description"
  render={({ field: { onChange, onBlur, value } }) => (
    <Input
      label="Description"
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      error={errors.description?.message}
      multiline
      numberOfLines={4}
    />
  )}
/>
```

### Checkbox/Switch Integration

```tsx
import { Controller } from 'react-hook-form';
import { Switch, Text, View } from 'react-native';

<Controller
  control={control}
  name="acceptTerms"
  render={({ field: { onChange, value } }) => (
    <View className="flex-row items-center">
      <Switch value={value} onValueChange={onChange} />
      <Text>I accept the terms</Text>
    </View>
  )}
/>
```

---

## Advanced Patterns

### Form with Default Values

```tsx
type ProfileFormProps = {
  user?: User;
  onSubmit: (data: ProfileFormData) => Promise<void>;
};

export function ProfileForm({ user, onSubmit }: ProfileFormProps) {
  const { control, handleSubmit } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      bio: user?.bio ?? '',
    },
  });

  // Form is pre-filled with user data
}
```

### Reset Form After Submit

```tsx
const { control, handleSubmit, reset } = useForm<FormData>({
  resolver: zodResolver(schema),
});

const onSubmit = async (data: FormData) => {
  await createPost(data);
  reset(); // Clear form after success
};
```

### Watch Field Values

```tsx
const { control, watch } = useForm<FormData>({
  resolver: zodResolver(schema),
});

// Watch a single field
const hasAddress = watch('hasAddress');

// Conditionally render fields
{hasAddress && (
  <Controller
    control={control}
    name="address"
    render={({ field }) => <Input {...field} label="Address" />}
  />
)}
```

### Field Arrays (Dynamic Forms)

```tsx
import { useFieldArray } from 'react-hook-form';

const schema = z.object({
  tags: z.array(
    z.object({
      name: z.string().min(1, 'Tag name required'),
    })
  ),
});

function TagsForm() {
  const { control } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tags: [{ name: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <View>
      {fields.map((field, index) => (
        <View key={field.id} className="flex-row gap-2">
          <Controller
            control={control}
            name={`tags.${index}.name`}
            render={({ field }) => (
              <Input {...field} placeholder="Tag name" />
            )}
          />
          <Button onPress={() => remove(index)}>Remove</Button>
        </View>
      ))}
      <Button onPress={() => append({ name: '' })}>Add Tag</Button>
    </View>
  );
}
```

### Form State Management

```tsx
const {
  control,
  formState: {
    errors,       // Validation errors
    isDirty,      // Form has been modified
    isValid,      // Form is valid
    isSubmitting, // Submit in progress
    isSubmitted,  // Submit was attempted
  },
} = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: 'onChange', // Validate on change (default: onSubmit)
});

// Disable submit if form is invalid or submitting
<Button
  disabled={!isValid || isSubmitting}
  loading={isSubmitting}
  onPress={handleSubmit(onSubmit)}>
  Submit
</Button>
```

---

## TanStack Query Integration

### Create + Mutation Example

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { useCreatePost } from '@/hooks/useCreatePost';

// 1. Define schema
const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

// 2. Form component
function CreatePostForm() {
  const createPost = useCreatePost();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = (data: CreatePostFormData) => {
    createPost.mutate(data, {
      onSuccess: () => {
        reset(); // Clear form on success
        alert('Post created!');
      },
    });
  };

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Title"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Body"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.body?.message}
            multiline
            numberOfLines={4}
          />
        )}
      />

      <Button
        variant="filled"
        fullWidth
        loading={createPost.isPending}
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}>
        {createPost.isPending ? 'Creating...' : 'Create Post'}
      </Button>

      {createPost.isSuccess && (
        <Text className="text-success">✅ Post created!</Text>
      )}
      {createPost.isError && (
        <Text className="text-error">
          ❌ Error: {createPost.error.message}
        </Text>
      )}
    </View>
  );
}
```

### Update + Mutation Example

```tsx
function EditPostForm({ postId }: { postId: string }) {
  const { data: post } = usePost(postId);
  const updatePost = useUpdatePost();

  const { control, handleSubmit } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title ?? '',
      body: post?.body ?? '',
    },
  });

  const onSubmit = (data: PostFormData) => {
    updatePost.mutate(
      { id: postId, data },
      {
        onSuccess: () => {
          alert('Post updated!');
        },
      }
    );
  };

  // Form pre-filled with post data
}
```

**See Live Example:**
- Demo: `src/app/tanstack-demo.tsx` (Example 4)
- Source: `src/hooks/useCreatePost.ts`

---

## Best Practices

### 1. One Schema per Form

```tsx
// ✅ Good - Dedicated schema for each form
const loginSchema = z.object({ /* ... */ });
const registerSchema = z.object({ /* ... */ });
const profileSchema = z.object({ /* ... */ });

// ❌ Bad - Reusing schemas with different validation
const userSchema = z.object({ /* ... */ });
```

### 2. Extract Schemas to Separate Files

```tsx
// src/features/auth/schemas/login-schema.ts
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// src/features/auth/components/LoginForm.tsx
import { loginSchema, type LoginFormData } from '../schemas/login-schema';
```

### 3. Use Validation Mode Wisely

```tsx
// onChange - Best UX, immediate feedback
const form = useForm({
  mode: 'onChange',
});

// onBlur - Less aggressive, validate when leaving field
const form = useForm({
  mode: 'onBlur',
});

// onSubmit - Only validate when submitting (default)
const form = useForm({
  mode: 'onSubmit',
});
```

### 4. Handle Async Validation

```tsx
const usernameSchema = z.string().refine(
  async (username) => {
    // Check if username is available
    const available = await checkUsernameAvailable(username);
    return available;
  },
  {
    message: 'Username is already taken',
  }
);
```

### 5. Reuse Schemas

```tsx
// Base schema
const userBaseSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// Extend for registration
const registerSchema = userBaseSchema.extend({
  password: z.string().min(8),
  confirmPassword: z.string(),
});

// Pick fields for profile update
const profileUpdateSchema = userBaseSchema.pick({
  name: true,
});
```

---

## Troubleshooting

### Issue: Validation Not Triggering

**Problem:** Form submits without validation

**Solution:** Ensure `resolver` is set:

```tsx
const form = useForm<FormData>({
  resolver: zodResolver(schema), // Don't forget this!
});
```

---

### Issue: Field Not Updating

**Problem:** Input value doesn't change when typing

**Solution:** Make sure `Controller` is used correctly:

```tsx
// ✅ Good
<Controller
  control={control}
  name="email"
  render={({ field: { onChange, value } }) => (
    <Input value={value} onChangeText={onChange} />
  )}
/>

// ❌ Bad - Missing value prop
<Controller
  control={control}
  name="email"
  render={({ field: { onChange } }) => (
    <Input onChangeText={onChange} />  // Missing value!
  )}
/>
```

---

### Issue: TypeScript Errors

**Problem:** Type mismatch between schema and form

**Solution:** Always infer types from schema:

```tsx
const schema = z.object({ email: z.string() });

// ✅ Good - Type inferred from schema
type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
});

// ❌ Bad - Manual type definition (can drift from schema)
type FormData = { email: string };
```

---

### Issue: Error Messages Not Showing

**Problem:** Validation fails but no error message appears

**Solution:** Check error path:

```tsx
// Check field name matches schema
<Controller
  name="email"  // Must match schema key
  // ...
/>

// Show error message
<Input
  error={errors.email?.message}  // Must match field name
/>
```

---

## Resources

- **React Hook Form Docs:** [react-hook-form.com](https://react-hook-form.com/)
- **Zod Docs:** [zod.dev](https://zod.dev/)
- **@hookform/resolvers:** [npm](https://www.npmjs.com/package/@hookform/resolvers)
- **Live Demo:** `src/app/tanstack-demo.tsx` (Example 4)

---

**Happy form building! 🚀**
