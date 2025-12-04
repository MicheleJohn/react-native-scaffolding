import React, { useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';

import { Link } from 'expo-router';

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Input } from '@/components/ui';

/**
 * Type definitions for API responses
 */
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Country = {
  name: {
    common: string;
    official: string;
  };
  capital?: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  cca2: string;
};

type DogImage = {
  message: string;
  status: string;
};

/**
 * API Functions
 */
const fetchPosts = async (
  page: number
): Promise<{ posts: Post[]; nextPage: number | undefined }> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
  );
  if (!response.ok) throw new Error('Failed to fetch posts');
  const posts = await response.json();
  return {
    posts,
    nextPage: posts.length === 5 ? page + 1 : undefined,
  };
};

const searchCountries = async (name: string): Promise<Country[]> => {
  if (!name) return [];
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
  );
  if (!response.ok) {
    if (response.status === 404) return [];
    throw new Error('Failed to search countries');
  }
  return response.json();
};

const fetchRandomDog = async (): Promise<DogImage> => {
  const response = await fetch('https://dog.ceo/api/breeds/image/random');
  if (!response.ok) throw new Error('Failed to fetch dog image');
  return response.json();
};

const createPost = async (post: {
  title: string;
  body: string;
}): Promise<Post> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...post, userId: 1 }),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

/**
 * TanStack Query Demo Page
 * Comprehensive showcase of query features
 */
export default function TanStackDemoPage() {
  const queryClient = useQueryClient();
  const [countrySearch, setCountrySearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  // Debounce country search
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(countrySearch), 500);
    return () => clearTimeout(timer);
  }, [countrySearch]);

  /**
   * Example 1: Infinite Query - Posts with Pagination
   */
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: postsLoading,
    isError: postsError,
    refetch: refetchPosts,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  /**
   * Example 2: Query with Search - Countries
   */
  const {
    data: countries,
    isLoading: countriesLoading,
    isError: countriesError,
  } = useQuery({
    queryKey: ['countries', debouncedSearch],
    queryFn: () => searchCountries(debouncedSearch),
    enabled: debouncedSearch.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  /**
   * Example 3: Polling Query - Random Dog Images
   */
  const {
    data: dogImage,
    isLoading: dogLoading,
    isError: dogError,
    refetch: refetchDog,
  } = useQuery({
    queryKey: ['randomDog'],
    queryFn: fetchRandomDog,
    refetchInterval: 10000, // Poll every 10 seconds
  });

  /**
   * Example 4: Mutation - Create Post
   */
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Invalidate and refetch posts
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
      setNewPostTitle('');
      setNewPostBody('');
    },
  });

  const handleCreatePost = () => {
    if (newPostTitle && newPostBody) {
      createPostMutation.mutate({
        title: newPostTitle,
        body: newPostBody,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              void refetchPosts();
              void refetchDog();
            }}
          />
        }>
        <View className="p-4">
          {/* Header */}
          <View className="mb-6">
            <Link href="/" asChild>
              <Button variant="text" size="sm" className="self-start -ml-2">
                ← Back
              </Button>
            </Link>
            <Text className="text-3xl font-bold text-text mb-2">
              🚀 TanStack Query Demo
            </Text>
            <Text className="text-base text-text-secondary">
              Real-world examples with loading, error, and success states
            </Text>
          </View>

          {/* Example 1: Infinite Query - Posts */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-bold text-text mb-3">
              1️⃣ Infinite Query - Posts
            </Text>
            <Text className="text-sm text-text-secondary mb-4">
              JSONPlaceholder API with pagination and infinite scroll
            </Text>

            {postsLoading && (
              <Text className="text-center text-text-secondary py-4">
                Loading posts...
              </Text>
            )}

            {postsError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <Text className="text-red-800 text-sm">
                  ❌ Error loading posts
                </Text>
              </View>
            )}

            {postsData?.pages.map((page, pageIndex) => (
              <View key={pageIndex} className="gap-3">
                {page.posts.map((post) => (
                  <Card key={post.id} variant="outlined" size="sm">
                    <Text className="text-base font-semibold text-text mb-1">
                      {post.title}
                    </Text>
                    <Text
                      className="text-sm text-text-secondary"
                      numberOfLines={2}>
                      {post.body}
                    </Text>
                  </Card>
                ))}
              </View>
            ))}

            {hasNextPage && (
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="mt-4"
                loading={isFetchingNextPage}
                onPress={() => void fetchNextPage()}>
                {isFetchingNextPage ? 'Loading more...' : 'Load More Posts'}
              </Button>
            )}
          </Card>

          {/* Example 2: Query with Search - Countries */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-bold text-text mb-3">
              2️⃣ Search Query - Countries
            </Text>
            <Text className="text-sm text-text-secondary mb-4">
              REST Countries API with debounced search (5min cache)
            </Text>

            <Input
              placeholder="Search countries... (e.g., Italy)"
              value={countrySearch}
              onChangeText={setCountrySearch}
              leftIcon={<Text>🔍</Text>}
              className="mb-4"
            />

            {countriesLoading && debouncedSearch && (
              <Text className="text-center text-text-secondary py-4">
                Searching...
              </Text>
            )}

            {countriesError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <Text className="text-red-800 text-sm">
                  ❌ Error searching countries
                </Text>
              </View>
            )}

            {countries && countries.length === 0 && debouncedSearch && (
              <Text className="text-center text-text-secondary py-4">
                No countries found
              </Text>
            )}

            {countries && countries.length > 0 && (
              <View className="gap-3">
                {countries.slice(0, 5).map((country) => (
                  <Card key={country.cca2} variant="outlined" size="sm">
                    <View className="flex-row items-center gap-3">
                      <Image
                        source={{ uri: country.flags.png }}
                        className="w-12 h-8 rounded"
                        resizeMode="cover"
                      />
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-text">
                          {country.name.common}
                        </Text>
                        <Text className="text-sm text-text-secondary">
                          {country.capital?.[0] ?? 'N/A'} •{' '}
                          {country.population.toLocaleString()} people
                        </Text>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            )}

            {!debouncedSearch && (
              <Text className="text-center text-text-secondary py-4 text-sm">
                Type at least 3 characters to search
              </Text>
            )}
          </Card>

          {/* Example 3: Polling Query - Dog Images */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-bold text-text mb-3">
              3️⃣ Polling Query - Random Dog
            </Text>
            <Text className="text-sm text-text-secondary mb-4">
              Dog CEO API with auto-refresh every 10 seconds
            </Text>

            {dogLoading && (
              <Text className="text-center text-text-secondary py-4">
                Loading dog...
              </Text>
            )}

            {dogError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                <Text className="text-red-800 text-sm">
                  ❌ Error loading dog image
                </Text>
              </View>
            )}

            {dogImage && (
              <View>
                <Image
                  source={{ uri: dogImage.message }}
                  className="w-full h-64 rounded-lg mb-3"
                  resizeMode="cover"
                />
                <Button
                  variant="outlined"
                  size="sm"
                  fullWidth
                  onPress={() => void refetchDog()}>
                  🔄 Get New Dog
                </Button>
              </View>
            )}
          </Card>

          {/* Example 4: Mutation - Create Post */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-bold text-text mb-3">
              4️⃣ Mutation - Create Post
            </Text>
            <Text className="text-sm text-text-secondary mb-4">
              POST request with cache invalidation and optimistic updates
            </Text>

            <Input
              label="Post Title"
              placeholder="Enter title"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
              className="mb-3"
            />

            <Input
              label="Post Body"
              placeholder="Enter body text"
              value={newPostBody}
              onChangeText={setNewPostBody}
              multiline
              numberOfLines={3}
              className="mb-4"
            />

            <Button
              variant="filled"
              fullWidth
              loading={createPostMutation.isPending}
              disabled={!newPostTitle || !newPostBody}
              onPress={handleCreatePost}>
              {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
            </Button>

            {createPostMutation.isSuccess && (
              <View className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mt-3">
                <Text className="text-emerald-800 text-sm">
                  ✅ Post created successfully!
                </Text>
              </View>
            )}

            {createPostMutation.isError && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                <Text className="text-red-800 text-sm">
                  ❌ Error creating post
                </Text>
              </View>
            )}
          </Card>

          {/* Features Info */}
          <Card variant="outlined" className="mb-6">
            <Text className="text-lg font-bold text-text mb-3">
              ✨ TanStack Query Features Demonstrated
            </Text>
            <View className="gap-2">
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Infinite Queries</Text> -
                Pagination with fetchNextPage
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Search Queries</Text> -
                Debounced search with cache
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Polling</Text> - Auto-refresh
                every 10 seconds
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Mutations</Text> - POST
                requests with invalidation
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Loading States</Text> - Per
                query and mutation
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Error Handling</Text> - Try/catch
                with error states
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Refetching</Text> -
                Pull-to-refresh support
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Caching</Text> - 5min stale time
                for countries
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
