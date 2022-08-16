import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppStore } from '../context/AppContext';
import axios from 'axios';

function Detalle () {
    
    const { id } = useParams()

    const { token }= useAppStore()

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=caf4001b55b22901275f7a4989c252eb&language=es-ES`        

        axios.get(endPoint).then(response => {
            const movieData = response.data;
            setMovie(movieData);
        })
        .catch(error => {
            console.log(error)
        })
    }, [id])

    return(
        <>
            { !token && <Navigate to="/" /> }
            { !movie && <p>Cargando... </p> }
            { movie &&
                <>
                    <h2>Titulo: {movie.title}</h2>
                    <div className="row">
                        <div className="col-4">
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster"/>
                        </div>
                        <div className="col-8">
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Ratin: {movie.vote_average}</h5>
                            <h5>Genero:</h5>
                            <ul>
                                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                            </ul>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Detalle;
