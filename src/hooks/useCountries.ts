import { useQuery } from '@tanstack/react-query';

import { countriesApi } from '@/services/demo-api';

/**
 * Hook for searching countries by name
 * Uses REST Countries API with caching
 *
 * @param searchTerm - Country name to search
 * @param enabled - Whether to enable the query (default: searchTerm.length > 2)
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useCountries('Italy');
 * ```
 */
export const useCountries = (searchTerm: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ['countries', searchTerm],
    queryFn: () => countriesApi.searchByName(searchTerm),
    enabled: enabled ?? searchTerm.length > 2,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};
