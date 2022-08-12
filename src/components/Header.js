import React from 'react';
import { Link } from 'react-router-dom';

//components
import Buscador from './Buscador';

function Header (props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <Link to="/" className="navbar-brand mb-0 h1 text-light">AlkeFlix</Link>
                        
                        <li className="nav-item">
                            <Link to="/" className="navbar-brand text-light">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/listado" className="navbar-brand text-light">Listado</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/favoritos" className="navbar-brand text-light">Favoritos</Link>
                        </li>

                        <li className="nav-item d-flex align-items-center">
                            <span className="text-success">
                                {props.favorites.length > 0 && <>Peliculas en favoritos: {props.favorites.length}</>}
                            </span>
                        </li>

                        {/* <li className="nav-item">
                            <Link to="/detalle" className="navbar-brand text-light">Detalle</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/resultados" className="navbar-brand text-light">Resultados</Link>
                        </li> */}

                    </ul>
                </div>
                <Buscador/>
            </nav>    
        </header>
    )
}

export default Header; 