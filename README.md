```markdown
<p align="center">
  <img src="https://img.icons8.com/color/96/000000/movie.png" alt="@abdo/tmdb-api" width="120" />
</p>

<h1 align="center">@abdo/tmdb-api</h1>

<p align="center">
  <strong>Build Movie & TV Show Websites with Minimal Code</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@abdo/tmdb-api">
    <img src="https://img.shields.io/npm/v/@abdo/tmdb-api?color=cb3837&logo=npm" alt="npm version" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.3+-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/Node.js-16+-339933?logo=node.js&logoColor=white" alt="Node.js" />
  </a>
</p>

<br />

---

## 📖 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
  - [Movies](#-movies)
  - [TV Shows](#-tv-shows)
  - [Genres](#-genres)
  - [Search](#-search)
  - [Player](#-player)
  - [Images](#-images)
- [Examples](#-examples)
  - [Next.js Server Component](#nextjs-server-component)
  - [Express.js API](#expressjs-api)
  - [React Component](#react-component)
- [Error Handling](#-error-handling)
- [Configuration](#-configuration)
- [TypeScript](#-typescript)
- [Supported Environments](#-supported-environments)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Category | Features |
|----------|----------|
| 🎬 **Movies & TV** | Popular, Trending, Now Playing, Upcoming, Top Rated, Details, Cast, Videos, Images |
| 🎭 **Genres** | 18+ genre helpers - Action, Comedy, Horror, Romance, Sci-Fi & more |
| 🔍 **Search** | Movies, TV Shows, Multi-Search, Person Search |
| 🎮 **Player** | Generate streaming embed URLs for movies & TV shows |
| 🖼️ **Images** | Poster, Backdrop, Profile, Logo with multiple sizes |
| 🔒 **TypeScript** | 100% type-safe with strict mode, full IntelliSense |
| 🚀 **Server-Side** | Works in Node.js, Next.js, Express, Astro, Remix, Nuxt |
| ⚡ **Performance** | Tree shakeable, small bundle, dual CJS/ESM format |

---

## 📦 Installation

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

## 🔑 Environment Variables

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

> Get your free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

---

## 🚀 Quick Start

```typescript
import { TMDB } from '@abdo/tmdb-api'

// Initialize with your API key
const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY
})

// Get popular movies
const { results } = await api.movies.popular()

// Get horror movies (documentaries excluded)
const horror = await api.movies.horror()

// Search for movies
const search = await api.search.movie('The Matrix')

// Generate streaming URL
const url = api.player.movie(603) // The Matrix
```

---

## 📚 API Reference

### 🎬 Movies

```typescript
// Browse Movies
const popular = await api.movies.popular()
const trending = await api.movies.trending('week')
const nowPlaying = await api.movies.nowPlaying()
const upcoming = await api.movies.upcoming()
const topRated = await api.movies.topRated()
const latest = await api.movies.latest()

// Movie Details
const movie = await api.movies.details(550)           // Fight Club
const cast = await api.movies.cast(550)               // Cast & Crew
const videos = await api.movies.videos(550)           // Trailers & Clips
const images = await api.movies.images(550)           // Posters & Backdrops

// Related Movies
const similar = await api.movies.similar(550)         // Similar movies
const recommendations = await api.movies.recommendations(550)
const reviews = await api.movies.reviews(550)         // User reviews
```

### 📺 TV Shows

```typescript
// Browse TV Shows
const popular = await api.tv.popular()
const trending = await api.tv.trending('day')
const topRated = await api.tv.topRated()
const airingToday = await api.tv.airingToday()
const onTheAir = await api.tv.onTheAir()

// TV Show Details
const show = await api.tv.details(1399)               // Game of Thrones
const cast = await api.tv.cast(1399)
const videos = await api.tv.videos(1399)
const images = await api.tv.images(1399)

// Seasons & Episodes
const season1 = await api.tv.seasonDetails(1399, 1)
const episode = await api.tv.episodeDetails(1399, 1, 1)

// Related TV Shows
const similar = await api.tv.similar(1399)
const recommendations = await api.tv.recommendations(1399)
const reviews = await api.tv.reviews(1399)
```

### 🎭 Genres

Documentaries are automatically excluded from all genre results:

```typescript
// All genre helpers are available
await api.movies.action()          // 💥 Action Movies
await api.movies.adventure()       // 🗺️ Adventure Movies
await api.movies.animation()       // 🎨 Animation Movies
await api.movies.cartoon()         // 🎨 Cartoon Movies (alias)
await api.movies.comedy()          // 😂 Comedy Movies
await api.movies.crime()           // 🕵️ Crime Movies
await api.movies.drama()           // 🎭 Drama Movies
await api.movies.family()          // 👨‍👩‍👧‍👦 Family Movies
await api.movies.kids()            // 👶 Kids Movies (alias)
await api.movies.fantasy()         // 🧙 Fantasy Movies
await api.movies.history()         // 📜 History Movies
await api.movies.horror()          // 👻 Horror Movies
await api.movies.music()           // 🎵 Music Movies
await api.movies.mystery()         // 🔍 Mystery Movies
await api.movies.romance()         // 💕 Romance Movies
await api.movies.scienceFiction()  // 🚀 Sci-Fi Movies
await api.movies.thriller()        // 😱 Thriller Movies
await api.movies.war()             // ⚔️ War Movies
await api.movies.western()         // 🤠 Western Movies
```

### 🔍 Search

```typescript
// Search by type
const movies = await api.search.movie('John Wick')
const tvShows = await api.search.tv('Breaking Bad')
const all = await api.search.multi('Avatar')
const people = await api.search.person('Tom Cruise')

// With pagination
const page2 = await api.search.movie('Marvel', 2)
```

### 🎮 Player

```typescript
// Generate streaming embed URLs
const movieUrl = api.player.movie(609681)
// Output: https://www.2embed.cc/embed/609681

const tvUrl = api.player.tv(60735, 1, 1)
// Output: https://www.2embed.cc/embedtv/60735&s=1&e=1
```

### 🖼️ Images

```typescript
import { image } from '@abdo/tmdb-api'

// Different sizes
image.original(movie.poster_path)    // Original quality
image.w1280(movie.backdrop_path)     // 1280px width
image.w780(movie.poster_path)        // 780px width
image.w500(movie.poster_path)        // 500px width
image.w342(movie.poster_path)        // 342px width
image.w185(movie.poster_path)        // 185px width
image.w154(movie.poster_path)        // 154px width
image.w92(movie.poster_path)         // 92px width

// Convenience methods
image.poster(movie.poster_path)      // w500 poster
image.backdrop(movie.backdrop_path)  // w1280 backdrop
image.profile(person.profile_path)   // w185 profile
image.logo(company.logo_path)        // original logo
```

---

## 💡 Examples

### Next.js Server Component

```typescript
// app/movies/page.tsx
import { TMDB, image } from '@abdo/tmdb-api'

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY!
})

export default async function MoviesPage() {
  const { results } = await api.movies.popular()

  return (
    <main>
      <h1>Popular Movies</h1>
      <div className="grid">
        {results.map((movie) => (
          <div key={movie.id}>
            <img
              src={image.poster(movie.poster_path)!}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
```

### Express.js API

```typescript
// server.ts
import express from 'express'
import { TMDB, TMDBError } from '@abdo/tmdb-api'

const app = express()
const api = new TMDB({ apiKey: process.env.TMDB_API_KEY! })

app.get('/api/movies/popular', async (req, res) => {
  try {
    const movies = await api.movies.popular()
    res.json(movies)
  } catch (error) {
    if (error instanceof TMDBError) {
      res.status(error.statusCode).json({ error: error.message })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

### React Component

```typescript
// MovieCard.tsx
import { useEffect, useState } from 'react'
import { TMDB, image } from '@abdo/tmdb-api'
import type { Movie } from '@abdo/tmdb-api'

const api = new TMDB({
  apiKey: process.env.NEXT_PUBLIC_TMDB_API_KEY!
})

export function HorrorMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.movies.horror()
      .then(({ results }) => setMovies(results))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img src={image.w342(movie.poster_path)!} alt={movie.title} />
          <h4>{movie.title}</h4>
        </div>
      ))}
    </div>
  )
}
```

### Advanced Movie Page

```typescript
// MoviePage.tsx
async function getMovieData(movieId: number) {
  const [movie, cast, videos, similar] = await Promise.all([
    api.movies.details(movieId),
    api.movies.cast(movieId),
    api.movies.videos(movieId),
    api.movies.similar(movieId)
  ])

  const trailer = videos.results.find(
    (video) => video.type === 'Trailer'
  )

  return {
    movie,
    cast: cast.cast.slice(0, 10),
    trailer,
    similar: similar.results.slice(0, 6),
    streamUrl: api.player.movie(movieId)
  }
}

// Usage
const data = await getMovieData(550)
console.log(data.movie.title)           // "Fight Club"
console.log(data.trailer?.key)          // YouTube trailer key
console.log(data.streamUrl)             // Embed URL
```

---

## 🛡️ Error Handling

```typescript
import { TMDB, TMDBError } from '@abdo/tmdb-api'

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY!,
  timeout: 5000
})

try {
  const movie = await api.movies.details(550)
  console.log(movie.title)
} catch (error) {
  if (error instanceof TMDBError) {
    // Handle specific errors
    switch (error.statusCode) {
      case 401:
        console.error('Invalid API key')
        break
      case 404:
        console.error('Movie not found')
        break
      case 429:
        console.error('Rate limit exceeded')
        break
      case 408:
        console.error('Request timeout')
        break
      default:
        console.error(`Error: ${error.message}`)
    }
  } else {
    console.error('Unexpected error:', error)
  }
}
```

---

## 🔧 Configuration

```typescript
const api = new TMDB({
  apiKey: 'your_api_key',            // Required
  baseUrl: 'https://api.themoviedb.org/3', // Optional
  timeout: 10000                      // Optional (default: 10000ms)
})
```

| Option | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| `apiKey` | `string` | ✅ Yes | - | Your TMDB API key |
| `baseUrl` | `string` | ❌ No | `https://api.themoviedb.org/3` | TMDB API base URL |
| `timeout` | `number` | ❌ No | `10000` | Request timeout in ms |

---

## 📘 TypeScript

```typescript
import type {
  Movie,
  MovieDetails,
  TVShow,
  TVShowDetails,
  Season,
  Episode,
  Cast,
  Crew,
  Video,
  Image,
  Review,
  Person,
  PaginatedResponse,
  TMDBConfig,
  GenreName,
  ImageSize
} from '@abdo/tmdb-api'

// Full type inference
const movie: MovieDetails = await api.movies.details(550)

// Generic types
const { results, page, total_pages }: PaginatedResponse<Movie> = 
  await api.movies.popular()

// IntelliSense for genre names
const genre: GenreName = 'scienceFiction' // Autocomplete works
```

---

## 🎯 Supported Environments

| Environment | Status |
|-------------|--------|
| Next.js 13+ App Router | ✅ |
| Next.js Pages Router | ✅ |
| Express.js | ✅ |
| Astro | ✅ |
| Remix | ✅ |
| Nuxt 3 | ✅ |
| Vercel Edge Functions | ✅ |
| Vercel Serverless | ✅ |
| Node.js 16+ | ✅ |
| Bun | ✅ |
| Deno | ✅ |

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © [Abdo](https://github.com/abdo)

---

<p align="center">
  <strong>Made with ❤️ for developers building movie & TV websites</strong>
</p>

<p align="center">
  <sub>If you find this useful, please ⭐ the repository!</sub>
</p>
```
