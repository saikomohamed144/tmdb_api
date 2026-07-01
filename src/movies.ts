import { fetchFromTMDB, validateId } from './utils';
import {
  type PaginatedResponse,
  type Movie,
  type MovieDetails,
  type Cast,
  type Video,
  type Image,
  type Review,
  type GenreName,
  GENRE_IDS,
} from './types';

export class Movies {
  constructor(
    private apiKey: string,
    private baseUrl: string,
    private timeout: number
  ) {}

  async latest(): Promise<Movie> {
    return fetchFromTMDB<Movie>('/movie/latest', this.apiKey, this.baseUrl, this.timeout);
  }

  async popular(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/popular', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async trending(timeWindow: 'day' | 'week' = 'day'): Promise<PaginatedResponse<Movie>> {
    return fetchFromTMDB<PaginatedResponse<Movie>>(
      `/trending/movie/${timeWindow}`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async nowPlaying(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/now_playing', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async upcoming(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/upcoming', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async topRated(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return fetchFromTMDB<PaginatedResponse<Movie>>('/movie/top_rated', this.apiKey, this.baseUrl, this.timeout, { page });
  }

  async details(movieId: number): Promise<MovieDetails> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<MovieDetails>(`/movie/${movieId}`, this.apiKey, this.baseUrl, this.timeout);
  }

  async cast(movieId: number): Promise<{ id: number; cast: Cast[] }> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<{ id: number; cast: Cast[] }>(
      `/movie/${movieId}/credits`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async videos(movieId: number): Promise<{ id: number; results: Video[] }> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<{ id: number; results: Video[] }>(
      `/movie/${movieId}/videos`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async images(movieId: number): Promise<{ id: number; backdrops: Image[]; posters: Image[] }> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<{ id: number; backdrops: Image[]; posters: Image[] }>(
      `/movie/${movieId}/images`,
      this.apiKey,
      this.baseUrl,
      this.timeout
    );
  }

  async recommendations(movieId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<PaginatedResponse<Movie>>(
      `/movie/${movieId}/recommendations`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async similar(movieId: number, page: number = 1): Promise<PaginatedResponse<Movie>> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<PaginatedResponse<Movie>>(
      `/movie/${movieId}/similar`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async reviews(movieId: number, page: number = 1): Promise<PaginatedResponse<Review>> {
    validateId(movieId, 'movie');
    return fetchFromTMDB<PaginatedResponse<Review>>(
      `/movie/${movieId}/reviews`,
      this.apiKey,
      this.baseUrl,
      this.timeout,
      { page }
    );
  }

  async byGenre(genreName: GenreName, page: number = 1): Promise<PaginatedResponse<Movie>> {
    const genreId = GENRE_IDS[genreName];
    return fetchFromTMDB<PaginatedResponse<Movie>>('/discover/movie', this.apiKey, this.baseUrl, this.timeout, {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc',
      without_genres: GENRE_IDS.documentary,
    });
  }

  async action(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('action', page);
  }

  async adventure(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('adventure', page);
  }

  async animation(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('animation', page);
  }

  async cartoon(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.animation(page);
  }

  async comedy(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('comedy', page);
  }

  async crime(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('crime', page);
  }

  async drama(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('drama', page);
  }

  async family(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('family', page);
  }

  async kids(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.family(page);
  }

  async fantasy(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('fantasy', page);
  }

  async history(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('history', page);
  }

  async horror(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('horror', page);
  }

  async music(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('music', page);
  }

  async mystery(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('mystery', page);
  }

  async romance(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('romance', page);
  }

  async scienceFiction(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('scienceFiction', page);
  }

  async thriller(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('thriller', page);
  }

  async war(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('war', page);
  }

  async western(page: number = 1): Promise<PaginatedResponse<Movie>> {
    return this.byGenre('western', page);
  }
}