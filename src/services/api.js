export const getPopularMovies = async () => {
    const response = await fetch("/api/movies");

    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);

    const data = await response.json()
    return data.results
};
