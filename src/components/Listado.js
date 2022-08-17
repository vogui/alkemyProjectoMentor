import React from 'react';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetMovies }from '../redux/store/slices/movies'


function Listado (props) {
    let token = sessionStorage.getItem('token');
    
    const dispatch = useDispatch()
    const {moviesList} = useSelector(state => state.movies)
    const state = useSelector(state => state)
    console.log({moviesList, state})

    useEffect(()=>{dispatch(fetchGetMovies())},[dispatch])
 
    
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
                                    <button className="fovourite-btn" onClick={props.addOrRemoveFromFavs} data-movie-id={oneMovie.id} >🖤</button>

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