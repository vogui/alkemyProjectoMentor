import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import  { useAppStore } from '../context/AppContext'


function Listado (props) {
    
    const {token, moviesList,  addOrRemoveFromFav} = useAppStore()

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
                                    <button className="fovourite-btn" onClick={(e) =>addOrRemoveFromFav(oneMovie)} data-movie-id={oneMovie.id} >🖤</button>

                                    <div className="card-body">
                                    <h5 className="card-title">{oneMovie.title.substring(0, 40)}...</h5>
                                    <p className="card-text">{oneMovie.overview.substring(0, 400)}...</p>
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

export default Listado;