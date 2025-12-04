import { createApiClient } from './api-client';

/**
 * Type definitions for API responses
 */
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Country = {
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

export type DogImage = {
  message: string;
  status: string;
};

export type PostsResponse = {
  posts: Post[];
  nextPage: number | undefined;
};

/**
 * API Clients for different services
 */
const jsonPlaceholderApi = createApiClient(
  'https://jsonplaceholder.typicode.com'
);
const restCountriesApi = createApiClient('https://restcountries.com/v3.1');
const dogCeoApi = createApiClient('https://dog.ceo/api');

/**
 * JSONPlaceholder API Service
 */
export const postsApi = {
  /**
   * Fetch paginated posts
   */
  getPosts: async (page: number): Promise<PostsResponse> => {
    const response = await jsonPlaceholderApi.get<Post[]>('/posts', {
      params: {
        _page: page,
        _limit: 5,
      },
    });

    return {
      posts: response.data,
      nextPage: response.data.length === 5 ? page + 1 : undefined,
    };
  },

  /**
   * Create a new post
   */
  createPost: async (post: {
    title: string;
    body: string;
  }): Promise<Post> => {
    const response = await jsonPlaceholderApi.post<Post>('/posts', {
      ...post,
      userId: 1,
    });

    return response.data;
  },
};

/**
 * REST Countries API Service
 */
export const countriesApi = {
  /**
   * Search countries by name
   */
  searchByName: async (name: string): Promise<Country[]> => {
    if (!name) return [];

    try {
      const response = await restCountriesApi.get<Country[]>(
        `/name/${encodeURIComponent(name)}`
      );
      return response.data;
    } catch (error: any) {
      // Return empty array for 404 (not found)
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },
};

/**
 * Dog CEO API Service
 */
export const dogsApi = {
  /**
   * Get random dog image
   */
  getRandomDog: async (): Promise<DogImage> => {
    const response = await dogCeoApi.get<DogImage>('/breeds/image/random');
    return response.data;
  },
};
