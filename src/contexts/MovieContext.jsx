import { createContext, useState, useContext ,useEffect, use } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {

    //Favorites State
    const [favorites, setFavorites] = useState(() =>
        JSON.parse(localStorage.getItem("favorites")) || [])
    

    //Watched State

    const [watched, setWatched] = useState(() => 
    JSON.parse(localStorage.getItem("watched")) || [])


    //Save list whenever it changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched))
    }, [watched])

    //favorites.....

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])

    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }


    //Watched.....

    const addToWatched = (movie) => {
        setWatched(prev => [...prev, movie])

    }

    const removeFromWatched = (movieId) => {
        setWatched(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isWatched = (movieId) => {
        return watched.some(movie => movie.id === movieId)
    }


    //.................

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        watched,
        addToWatched,
        removeFromWatched,
        isWatched
    }

    return <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
}