import { useInfiniteQuery } from '@tanstack/react-query';

import { postsApi } from '@/services/demo-api';

/**
 * Hook for fetching paginated posts with infinite scroll
 * Uses JSONPlaceholder API
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isLoading } = usePosts();
 * ```
 */
export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => postsApi.getPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};
