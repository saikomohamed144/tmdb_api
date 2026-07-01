## README.md

```markdown
# @abdo/tmdb-api

A professional, type-safe TMDB API wrapper for movies and TV shows. Built for server-side rendering and Node.js with zero browser APIs.

[![npm version](https://img.shields.io/npm/v/@abdo/tmdb-api)](https://www.npmjs.com/package/@abdo/tmdb-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)

---

## Features

- Complete TMDB API coverage for movies and TV shows
- Smart genre helpers with automatic genre ID mapping
- Image URL builder for posters, backdrops, and profiles
- Streaming URL generator for movies and TV episodes
- Full TypeScript support with strict mode and exported interfaces
- Server-side compatible (Node.js, Next.js, Express, Remix, Astro)
- Tree-shakeable with CJS and ESM support
- Professional error handling with meaningful messages

---

## Installation

```bash
npm install @abdo/tmdb-api
```

```bash
pnpm add @abdo/tmdb-api
```

```bash
yarn add @abdo/tmdb-api
```

---

## Quick Start

```typescript
import { TMDB } from '@abdo/tmdb-api';

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY
});

// Get popular movies
const movies = await api.movies.popular();

// Search for a movie
const results = await api.search.movie('Inception');

// Generate streaming URL
const url = api.player.movie(27205);
```

---

## Configuration

```typescript
const api = new TMDB({
  apiKey: 'your_api_key_here',
  baseUrl: 'https://api.themoviedb.org/3',
  timeout: 10000
});
```

Get your API key at: https://www.themoviedb.org/settings/api

---

## API Reference

### Movies

```typescript
// Discovery
await api.movies.popular(page?: number)
await api.movies.trending(window?: 'day' | 'week')
await api.movies.nowPlaying(page?: number)
await api.movies.upcoming(page?: number)
await api.movies.topRated(page?: number)
await api.movies.latest()

// Details
await api.movies.details(movieId: number)
await api.movies.cast(movieId: number)
await api.movies.videos(movieId: number)
await api.movies.images(movieId: number)
await api.movies.recommendations(movieId: number)
await api.movies.similar(movieId: number)
await api.movies.reviews(movieId: number)
```

### TV Shows

```typescript
// Discovery
await api.tv.popular(page?: number)
await api.tv.trending(window?: 'day' | 'week')
await api.tv.topRated(page?: number)
await api.tv.airingToday(page?: number)
await api.tv.onTheAir(page?: number)

// Details
await api.tv.details(tvId: number)
await api.tv.cast(tvId: number)
await api.tv.videos(tvId: number)
await api.tv.images(tvId: number)
await api.tv.recommendations(tvId: number)
await api.tv.similar(tvId: number)
await api.tv.reviews(tvId: number)

// Seasons & Episodes
await api.tv.seasonDetails(tvId: number, seasonNumber: number)
await api.tv.episodeDetails(tvId: number, seasonNumber: number, episodeNumber: number)
```

### Genre Helpers

All genre methods automatically exclude documentaries:

```typescript
await api.movies.action()
await api.movies.adventure()
await api.movies.animation()
await api.movies.cartoon()
await api.movies.comedy()
await api.movies.crime()
await api.movies.drama()
await api.movies.family()
await api.movies.kids()
await api.movies.fantasy()
await api.movies.history()
await api.movies.horror()
await api.movies.music()
await api.movies.mystery()
await api.movies.romance()
await api.movies.scienceFiction()
await api.movies.thriller()
await api.movies.war()
await api.movies.western()
```

### Search

```typescript
await api.search.movie(query: string, page?: number)
await api.search.tv(query: string, page?: number)
await api.search.multi(query: string, page?: number)
await api.search.person(query: string, page?: number)
```

### Player URLs

```typescript
// Movie streaming URL
api.player.movie(609681)
// Returns: https://www.2embed.cc/embed/609681

// TV episode streaming URL
api.player.tv(60735, 1, 1)
// Returns: https://www.2embed.cc/embedtv/60735&s=1&e=1
```

### Image Helpers

```typescript
import { image } from '@abdo/tmdb-api';

image.poster(path)
image.backdrop(path)
image.profile(path)
image.original(path)
image.w500(path)
image.w780(path)
image.w1280(path)
image.w342(path)
image.w185(path)
image.w154(path)
image.w92(path)
```

---

## Usage Examples

### Next.js App Router (Server Component)

```typescript
import { TMDB, image } from '@abdo/tmdb-api';

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY!
});

export default async function MoviesPage() {
  const { results } = await api.movies.popular();
  
  return (
    <div>
      {results.map((movie) => (
        <div key={movie.id}>
          <img 
            src={image.poster(movie.poster_path)!} 
            alt={movie.title} 
          />
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}
```

### Express.js API

```typescript
import express from 'express';
import { TMDB, TMDBError } from '@abdo/tmdb-api';

const app = express();
const api = new TMDB({ 
  apiKey: process.env.TMDB_API_KEY! 
});

app.get('/api/movies/popular', async (req, res) => {
  try {
    const movies = await api.movies.popular();
    res.json(movies);
  } catch (error) {
    if (error instanceof TMDBError) {
      return res.status(error.statusCode).json({ 
        error: error.message 
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Genre-Based Discovery

```typescript
async function getMoviesByGenre(genre: string) {
  const genres = {
    action: api.movies.action,
    comedy: api.movies.comedy,
    horror: api.movies.horror,
    scifi: api.movies.scienceFiction,
    romance: api.movies.romance
  };
  
  const fetcher = genres[genre as keyof typeof genres];
  
  if (!fetcher) {
    throw new Error(`Unknown genre: ${genre}`);
  }
  
  return await fetcher();
}

// Usage
const actionMovies = await getMoviesByGenre('action');
const horrorMovies = await getMoviesByGenre('horror');
```

### Building a Movie Details Page

```typescript
async function getMoviePage(movieId: number) {
  const [movie, credits, videos] = await Promise.all([
    api.movies.details(movieId),
    api.movies.cast(movieId),
    api.movies.videos(movieId)
  ]);

  const trailer = videos.results.find(v => v.type === 'Trailer');
  const streamUrl = api.player.movie(movieId);

  return {
    movie,
    cast: credits.cast.slice(0, 10),
    trailer,
    streamUrl
  };
}
```

---

## Error Handling

```typescript
import { TMDBError } from '@abdo/tmdb-api';

try {
  const movie = await api.movies.details(999999);
} catch (error) {
  if (error instanceof TMDBError) {
    switch (error.statusCode) {
      case 401:
        console.error('Invalid API key');
        break;
      case 404:
        console.error('Movie not found');
        break;
      case 429:
        console.error('Rate limit exceeded');
        break;
      case 408:
        console.error('Request timed out');
        break;
      default:
        console.error(`Error: ${error.message}`);
    }
  }
}
```

---

## TypeScript Support

```typescript
import type { 
  Movie, 
  MovieDetails, 
  TVShow, 
  TVShowDetails,
  Cast, 
  Crew,
  PaginatedResponse,
  TMDBConfig 
} from '@abdo/tmdb-api';

// All responses are fully typed
const movie: MovieDetails = await api.movies.details(550);
const { results, page, total_pages }: PaginatedResponse<Movie> = 
  await api.movies.popular();
```

---

## Environment Support

| Environment | Status |
|-------------|--------|
| Node.js 16+ | Supported |
| Next.js App Router | Supported |
| Next.js Pages Router | Supported |
| Express.js | Supported |
| Astro | Supported |
| Remix | Supported |
| Nuxt 3 | Supported |
| Vercel Functions | Supported |

---

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm run dev
```

The build output in `dist/` folder:
- `index.js` - CommonJS
- `index.mjs` - ES Modules
- `index.d.ts` - TypeScript declarations

---

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## License

MIT © Abdo

---

## Support

If you find this package useful, please consider giving it a star on GitHub!
```
