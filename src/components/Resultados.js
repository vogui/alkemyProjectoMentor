import React from "react";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useAppStore } from '../context/AppContext'

function Resultados () {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const {addOrRemoveFromFavs, moviesResults, setMoviesResults } = useAppStore()

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=caf4001b55b22901275f7a4989c252eb&language=es-ES&query=${keyword}`        
       
        axios.get(endPoint).then(response => {
            const moviesArray = response.data.results;

            if (moviesArray.length === 0) {
                swAlert(<h4>Tu búsqueda no arrojó resultados</h4>)
            }
            
            setMoviesResults(moviesArray);
        })
        .catch(error => console.log(error))
    }, [keyword]);

    return (
        <>
            {/* {AGREGAR TOKEN PARA EVITAR QUE INGRESE SI NO ESTOY LOGEADO} */}
            <h2>Buscaste: <em>{keyword}</em> </h2>
            {moviesResults.length === 0 && <h3>No hay resultados</h3>}
            <div className="row">
                { moviesResults && 
                    moviesResults.map((oneMovie, idx) => {
                        return(
                            <div className="col-4" key={idx}>
                                <div className="card my-4">
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="movie poster"/>
                                    <button className="fovourite-btn" onClick={()=>addOrRemoveFromFavs(oneMovie)} data-movie-id={oneMovie.id} >🖤</button>
                                    
                                    <div className="card-body">
                                    <h5 className="card-title">{oneMovie.title.substring(0, 40)}...</h5>
                                    {/* <p className="card-text">{oneMovie.overview.substring(0, 400)}...</p> */}
                                    <Link to={`/detalle/${oneMovie.id}`} className="btn btn-success">View detail</Link>
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

export default Resultados;

