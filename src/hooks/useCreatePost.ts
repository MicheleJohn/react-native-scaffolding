import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postsApi } from '@/services/demo-api';

/**
 * Hook for creating a new post with cache invalidation
 * Uses JSONPlaceholder API
 *
 * @example
 * ```tsx
 * const mutation = useCreatePost();
 * mutation.mutate({ title: 'Hello', body: 'World' });
 * ```
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      // Invalidate posts query to refetch
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
