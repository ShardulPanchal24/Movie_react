import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movie}){
    
    const {isFavorite, addToFavorites, removeFromFavorites, isWatched, addToWatched, removeFromWatched} = useMovieContext()

    const favorite = isFavorite(movie.id)

    const watched = isWatched(movie.id)


    // Favorite Button Function
    function onFavoriteClick(e){
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    // Watched Button Funciton
    function onWatchedClick(e){
        e.preventDefault()
        if (watched) removeFromWatched(movie.id)
        else addToWatched(movie)
    }
    

    return(
        <div className="movie-card">

            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className = "movie-overlay">

                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>

                     {favorite ? "❤️" : "🤍"}

                    </button>

                    <button className={`watched-btn ${watched ? "active" : ""}`} onClick={onWatchedClick}>
                        {watched ? "🍿" : " 🎟️"}
                    </button>
                </div>
            </div>

        <div className="movie-info">
            <h3>{movie.title}</h3>

            <p>{movie.release_date}</p>
        </div>

        </div>
    );
}

export default MovieCard