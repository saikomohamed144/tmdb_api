import { fetchFromTMDB, validateQuery } from './utils';
import {
  type PaginatedResponse,
  type Movie,
  type TVShow,
  type MultiSearchResult,
  type Person,
} from './types';

export class Search {
  constructor(
    private apiKey: string,
    private baseUrl: string,
    private timeout: number
  ) {}

  async movie(query: string, page: number = 1): Promise<PaginatedResponse<Movie>> {
    validateQuery(query, 'movies');
    return fetchFromTMDB<PaginatedResponse<Movie>>('/search/movie', this.apiKey, this.baseUrl, this.timeout, {
      query: query.trim(),
      page,
    });
  }

  async tv(query: string, page: number = 1): Promise<PaginatedResponse<TVShow>> {
    validateQuery(query, 'TV shows');
    return fetchFromTMDB<PaginatedResponse<TVShow>>('/search/tv', this.apiKey, this.baseUrl, this.timeout, {
      query: query.trim(),
      page,
    });
  }

  async multi(query: string, page: number = 1): Promise<PaginatedResponse<MultiSearchResult>> {
    validateQuery(query, 'multi search');
    return fetchFromTMDB<PaginatedResponse<MultiSearchResult>>('/search/multi', this.apiKey, this.baseUrl, this.timeout, {
      query: query.trim(),
      page,
    });
  }

  async person(query: string, page: number = 1): Promise<PaginatedResponse<Person>> {
    validateQuery(query, 'person');
    return fetchFromTMDB<PaginatedResponse<Person>>('/search/person', this.apiKey, this.baseUrl, this.timeout, {
      query: query.trim(),
      page,
    });
  }
}