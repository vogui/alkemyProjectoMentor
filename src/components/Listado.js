import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';


function Listado (props) {
    let token = sessionStorage.getItem('token');

    console.log(props);

    const [moviesList, setMoviesList] = useState([]);
 
    useEffect(() => {
        const endPoint = "https://api.themoviedb.org/3/discover/movie?api_key=caf4001b55b22901275f7a4989c252eb&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);

                console.log(apiData);
            })
            .catch(error => {
                swAlert(<h2>Hubo errores, intenta más tarde</h2>)
            })
    }, [setMoviesList])

    return (
        <>
            { !token && <Navigate to="/"/> }

            <div className="row">
                {/* ESTRUCTURA BASE */}
                {
                    moviesList.map((oneMovie, idx) => {
                        return(
                            <div className="col-3" key={idx}>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="movie poster"/>
                                    <button className="fovourite-btn" onClick={props.addOrRemoveFromFavs} data-Movie-id={oneMovie.id} >🖤</button>

                                    <div className="card-body">
                                    <h5 className="card-title">{oneMovie.title.substring(0, 40)}...</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0, 400)}...</p>
                                    <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-success">View detail</Link>
                                    </div>                   
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </>
    )
}

export default Listado;