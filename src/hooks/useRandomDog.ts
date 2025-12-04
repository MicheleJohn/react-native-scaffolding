import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { dogsApi, type DogImage } from '@/services/demo-api';

/**
 * Hook for fetching random dog images with polling
 * Uses Dog CEO API with auto-refresh
 *
 * @param refetchInterval - Polling interval in milliseconds (default: 10000)
 *
 * @example
 * ```tsx
 * const { data, isLoading, refetch } = useRandomDog();
 * ```
 */
export const useRandomDog = (
  refetchInterval = 10000
): UseQueryResult<DogImage, Error> => {
  return useQuery({
    queryKey: ['randomDog'],
    queryFn: dogsApi.getRandomDog,
    refetchInterval,
  });
};
