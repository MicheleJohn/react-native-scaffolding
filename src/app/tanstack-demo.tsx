import React, { useState } from 'react';
import { Image, RefreshControl, ScrollView, Text, View } from 'react-native';

import { Link } from 'expo-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button, Card, Input } from '@/components/ui';
import { useCountries } from '@/hooks/useCountries';
import { useCreatePost } from '@/hooks/useCreatePost';
import { usePosts } from '@/hooks/usePosts';
import { useRandomDog } from '@/hooks/useRandomDog';

/**
 * Zod schema for post creation form
 */
const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  body: z
    .string()
    .min(1, 'Body is required')
    .min(10, 'Body must be at least 10 characters')
    .max(500, 'Body must be less than 500 characters'),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

/**
 * TanStack Query Demo Page
 * Comprehensive showcase of query features with React Hook Form
 */
export default function TanStackDemoPage() {
  const [countrySearch, setCountrySearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  /**
   * React Hook Form setup with Zod resolver
   */
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

  // Debounce country search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(countrySearch);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
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
  } = usePosts();

  /**
   * Example 2: Query with Search - Countries
   */
  const {
    data: countries,
    isLoading: countriesLoading,
    isError: countriesError,
  } = useCountries(debouncedSearch, debouncedSearch.length > 2);

  /**
   * Example 3: Polling Query - Random Dog Images
   */
  const {
    data: dogImage,
    isLoading: dogLoading,
    isError: dogError,
    refetch: refetchDog,
  } = useRandomDog();

  /**
   * Example 4: Mutation - Create Post
   */
  const createPostMutation = useCreatePost();

  /**
   * Form submission handler
   */
  const onSubmit = (data: CreatePostFormData) => {
    createPostMutation.mutate(data, {
      onSuccess: () => {
        reset(); // Reset form after successful submission
      },
    });
  };

  return (
    <SafeAreaView className="bg-background">
      <ScrollView
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
              Real-world examples with React Hook Form & Zod validation
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

            {countries?.length === 0 && debouncedSearch && (
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

          {/* Example 4: Mutation - Create Post with React Hook Form */}
          <Card variant="elevated" className="mb-6">
            <Text className="text-xl font-bold text-text mb-3">
              4️⃣ Mutation - Create Post (React Hook Form + Zod)
            </Text>
            <Text className="text-sm text-text-secondary mb-4">
              POST request with validation, cache invalidation and optimistic
              updates
            </Text>

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Post Title"
                  placeholder="Enter title (min 3 characters)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.title?.message}
                  containerClassName="mb-3"
                />
              )}
            />

            <Controller
              control={control}
              name="body"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Post Body"
                  placeholder="Enter body text (min 10 characters)"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.body?.message}
                  multiline
                  numberOfLines={3}
                  containerClassName="mb-4"
                />
              )}
            />

            <Button
              variant="filled"
              fullWidth
              loading={createPostMutation.isPending}
              disabled={!isValid || createPostMutation.isPending}
              onPress={handleSubmit(onSubmit)}>
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
                • <Text className="font-semibold">Form Validation</Text> - React
                Hook Form with Zod
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Loading States</Text> - Per
                query and mutation
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Error Handling</Text> -
                Try/catch with error states
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Refetching</Text> -
                Pull-to-refresh support
              </Text>
              <Text className="text-sm text-text">
                • <Text className="font-semibold">Caching</Text> - 5min stale
                time for countries
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
