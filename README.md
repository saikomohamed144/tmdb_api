<p align="center">
  <img src="https://img.icons8.com/color/96/000000/movie.png" alt="Movie Icon" width="80" />
</p>

<h1 align="center">@abdo/tmdb-api</h1>

<p align="center">
  <strong>Professional, type‑safe TMDB API wrapper for movies & TV shows.</strong><br>
  Built for server‑side rendering and Node.js – zero browser APIs.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@abdo/tmdb-api"><img src="https://img.shields.io/npm/v/@abdo/tmdb-api" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.3+-blue.svg" alt="TypeScript" /></a>
</p>

---

## Features

- 🎬 **Complete TMDB coverage** – movies, TV shows, search, genres  
- 🎯 **Smart genre helpers** – never touch a genre ID again  
- 🖼️ **Image URL builder** – posters, backdrops, profiles in any size  
- 🎮 **Streaming URLs** – generate embed links for movies & TV episodes  
- 🔒 **Fully typed** – strict TypeScript, exported interfaces  
- 🚀 **Server‑first** – works in Node.js, Next.js, Express, Remix, Astro, Vercel Functions  
- ⚡ **Tree‑shakeable** – ESM + CJS, import only what you need  

---

## Installation

```bash
npm install @abdo/tmdb-api
# or
pnpm add @abdo/tmdb-api
# or
yarn add @abdo/tmdb-api
```

---

## Quick Start

```typescript
import { TMDB } from '@abdo/tmdb-api';

const api = new TMDB({ apiKey: process.env.TMDB_API_KEY });

// Popular movies
const popular = await api.movies.popular();

// Search a movie
const search = await api.search.movie('Inception');

// Streaming URL
const url = api.player.movie(27205); // https://www.2embed.cc/embed/27205
```

---

## Configuration

```typescript
const api = new TMDB({
  apiKey: 'your_api_key',   // required – get it at https://www.themoviedb.org/settings/api
  baseUrl: 'https://api.themoviedb.org/3', // optional (default)
  timeout: 10000            // optional (default 10s)
});
```

---

## Core Methods

### Movies

```typescript
// Discovery
api.movies.popular(page?: number)
api.movies.trending(window?: 'day' | 'week')
api.movies.nowPlaying(page?: number)
api.movies.upcoming(page?: number)
api.movies.topRated(page?: number)

// Details & related
api.movies.details(movieId)
api.movies.cast(movieId)
api.movies.videos(movieId)
api.movies.images(movieId)
api.movies.recommendations(movieId)
api.movies.similar(movieId)
api.movies.reviews(movieId)
```

### TV Shows

```typescript
// Discovery
api.tv.popular(page?: number)
api.tv.trending(window?: 'day' | 'week')
api.tv.topRated(page?: number)
api.tv.airingToday(page?: number)
api.tv.onTheAir(page?: number)

// Details
api.tv.details(tvId)
api.tv.cast(tvId)
api.tv.videos(tvId)
api.tv.images(tvId)
api.tv.recommendations(tvId)
api.tv.similar(tvId)

// Seasons & Episodes
api.tv.seasonDetails(tvId, seasonNumber)
api.tv.episodeDetails(tvId, seasonNumber, episodeNumber)
```

### Genre Helpers (documentaries excluded)

```typescript
api.movies.action()
api.movies.adventure()
api.movies.animation()
api.movies.cartoon()      // alias for animation
api.movies.comedy()
api.movies.crime()
api.movies.drama()
api.movies.family()
api.movies.kids()         // alias for family
api.movies.fantasy()
api.movies.history()
api.movies.horror()
api.movies.music()
api.movies.mystery()
api.movies.romance()
api.movies.scienceFiction()
api.movies.thriller()
api.movies.war()
api.movies.western()
```

### Search

```typescript
api.search.movie(query, page?)
api.search.tv(query, page?)
api.search.multi(query, page?)
api.search.person(query, page?)
```

### Player (Streaming URLs)

```typescript
api.player.movie(tmdbId)           // https://www.2embed.cc/embed/{id}
api.player.tv(tmdbId, season, ep)  // https://www.2embed.cc/embedtv/{id}&s={s}&e={e}
```

### Image Helpers

```typescript
import { image } from '@abdo/tmdb-api';

image.poster(path)       // w500
image.backdrop(path)     // w1280
image.profile(path)      // w185
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

```tsx
import { TMDB, image } from '@abdo/tmdb-api';

const api = new TMDB({ apiKey: process.env.TMDB_API_KEY! });

export default async function MovieGrid() {
  const { results } = await api.movies.popular();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
      {results.map((movie) => (
        <div key={movie.id}>
          <img src={image.poster(movie.poster_path)!} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

### Express API Route

```typescript
import express from 'express';
import { TMDB, TMDBError } from '@abdo/tmdb-api';

const api = new TMDB({ apiKey: process.env.TMDB_API_KEY! });
const app = express();

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await api.movies.details(Number(req.params.id));
    res.json(movie);
  } catch (error) {
    if (error instanceof TMDBError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
```

### Building a Full Movie Page

```typescript
const [details, credits, videos] = await Promise.all([
  api.movies.details(550),
  api.movies.cast(550),
  api.movies.videos(550),
]);

const trailer = videos.results.find(v => v.type === 'Trailer');
const streamUrl = api.player.movie(550);
```

---

## Error Handling

```typescript
import { TMDBError } from '@abdo/tmdb-api';

try {
  await api.movies.details(0);
} catch (error) {
  if (error instanceof TMDBError) {
    console.log(`Status: ${error.statusCode} – ${error.message}`);
    // Handled: 401 (invalid key), 404 (not found), 429 (rate limit), 408 (timeout)
  }
}
```

---

## TypeScript

All responses are strongly typed. Interfaces are exported for reuse.

```typescript
import type { Movie, TVShow, PaginatedResponse } from '@abdo/tmdb-api';

const res: PaginatedResponse<Movie> = await api.movies.popular();
```

---

## Environment Support

| Platform              | Support |
|-----------------------|---------|
| Node.js (v16+)        | ✅      |
| Next.js App Router    | ✅      |
| Next.js Pages Router  | ✅      |
| Express               | ✅      |
| Astro                 | ✅      |
| Remix                 | ✅      |
| Nuxt Server           | ✅      |
| Vercel Functions      | ✅      |

---

## Build

```bash
npm install
npm run build   # produces CJS + ESM + .d.ts in dist/
```

---

## Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open a PR or issue on GitHub.

---

## License

MIT © Abdo

---

<p align="center">Made with ❤️ for movie lovers</p>
```
