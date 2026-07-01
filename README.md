Here's a beautiful, well-organized README.md for your package:

```markdown
<div align="center">

# 🎬 @abdo/tmdb-api

### The Ultimate TypeScript TMDB API Wrapper

*A professional, type-safe, server-side compatible TMDB API wrapper that helps you build movie and TV show websites with minimal code*

[![npm version](https://img.shields.io/npm/v/@abdo/tmdb-api.svg)](https://www.npmjs.com/package/@abdo/tmdb-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Core Features
- 🎬 **Complete TMDB API** - Movies, TV Shows, Search, Genres & more
- 🎭 **Smart Genre Helpers** - No more memorizing genre IDs
- 🖼️ **Image URL Builder** - Effortless image URL generation
- 🎮 **Streaming URLs** - Generate embed player URLs instantly

</td>
<td width="50%">

### 🚀 Developer Experience
- 🔒 **100% Type-Safe** - Full TypeScript with strict mode
- 🖥️ **Server-First** - Zero browser APIs, perfect for SSR
- ⚡ **Tree Shakeable** - Import only what you need
- 📦 **Dual Format** - CJS & ESM support out of the box

</td>
</tr>
</table>

---

## 📦 Installation

```bash
# npm
npm install @abdo/tmdb-api

# pnpm
pnpm add @abdo/tmdb-api

# yarn
yarn add @abdo/tmdb-api
```

---

## 🔑 Environment Setup

Create a `.env` file in your project root:

```env
TMDB_API_KEY=your_api_key_here
```

> 📌 **Get your API key:** [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

---

## 🚀 Quick Start

```typescript
import { TMDB } from '@abdo/tmdb-api';

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY
});

// 🎥 Fetch popular movies
const { results } = await api.movies.popular();

// 🔍 Search for movies
const { results: searchResults } = await api.search.movie('Inception');

// 🎮 Generate streaming URL
const streamUrl = api.player.movie(27205); // Inception
```

---

## 📚 API Reference

### 🎥 Movies API

<details>
<summary><b>Click to expand all movie methods</b></summary>

```typescript
// 📊 Discover & Browse
await api.movies.popular(page?: number)
await api.movies.trending(timeWindow?: 'day' | 'week')
await api.movies.nowPlaying(page?: number)
await api.movies.upcoming(page?: number)
await api.movies.topRated(page?: number)
await api.movies.latest()

// 📝 Movie Details
await api.movies.details(movieId: number)
await api.movies.cast(movieId: number)
await api.movies.videos(movieId: number)
await api.movies.images(movieId: number)
await api.movies.recommendations(movieId: number)
await api.movies.similar(movieId: number)
await api.movies.reviews(movieId: number)
```
</details>

### 📺 TV Shows API

<details>
<summary><b>Click to expand all TV methods</b></summary>

```typescript
// 📊 Discover & Browse
await api.tv.popular(page?: number)
await api.tv.trending(timeWindow?: 'day' | 'week')
await api.tv.topRated(page?: number)
await api.tv.airingToday(page?: number)
await api.tv.onTheAir(page?: number)

// 📝 TV Details
await api.tv.details(tvId: number)
await api.tv.cast(tvId: number)
await api.tv.videos(tvId: number)
await api.tv.images(tvId: number)
await api.tv.recommendations(tvId: number)
await api.tv.similar(tvId: number)
await api.tv.reviews(tvId: number)

// 🎬 Seasons & Episodes
await api.tv.seasonDetails(tvId: number, seasonNumber: number)
await api.tv.episodeDetails(tvId: number, seasonNumber: number, episodeNumber: number)
```
</details>

### 🎭 Genre Helpers

All genre methods **automatically exclude documentaries** and return only relevant movies:

```typescript
await api.movies.action()          // 💥 Action
await api.movies.adventure()       // 🗺️ Adventure
await api.movies.animation()       // 🎨 Animation
await api.movies.comedy()          // 😂 Comedy
await api.movies.crime()           // 🕵️ Crime
await api.movies.drama()           // 🎭 Drama
await api.movies.family()          // 👨‍👩‍👧‍👦 Family
await api.movies.fantasy()         // 🧙 Fantasy
await api.movies.history()         // 📜 History
await api.movies.horror()          // 👻 Horror
await api.movies.music()           // 🎵 Music
await api.movies.mystery()         // 🔍 Mystery
await api.movies.romance()         // 💕 Romance
await api.movies.scienceFiction()  // 🚀 Sci-Fi
await api.movies.thriller()        // 😱 Thriller
await api.movies.war()             // ⚔️ War
await api.movies.western()         // 🤠 Western

// 🎯 Convenience aliases
await api.movies.cartoon()         // Same as animation()
await api.movies.kids()            // Same as family()
```

### 🔍 Search API

```typescript
// Search movies
const { results: movies } = await api.search.movie('The Matrix')

// Search TV shows
const { results: shows } = await api.search.tv('Breaking Bad')

// Multi-search (movies + TV + people)
const { results: all } = await api.search.multi('Avatar')

// Search people
const { results: people } = await api.search.person('Tom Hanks')
```

### 🎮 Player URLs

```typescript
// 🎥 Movie streaming URL
const movieUrl = api.player.movie(609681)
// → https://www.2embed.cc/embed/609681

// 📺 TV show episode streaming URL
const tvUrl = api.player.tv(60735, 1, 1)
// → https://www.2embed.cc/embedtv/60735&s=1&e=1
```

### 🖼️ Image Helpers

```typescript
import { image } from '@abdo/tmdb-api'

// Different sizes
image.original(path)   // Original size
image.w1280(path)      // 1280px width
image.w780(path)       // 780px width
image.w500(path)       // 500px width
image.w342(path)       // 342px width
image.w185(path)       // 185px width
image.w154(path)       // 154px width
image.w92(path)        // 92px width

// Convenience methods
image.poster(path)     // w500 poster
image.backdrop(path)   // w1280 backdrop
image.profile(path)    // w185 profile
image.logo(path)       // original logo
```

---

## 💡 Examples

### React Server Component (Next.js App Router)

```tsx
import { TMDB, image } from '@abdo/tmdb-api'

const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY!
})

export default async function MovieGrid() {
  const { results } = await api.movies.popular()
  
  return (
    <div className="grid grid-cols-4 gap-4">
      {results.map(movie => (
        <div key={movie.id} className="group">
          <img 
            src={image.poster(movie.poster_path)!} 
            alt={movie.title}
            className="rounded-lg shadow-lg transition-transform group-hover:scale-105"
          />
          <h3 className="mt-2 font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-600">⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
      ))}
    </div>
  )
}
```

### Express.js API Route

```typescript
import express from 'express'
import { TMDB, TMDBError } from '@abdo/tmdb-api'

const app = express()
const api = new TMDB({ apiKey: process.env.TMDB_API_KEY! })

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await api.movies.details(Number(req.params.id))
    res.json({ success: true, data: movie })
  } catch (error) {
    if (error instanceof TMDBError) {
      return res.status(error.statusCode).json({ 
        success: false, 
        error: error.message 
      })
    }
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
})

app.listen(3000, () => console.log('🚀 Server running on port 3000'))
```

### Building a Movie Page

```typescript
async function getMoviePage(movieId: number) {
  const [
    movie,
    cast,
    videos,
    similar,
    recommendations
  ] = await Promise.all([
    api.movies.details(movieId),
    api.movies.cast(movieId),
    api.movies.videos(movieId),
    api.movies.similar(movieId),
    api.movies.recommendations(movieId)
  ])

  return {
    movie,
    cast: cast.cast.slice(0, 10),
    trailer: videos.results.find(v => v.type === 'Trailer'),
    similar: similar.results.slice(0, 6),
    recommendations: recommendations.results.slice(0, 6),
    streamUrl: api.player.movie(movieId)
  }
}
```

### Genre-Based Discovery Page

```typescript
async function getGenrePage(genre: string, page = 1) {
  const genreMap = {
    action: () => api.movies.action(page),
    comedy: () => api.movies.comedy(page),
    horror: () => api.movies.horror(page),
    scifi: () => api.movies.scienceFiction(page),
    romance: () => api.movies.romance(page),
  }

  const fetcher = genreMap[genre as keyof typeof genreMap]
  if (!fetcher) throw new Error(`Unknown genre: ${genre}`)

  const { results, total_pages } = await fetcher()
  
  return {
    movies: results,
    hasMore: page < total_pages,
    nextPage: page + 1
  }
}
```

---

## 🛡️ Error Handling

```typescript
import { TMDB, TMDBError } from '@abdo/tmdb-api'

const api = new TMDB({ 
  apiKey: process.env.TMDB_API_KEY!,
  timeout: 5000 // 5 second timeout
})

try {
  const movie = await api.movies.details(999999)
} catch (error) {
  if (error instanceof TMDBError) {
    switch (error.statusCode) {
      case 401:
        console.error('❌ Invalid API key')
        break
      case 404:
        console.error('🔍 Movie not found')
        break
      case 429:
        console.error('⏳ Rate limit exceeded - wait before retrying')
        break
      case 408:
        console.error('⏰ Request timed out')
        break
      default:
        console.error(`❌ Error ${error.statusCode}: ${error.message}`)
    }
  }
}
```

---

## 🎯 Supported Environments

| Environment | Status | Notes |
|------------|--------|-------|
| **Next.js App Router** | ✅ | Perfect for Server Components |
| **Next.js Pages Router** | ✅ | `getServerSideProps` / `getStaticProps` |
| **Express.js** | ✅ | Full server-side support |
| **Astro** | ✅ | Works in `.astro` and endpoints |
| **Remix** | ✅ | Loader functions & actions |
| **Nuxt 3** | ✅ | Server routes & API endpoints |
| **Vercel Functions** | ✅ | Edge & Serverless |
| **Node.js** | ✅ | v16+ supported |

---

## 📖 TypeScript Support

```typescript
import type { 
  Movie, 
  MovieDetails, 
  TVShow, 
  TVShowDetails,
  Cast, 
  PaginatedResponse,
  TMDBConfig 
} from '@abdo/tmdb-api'

// Full IntelliSense support
const movie: MovieDetails = await api.movies.details(550)

// All responses are fully typed
const { results, page, total_pages }: PaginatedResponse<Movie> = 
  await api.movies.popular()
```

---

## 🔧 Configuration

```typescript
const api = new TMDB({
  apiKey: process.env.TMDB_API_KEY!,  // Required
  baseUrl: 'https://api.themoviedb.org/3', // Optional (default)
  timeout: 10000 // Optional (default: 10000ms)
})
```

---

## 📊 Complete Method Reference

<details>
<summary><b>All Available Methods (Click to expand)</b></summary>

### Movies
| Method | Description |
|--------|-------------|
| `movies.popular(page?)` | Popular movies |
| `movies.trending(window?)` | Trending movies (day/week) |
| `movies.nowPlaying(page?)` | Now playing in theaters |
| `movies.upcoming(page?)` | Upcoming releases |
| `movies.topRated(page?)` | Top rated movies |
| `movies.latest()` | Latest added movie |
| `movies.details(id)` | Full movie details |
| `movies.cast(id)` | Movie cast & crew |
| `movies.videos(id)` | Trailers & videos |
| `movies.images(id)` | Posters & backdrops |
| `movies.recommendations(id)` | Recommended movies |
| `movies.similar(id)` | Similar movies |
| `movies.reviews(id)` | User reviews |

### TV Shows
| Method | Description |
|--------|-------------|
| `tv.popular(page?)` | Popular TV shows |
| `tv.trending(window?)` | Trending TV shows |
| `tv.topRated(page?)` | Top rated TV shows |
| `tv.airingToday(page?)` | Airing today |
| `tv.onTheAir(page?)` | Currently on air |
| `tv.details(id)` | Full TV show details |
| `tv.cast(id)` | TV show cast |
| `tv.videos(id)` | Trailers & videos |
| `tv.images(id)` | Posters & backdrops |
| `tv.recommendations(id)` | Recommended shows |
| `tv.similar(id)` | Similar shows |
| `tv.reviews(id)` | User reviews |
| `tv.seasonDetails(id, season)` | Season details |
| `tv.episodeDetails(id, season, episode)` | Episode details |

### Search
| Method | Description |
|--------|-------------|
| `search.movie(query, page?)` | Search movies |
| `search.tv(query, page?)` | Search TV shows |
| `search.multi(query, page?)` | Multi-search |
| `search.person(query, page?)` | Search people |

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

MIT © [Abdo](https://github.com/abdo)

---

## ⭐ Support

If you find this package useful, please consider giving it a star on GitHub! It helps others discover the project.

---

<div align="center">

### Built with ❤️ for the developer community

*Made for building amazing movie & TV show websites*

</div>
```

This README features:
- 🎨 Beautiful formatting with emojis and tables
- 📚 Well-organized sections with clear hierarchy
- 💡 Comprehensive examples for different use cases
- 🔍 Easy-to-navigate API reference
- 🚀 Framework-specific examples
- ⚡ Professional badges and styling
- 📖 Clear, readable structure
- 🎯 All features highlighted prominently