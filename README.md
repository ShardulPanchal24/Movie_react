<h1 align="center">🎬 Movie_react</h1>

<p align="center">
  Browse popular movies, search by title, and keep your own <b>Favorites</b> and <b>Watched</b> lists.
</p>

<p align="center">
  <a href="https://movie-react-xi.vercel.app/"><b>🔗 Live Demo</b></a>
</p>

<p align="center">
  <img alt="React 19" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
  <img alt="TMDB" src="https://img.shields.io/badge/Data-TMDB-01B4E4?style=flat-square&logo=themoviedatabase&logoColor=white" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel" />
</p>

---

## Overview

**Movie_react** is a single-page React app that shows the movies currently popular on [The Movie Database (TMDB)](https://www.themoviedb.org/) and lets you build two personal lists:

- **Favorites** ❤️ for the movies you love
- **Watched** 🍿 for the movies you've already seen

Both lists are stored in your browser's `localStorage`, so they're still there after you refresh or come back later. You don't need an account.

The TMDB API key never reaches the browser. Every request goes through a small **Vercel serverless function** (`/api/movies`), which adds the key on the server and forwards the call to TMDB.

## Features

| | Feature | Details |
|---|---|---|
| 🔥 | **Popular movies** | The home page loads TMDB's current popular movies on start. |
| 🔍 | **Search** | Search TMDB's catalog by movie title. |
| ❤️ | **Favorites** | Tap the heart on any poster to add it to Favorites or remove it. |
| 🍿 | **Watched list** | Tap the ticket 🎟️ to mark a movie as watched (it turns into 🍿). |
| 💾 | **Saved locally** | Both lists are kept in `localStorage`, so no sign-up is needed. |
| 🔐 | **Hidden API key** | The key stays in the serverless function and is never bundled into client code. |
| 🧭 | **Client-side routing** | Pages at `/`, `/favorites` and `/watched`, using React Router. |

## Tech Stack

| Layer | Tool |
|---|---|
| UI | [React 19](https://react.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| State | React Context API (`MovieContext`) + `localStorage` |
| Build / Dev server | [Vite 8](https://vite.dev/) with `@vitejs/plugin-react` |
| Linting | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |
| API proxy | Vercel Serverless Function (`api/movies.js`) |
| Data source | [TMDB API v3](https://developer.themoviedb.org/docs) |
| Hosting | [Vercel](https://vercel.com/) |

## How It Works

```
 Browser (React)                     Vercel Function                 TMDB
 ───────────────                     ───────────────                 ────
 getPopularMovies()  ──►  GET /api/movies            ──►  /3/movie/popular
 searchMovies(q)     ──►  GET /api/movies?query=q    ──►  /3/search/movie?query=q
                                  ▲
                         adds TMDB_API_KEY
                         (server-side only)
```

- **`src/services/api.js`** calls `/api/movies`, never TMDB directly.
- **`api/movies.js`** reads `TMDB_API_KEY` from the environment, picks the *popular* or *search* endpoint depending on whether `query` is set, and passes TMDB's response back unchanged.
- **`vite.config.js`** includes a small `local-api` plugin that runs the same handler inside the Vite dev server, so `/api/movies` behaves the same with `npm run dev` as it does on Vercel.
- **`vercel.json`** sends every non-`/api` route to `index.html`, so a refresh on `/favorites` or `/watched` still loads the app.

## Project Structure

```
Movie_react/
├── api/
│   └── movies.js            # Vercel serverless proxy to TMDB (popular + search)
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static images
│   ├── components/
│   │   ├── MovieCard.jsx    # Poster, title, release date, ❤️ and 🎟️ buttons
│   │   └── NavBar.jsx       # Top navigation bar
│   ├── contexts/
│   │   └── MovieContext.jsx # Favorites and Watched state, synced to localStorage
│   ├── css/                 # Per-page and per-component stylesheets
│   ├── pages/
│   │   ├── Home.jsx         # Popular movies + search form
│   │   ├── Favorites.jsx    # Favorites list
│   │   └── Watched.jsx      # Watched list
│   ├── services/
│   │   └── api.js           # getPopularMovies(), searchMovies()
│   ├── App.jsx              # Routes and layout
│   └── main.jsx             # Entry point (BrowserRouter + StrictMode)
├── .oxlintrc.json           # Oxlint rules
├── index.html
├── package.json
├── vercel.json              # SPA rewrites
└── vite.config.js           # Vite config + local /api/movies middleware
```

## Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 8), which comes with npm
- A free **TMDB API key (v3)**. Create a [TMDB account](https://www.themoviedb.org/signup), then open **Settings → API** to get one.

### 1. Clone and install

```bash
git clone https://github.com/ShardulPanchal24/Movie_react.git
cd Movie_react
npm install
```

### 2. Add your API key

Create a `.env` file in the project root:

```env
TMDB_API_KEY=your_tmdb_v3_api_key_here
```

> **Note:** Leave off the `VITE_` prefix. That keeps the key out of the browser bundle. `vite.config.js` loads it only for the local API middleware. `.env` is already in `.gitignore`.

### 3. Run the dev server

```bash
npm run dev
```

Open the URL shown in your terminal (usually <http://localhost:5173>).

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload and the local `/api/movies` proxy |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint the project with Oxlint |

> `npm run preview` serves only the static build, without the `/api` proxy. To test the full production setup locally, use `vercel dev` from the [Vercel CLI](https://vercel.com/docs/cli).

## Deploying to Vercel

1. Push the repo to GitHub and **import it** in the [Vercel dashboard](https://vercel.com/new).
2. Vercel detects **Vite** automatically (build: `npm run build`, output: `dist`).
3. Under **Settings → Environment Variables**, add:
   | Name | Value |
   |---|---|
   | `TMDB_API_KEY` | your TMDB v3 API key |
4. Deploy. Vercel serves `api/movies.js` as a serverless function, and `vercel.json` handles client-side routes.

## Roadmap Ideas

- [ ] Movie details page (overview, rating, cast, trailer)
- [ ] Pagination / infinite scroll for popular and search results
- [ ] Placeholder image for movies without a poster
- [ ] "Clear search" button to return to popular movies
- [ ] Sorting and filtering within Favorites and Watched

## Acknowledgements

- Movie data and images from [TMDB](https://www.themoviedb.org/).
  *This product uses the TMDB API but is not endorsed or certified by TMDB.*
- Bootstrapped with the official [Vite React template](https://vite.dev/guide/).

## Author

**Shardul Panchal** · [@ShardulPanchal24](https://github.com/ShardulPanchal24)

If you find this project useful, consider giving it a ⭐ on GitHub!
