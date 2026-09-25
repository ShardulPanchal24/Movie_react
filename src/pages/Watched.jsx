import "../css/Watched.css"

import { useMovieContext } from "../contexts/MovieContext"

import MovieCard from "../components/MovieCard"


function Watched(){

    const {watched} = useMovieContext();

    if (watched.length > 0) {
        return (

            <div className="watched">
                <h2>Your Watch List</h2>
            <div className="movies-grid">
                {watched.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
            </div>
        );
    }

    return (
        <div className="watching-empty">
            <h2> Add Watched Movies Yet</h2>
            <p>Start adding movies to your Watch List</p>
        </div>
     );
    }


export default Watched