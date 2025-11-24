import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@services/api-client';

export type Portal = {
  id: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  category?: string;
};

type PortalsResponse = {
  data: Portal[];
  total: number;
};

export const usePortals = () => {
  return useQuery({
    queryKey: ['portals'],
    queryFn: async (): Promise<Portal[]> => {
      // Replace with actual API endpoint
      // const response = await apiClient.get<PortalsResponse>('/portals');
      // return response.data;

      // Mock data for now
      return [
        {
          id: '1',
          name: 'Cultura Campania',
          description: 'Esplora la cultura della Campania',
          url: 'https://cultura.regione.campania.it',
          icon: '🏛️',
          category: 'cultura',
        },
        {
          id: '2',
          name: 'Sistema Informativo Culturale',
          description: 'Sistema informativo dei beni culturali',
          url: 'https://example.com',
          icon: '📚',
          category: 'patrimonio',
        },
      ];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePortal = (id: string) => {
  return useQuery({
    queryKey: ['portals', id],
    queryFn: async (): Promise<Portal> => {
      // Replace with actual API endpoint
      // const response = await apiClient.get<Portal>(`/portals/${id}`);
      // return response;

      // Mock data for now
      return {
        id,
        name: 'Portal Example',
        description: 'Description',
        url: 'https://example.com',
      };
    },
    enabled: !!id,
  });
};
