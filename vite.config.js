import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import moviesHandler from './api/movies.js'

// Runs the Vercel function in api/movies.js during `npm run dev`,
// so /api/movies works locally the same way it does on Vercel.
const localApi = () => ({
  name: 'local-api',
  configureServer(server) {
    server.middlewares.use('/api/movies', (req, res) => {
      const url = new URL(req.url, 'http://localhost')
      req.query = Object.fromEntries(url.searchParams)
      res.status = (code) => { res.statusCode = code; return res }
      res.json = (body) => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(body))
      }
      moviesHandler(req, res)
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load TMDB_API_KEY from .env into process.env for the local API only (not the browser bundle)
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), localApi()],
    resolve: {
      dedupe: ['react', 'react-dom'],
    },
  }
})
