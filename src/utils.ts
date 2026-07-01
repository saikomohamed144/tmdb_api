import { TMDBError, type ImageSize } from './types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

export function buildImageUrl(
  path: string | null | undefined,
  size: ImageSize = 'original'
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}${size}${path}`;
}

export const image = {
  poster: (path: string | null, size: ImageSize = 'w500') => buildImageUrl(path, size),
  backdrop: (path: string | null, size: ImageSize = 'w1280') => buildImageUrl(path, size),
  profile: (path: string | null, size: ImageSize = 'w185') => buildImageUrl(path, size),
  logo: (path: string | null, size: ImageSize = 'original') => buildImageUrl(path, size),
  original: (path: string | null) => buildImageUrl(path, 'original'),
  w500: (path: string | null) => buildImageUrl(path, 'w500'),
  w780: (path: string | null) => buildImageUrl(path, 'w780'),
  w1280: (path: string | null) => buildImageUrl(path, 'w1280'),
  w342: (path: string | null) => buildImageUrl(path, 'w342'),
  w185: (path: string | null) => buildImageUrl(path, 'w185'),
  w154: (path: string | null) => buildImageUrl(path, 'w154'),
  w92: (path: string | null) => buildImageUrl(path, 'w92'),
};

export async function fetchFromTMDB<T>(
  endpoint: string,
  apiKey: string,
  baseUrl: string = 'https://api.themoviedb.org/3',
  timeout: number = 10000,
  params: Record<string, string | number> = {}
): Promise<T> {
  if (!apiKey) {
    throw new TMDBError('API key is required. Please provide a valid TMDB API key.', 401);
  }

  const url = new URL(`${baseUrl}${endpoint}`);
  url.searchParams.append('api_key', apiKey);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        if (errorData && typeof errorData === 'object' && 'status_message' in errorData) {
          errorMessage = String((errorData as { status_message: string }).status_message);
        }
      } catch {
        // Use default error message if parsing fails
      }
      
      if (response.status === 401) {
        throw new TMDBError('Invalid API key. Please check your TMDB API key.', 401);
      }
      if (response.status === 429) {
        throw new TMDBError('Rate limit exceeded. Please wait before making more requests.', 429);
      }
      if (response.status === 404) {
        throw new TMDBError('Resource not found. The requested item does not exist.', 404);
      }
      
      throw new TMDBError(errorMessage, response.status);
    }

    return await response.json() as T;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof TMDBError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new TMDBError(`Request timed out after ${timeout}ms. Please try again.`, 408);
    }
    
    throw new TMDBError(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      500
    );
  }
}

export function validateId(id: number | string, name: string): void {
  const numId = typeof id === 'string' ? parseInt(id, 10) : id;
  if (!Number.isFinite(numId) || numId <= 0) {
    throw new TMDBError(`Invalid ${name} ID: ${id}. Must be a positive number.`, 400);
  }
}

export function validateQuery(query: string, name: string): void {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    throw new TMDBError(`Search query for ${name} cannot be empty.`, 400);
  }
}