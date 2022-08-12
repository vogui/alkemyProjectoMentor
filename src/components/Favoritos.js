import React from "react";
import { Link, Navigate } from 'react-router-dom';

function Favoritos(props) {

    let token = sessionStorage.getItem('token');

    /* const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');

        if (favsInLocal !== null) {
            const favsArray = JSON.parse(favsInLocal);
            console.log(favsArray);
            setFavorites(favsArray);
        }
    }, []); */



    return (
        <>
            { !token && <Navigate to="/" /> }
            <h2>Sección de Favoritos</h2>

            <div className="row">
                { !props.favorites.length && <div className="col-12 text-danger">No tienes nada en favoritos</div>}
                {
                    props.favorites.map((oneMovie, idx) => {
                        return(
                            <div className="col-3" key={idx}>
                                <div className="card my-4">
                                    <img src={oneMovie.imgURL} className="card-img-top" alt="movie poster"/>
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

export default Favoritos;