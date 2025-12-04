# TanStack Query Guide

Complete guide to using TanStack Query v5 in this React Native scaffolding.

## 📚 Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Query Patterns](#query-patterns)
  - [Basic Query](#basic-query)
  - [Query with Parameters](#query-with-parameters)
  - [Conditional Query](#conditional-query)
  - [Infinite Query](#infinite-query)
  - [Polling Query](#polling-query)
- [Mutation Patterns](#mutation-patterns)
  - [Basic Mutation](#basic-mutation)
  - [Mutation with Invalidation](#mutation-with-invalidation)
  - [Optimistic Updates](#optimistic-updates)
- [Live Demo](#live-demo)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

**TanStack Query (formerly React Query)** is the data-fetching and state management solution for this scaffolding.

### Why TanStack Query?

✅ **Server State Management** - Automatic caching, background updates, and stale data management  
✅ **Developer Experience** - Simple hooks API with powerful features  
✅ **Performance** - Request deduplication, pagination, and prefetching  
✅ **TypeScript** - Full type safety out of the box  
✅ **DevTools** - Built-in dev tools for debugging  

### Key Features Used

- ✅ Queries with automatic caching
- ✅ Mutations with cache invalidation
- ✅ Infinite scroll pagination
- ✅ Background polling/refetching
- ✅ Optimistic updates
- ✅ Error handling and retry logic
- ✅ React Native DevTools integration

---

## Setup

### 1. QueryClient Configuration

Already configured in `src/app/_layout.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

### 2. DevTools (Development Only)

React Native DevTools plugin already integrated:

```tsx
import { useReactQueryDevTools } from '@dev-plugins/react-query';

// Automatically enabled in development
useReactQueryDevTools(queryClient);
```

**Access DevTools:**
- Shake device → Open Dev Menu → "React Query DevTools"
- View queries, mutations, cache state in real-time

---

## Query Patterns

### Basic Query

**Use Case:** Fetch data once, cache it, refetch when stale

```tsx
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/services/api-client';

// API function
const fetchUser = async (id: string) => {
  const { data } = await apiClient.get(`/users/${id}`);
  return data;
};

// Hook
export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  });
}

// Component
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUser(userId);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return <Text>{data.name}</Text>;
}
```

**Key Points:**
- `queryKey` - Unique identifier for caching
- `queryFn` - Function that returns a Promise
- Automatic caching and refetching

---

### Query with Parameters

**Use Case:** Search, filtering, parameterized fetching

```tsx
import { useQuery } from '@tanstack/react-query';

// API function with parameters
const searchCountries = async (searchTerm: string) => {
  const { data } = await apiClient.get(
    `https://restcountries.com/v3.1/name/${searchTerm}`
  );
  return data;
};

// Hook with parameter in queryKey
export function useCountries(searchTerm: string, enabled: boolean) {
  return useQuery({
    queryKey: ['countries', searchTerm], // ⚠️ Include params in key!
    queryFn: () => searchCountries(searchTerm),
    enabled, // Only run when enabled is true
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

// Component with debounced search
function CountrySearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useCountries(
    debouncedSearch,
    debouncedSearch.length > 2 // Only search if 3+ characters
  );

  return (
    <View>
      <Input
        value={search}
        onChangeText={setSearch}
        placeholder="Search countries..."
      />
      {isLoading && <Text>Searching...</Text>}
      {data?.map((country) => (
        <Text key={country.cca2}>{country.name.common}</Text>
      ))}
    </View>
  );
}
```

**Key Points:**
- Include all parameters in `queryKey` array
- Use `enabled` to conditionally run queries
- Combine with debouncing for search

---

### Conditional Query

**Use Case:** Only fetch when certain conditions are met

```tsx
export function useUserProfile(userId: string | null) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId, // Only fetch if userId exists
  });
}

// Won't fetch until userId is available
const { data } = useUserProfile(null); // No request
const { data } = useUserProfile('123'); // Fetches
```

---

### Infinite Query

**Use Case:** Pagination, infinite scroll, "Load More" buttons

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

// API function with pagination
const fetchPosts = async (page: number) => {
  const { data } = await apiClient.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  );
  return {
    posts: data,
    nextPage: page + 1,
    hasMore: data.length === 10,
  };
};

// Infinite query hook
export function usePosts() {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });
}

// Component with "Load More"
function PostsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePosts();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      {data?.pages.map((page, pageIndex) => (
        <View key={pageIndex}>
          {page.posts.map((post) => (
            <Card key={post.id}>
              <Text>{post.title}</Text>
            </Card>
          ))}
        </View>
      ))}

      {hasNextPage && (
        <Button
          loading={isFetchingNextPage}
          onPress={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </ScrollView>
  );
}
```

**Key Points:**
- Use `useInfiniteQuery` instead of `useQuery`
- `pageParam` tracks current page
- `getNextPageParam` determines if more pages exist
- Data structure: `data.pages[]` array

---

### Polling Query

**Use Case:** Real-time data, live updates, auto-refresh

```tsx
import { useQuery } from '@tanstack/react-query';

const fetchRandomDog = async () => {
  const { data } = await apiClient.get('https://dog.ceo/api/breeds/image/random');
  return data;
};

export function useRandomDog() {
  return useQuery({
    queryKey: ['random-dog'],
    queryFn: fetchRandomDog,
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchIntervalInBackground: false, // Stop when app is backgrounded
  });
}

function RandomDog() {
  const { data, refetch } = useRandomDog();

  return (
    <View>
      <Image source={{ uri: data?.message }} />
      <Button onPress={() => refetch()}>Get New Dog</Button>
    </View>
  );
}
```

**Key Points:**
- `refetchInterval` enables polling
- Manual refetch with `refetch()`
- Stop polling with `enabled: false`

---

## Mutation Patterns

### Basic Mutation

**Use Case:** Create, update, delete operations

```tsx
import { useMutation } from '@tanstack/react-query';

type CreatePostDto = {
  title: string;
  body: string;
};

const createPost = async (post: CreatePostDto) => {
  const { data } = await apiClient.post('/posts', post);
  return data;
};

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}

function CreatePostForm() {
  const mutation = useCreatePost();

  const handleSubmit = async (data: CreatePostDto) => {
    try {
      await mutation.mutateAsync(data);
      alert('Post created!');
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <View>
      {/* Form fields */}
      <Button
        loading={mutation.isPending}
        onPress={() => handleSubmit({ title: '...', body: '...' })}>
        Create Post
      </Button>

      {mutation.isSuccess && <Text>✅ Success!</Text>}
      {mutation.isError && <Text>❌ Error: {mutation.error.message}</Text>}
    </View>
  );
}
```

---

### Mutation with Invalidation

**Use Case:** Refetch related queries after mutation

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// After creating a post, the posts list automatically refetches!
```

**Advanced Invalidation:**

```tsx
onSuccess: (newPost) => {
  // Invalidate all posts queries
  queryClient.invalidateQueries({ queryKey: ['posts'] });

  // Invalidate specific post
  queryClient.invalidateQueries({ queryKey: ['post', newPost.id] });

  // Invalidate queries that start with 'posts'
  queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
}
```

---

### Optimistic Updates

**Use Case:** Instant UI updates before server confirmation

```tsx
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    // 1. Optimistically update cache before mutation
    onMutate: async (updatedPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update to new value
      queryClient.setQueryData(['posts'], (old: any) => {
        return old.map((post: any) =>
          post.id === updatedPost.id ? updatedPost : post
        );
      });

      // Return context with snapshot
      return { previousPosts };
    },
    // 2. If mutation fails, rollback
    onError: (err, updatedPost, context) => {
      queryClient.setQueryData(['posts'], context?.previousPosts);
    },
    // 3. Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

**Key Points:**
- `onMutate` - Run before mutation, update cache optimistically
- `onError` - Rollback on error
- `onSettled` - Always runs, good for refetching

---

## Live Demo

### 🎯 Interactive Demo Page

This scaffolding includes a **live demo** of all TanStack Query patterns:

**Access Demo:**
```bash
pnpm start
# Navigate to /tanstack-demo in the app
```

**What's Demonstrated:**

1. **Infinite Query** - Posts with "Load More" pagination
2. **Search Query** - Countries with debounced search (5min cache)
3. **Polling Query** - Random dog images (auto-refresh every 10s)
4. **Mutation** - Create post with React Hook Form + Zod validation

**Demo Features:**
- ✅ Real API calls (no mocks)
- ✅ Loading states for all operations
- ✅ Error handling examples
- ✅ Pull-to-refresh support
- ✅ Form validation with React Hook Form
- ✅ Cache invalidation on mutations

**Source Code:**
- Demo Page: `src/app/tanstack-demo.tsx`
- Hooks: `src/hooks/use*.ts`

---

## Best Practices

### 1. Query Keys Structure

```tsx
// ✅ Good - Hierarchical, specific
queryKey: ['posts']                    // All posts
queryKey: ['posts', postId]            // Specific post
queryKey: ['posts', 'published']       // Published posts
queryKey: ['posts', { status: 'draft' }] // Draft posts

// ❌ Bad - Not specific enough
queryKey: ['data']
queryKey: ['fetch']
```

### 2. Extract Query Logic to Hooks

```tsx
// ✅ Good - Reusable hook
export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

// Component just uses the hook
const { data } = usePosts();

// ❌ Bad - Logic in component
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch('/api/posts').then(r => r.json()),
});
```

### 3. Handle Loading and Error States

```tsx
// ✅ Good - Proper state handling
function MyComponent() {
  const { data, isLoading, error } = usePosts();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <PostsList posts={data} />;
}

// ❌ Bad - Missing states
function MyComponent() {
  const { data } = usePosts();
  return <PostsList posts={data} />; // Crashes if data is undefined
}
```

### 4. Use Proper TypeScript Types

```tsx
// ✅ Good - Typed responses
type Post = {
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>('/posts');
  return data;
};

export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

// `data` is typed as Post[] | undefined
const { data } = usePosts();
```

### 5. Invalidate Queries After Mutations

```tsx
// ✅ Good - Auto-refetch after create
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// ❌ Bad - Manual refetch required
export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
```

### 6. Configure Stale Time Appropriately

```tsx
// Static data - long stale time
useQuery({
  queryKey: ['countries'],
  queryFn: fetchCountries,
  staleTime: 30 * 60 * 1000, // 30 minutes
});

// Real-time data - short stale time
useQuery({
  queryKey: ['notifications'],
  queryFn: fetchNotifications,
  staleTime: 10 * 1000, // 10 seconds
});

// User data - moderate stale time
useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: 5 * 60 * 1000, // 5 minutes (default)
});
```

---

## Troubleshooting

### Issue: Query Not Refetching

**Problem:** Data doesn't update after mutation

**Solution:** Use `invalidateQueries` after mutation:

```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['posts'] });
}
```

---

### Issue: Too Many Requests

**Problem:** Same query called multiple times

**Solution 1:** Increase `staleTime`:

```tsx
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000, // Cache for 5 minutes
});
```

**Solution 2:** Check if query key is changing unnecessarily:

```tsx
// ❌ Bad - Creates new object reference every render
queryKey: ['posts', { filter: currentFilter }]

// ✅ Good - Stable reference
queryKey: ['posts', currentFilter]
```

---

### Issue: Mutation Not Working

**Problem:** `mutate()` doesn't trigger

**Solution:** Use `mutateAsync()` with try/catch:

```tsx
const mutation = useCreatePost();

// ❌ Bad - Error handling unclear
mutation.mutate(data);

// ✅ Good - Explicit error handling
try {
  await mutation.mutateAsync(data);
  console.log('Success');
} catch (error) {
  console.error('Error:', error);
}
```

---

### Issue: DevTools Not Showing

**Problem:** Can't see queries in DevTools

**Solution 1:** Check plugin is enabled:

```tsx
import { useReactQueryDevTools } from '@dev-plugins/react-query';

useReactQueryDevTools(queryClient);
```

**Solution 2:** Reload dev menu:
- Shake device → "Reload" → Open Dev Menu → "React Query DevTools"

---

### Issue: TypeScript Errors

**Problem:** `data` type is `unknown`

**Solution:** Add type parameters:

```tsx
// ❌ Bad - data is unknown
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});

// ✅ Good - data is Post[]
const { data } = useQuery<Post[], Error>({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
```

---

## Resources

- **Official Docs:** [tanstack.com/query/latest](https://tanstack.com/query/latest)
- **React Native Integration:** [tanstack.com/query/latest/docs/react/react-native](https://tanstack.com/query/latest/docs/react/react-native)
- **DevTools:** [@dev-plugins/react-query](https://www.npmjs.com/package/@dev-plugins/react-query)
- **Live Demo:** `src/app/tanstack-demo.tsx`

---

**Happy querying! 🚀**
