export default async function handler(req, res) {
    const { query } = req.query;
    const key = process.env.TMDB_API_KEY;

    const url = query
        ? `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(query)}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${key}`;

    const response = await fetch(url);
    res.status(response.status).json(await response.json());
}
