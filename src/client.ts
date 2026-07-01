import { type TMDBConfig } from './types';
import { TMDBError } from './types';
import { Movies } from './movies';
import { TV } from './tv';
import { Search } from './search';
import { Player } from './player';

export class TMDBClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  public readonly movies: Movies;
  public readonly tv: TV;
  public readonly search: Search;
  public readonly player: Player;

  constructor(config: TMDBConfig) {
    if (!config.apiKey) {
      throw new TMDBError('API key is required. Please provide a valid TMDB API key.', 401);
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.themoviedb.org/3';
    this.timeout = config.timeout || 10000;

    this.movies = new Movies(this.apiKey, this.baseUrl, this.timeout);
    this.tv = new TV(this.apiKey, this.baseUrl, this.timeout);
    this.search = new Search(this.apiKey, this.baseUrl, this.timeout);
    this.player = new Player();
  }
}