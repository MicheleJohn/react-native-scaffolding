import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { postsApi, type Post } from '@/services/demo-api';

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
export const useCreatePost = (): UseMutationResult<
  Post,
  Error,
  { title: string; body: string },
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      // Invalidate posts query to refetch
      void queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
