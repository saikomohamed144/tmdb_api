import { validateId } from './utils';

export class Player {
  movie(tmdbId: number): string {
    validateId(tmdbId, 'movie');
    return `https://www.2embed.cc/embed/${tmdbId}`;
  }

  tv(tmdbId: number, season: number, episode: number): string {
    validateId(tmdbId, 'TV show');
    if (!Number.isFinite(season) || season < 0) {
      throw new Error('Invalid season number');
    }
    if (!Number.isFinite(episode) || episode < 1) {
      throw new Error('Invalid episode number');
    }
    return `https://www.2embed.cc/embedtv/${tmdbId}&s=${season}&e=${episode}`;
  }
}