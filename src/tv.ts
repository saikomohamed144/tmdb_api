import { fetchFromTMDB, validateId } from './utils';
import {
  type PaginatedResponse,
  type TVShow,
  type TVShowDetails,
  type SeasonDetails,
  type EpisodeDetails,
  type Cast,
  type Video,
  type Image,
  type Review,
} from './types';

export class TV {
  constructor(
    private apiKey: string,
    private baseUrl: string,
    private timeout: number
  ) {}

  async popular(page: number = 1): Promise<PaginatedResponse<TVShow>> {
    return fetchFromTMDB<PaginatedResponse<TVShow>>('/tv/popular', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async trending(timeWindow: 'day' | 'week' = 'day'): Promise<PaginatedResponse<TVShow>> {
    return fetchFromTMDB<PaginatedResponse<TVShow>>(
      `/trending/tv/${timeWindow}`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async topRated(page: number = 1): Promise<PaginatedResponse<TVShow>> {
    return fetchFromTMDB<PaginatedResponse<TVShow>>('/tv/top_rated', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async airingToday(page: number = 1): Promise<PaginatedResponse<TVShow>> {
    return fetchFromTMDB<PaginatedResponse<TVShow>>('/tv/airing_today', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async onTheAir(page: number = 1): Promise<PaginatedResponse<TVShow>> {
    return fetchFromTMDB<PaginatedResponse<TVShow>>('/tv/on_the_air', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async details(tvId: number): Promise<TVShowDetails> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<TVShowDetails>(`/tv/${tvId}`, this.apiKey, this.baseUrl, this.timeout);
  }

  async cast(tvId: number): Promise<{ id: number; cast: Cast[] }> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<{ id: number; cast: Cast[] }>(
      `/tv/${tvId}/credits`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async videos(tvId: number): Promise<{ id: number; results: Video[] }> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<{ id: number; results: Video[] }>(
      `/tv/${tvId}/videos`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async images(tvId: number): Promise<{ id: number; backdrops: Image[]; posters: Image[] }> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<{ id: number; backdrops: Image[]; posters: Image[] }>(
      `/tv/${tvId}/images`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async recommendations(tvId: number, page: number = 1): Promise<PaginatedResponse<TVShow>> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<PaginatedResponse<TVShow>>(
      `/tv/${tvId}/recommendations`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async similar(tvId: number, page: number = 1): Promise<PaginatedResponse<TVShow>> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<PaginatedResponse<TVShow>>(
      `/tv/${tvId}/similar`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async reviews(tvId: number, page: number = 1): Promise<PaginatedResponse<Review>> {
    validateId(tvId, 'TV show');
    return fetchFromTMDB<PaginatedResponse<Review>>(
      `/tv/${tvId}/reviews`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async seasonDetails(tvId: number, seasonNumber: number): Promise<SeasonDetails> {
    validateId(tvId, 'TV show');
    if (!Number.isFinite(seasonNumber) || seasonNumber < 0) {
      throw new Error('Invalid season number');
    }
    return fetchFromTMDB<SeasonDetails>(
      `/tv/${tvId}/season/${seasonNumber}`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async episodeDetails(
    tvId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<EpisodeDetails> {
    validateId(tvId, 'TV show');
    if (!Number.isFinite(seasonNumber) || seasonNumber < 0) {
      throw new Error('Invalid season number');
    }
    if (!Number.isFinite(episodeNumber) || episodeNumber < 1) {
      throw new Error('Invalid episode number');
    }
    return fetchFromTMDB<EpisodeDetails>(
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }
}