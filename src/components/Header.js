import React from 'react';
import { Link } from 'react-router-dom';

//components
import Buscador from './Buscador';

function Header () {
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
                            <Link to="/Listado" className="navbar-brand text-light">Listado</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/Detalle" className="navbar-brand text-light">Detalle</Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/Resultados" className="navbar-brand text-light">Resultados</Link>
                        </li>

                    </ul>
                </div>
                <Buscador/>
            </nav>    
        </header>
    )
}

export default Header; 