import React from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppStore }from '../context/AppContext'

function Login() {

   const {token, setToken, setMoviesList} = useAppStore()

    const history = useNavigate();

    const submitHandler = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password =e.target.password.value;

    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(email === '' || password === ''){
        swAlert(<h2>Los campos no pueden estar vacios</h2>);
        return;
    }

    if (email !== '' && !regexEmail.test(email)) {
        swAlert(<h2>Debes escribir una dirección de correo eléctronica válida</h2>);
        return; 
    }

    if (email !== 'challenge@alkemy.org' || password !== 'react') {
        swAlert(<h2>Credenciales inválidas</h2>);
        return;
    }

    axios
        .post('http://challenge-react.alkemy.org', {email, password})
        .then(res => {
            swAlert(<h2>Perfecto, ingresaste correctamente</h2>)
            const tokenRecibido = res.data.token;
            setToken(tokenRecibido);
            sessionStorage.setItem('token', tokenRecibido);
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
            history("/listado");
        })

}

    return (
        <>
            { token && <Navigate to="/Listado"/> }

            <div className="row">
                <div className="col-6 offset-3">
                    <h2>Formulario de Login</h2>
                    <form onSubmit={submitHandler}>
                        <label className="form-label d-block mt-2">
                            <span>Correo Electrónico:</span> <br/>
                            <input className="form-control" type="text" name="email"/>
                        </label>
                        <br/>
                        <label className="form-label d-block mt-2">
                            <span>Contraseña:</span> <br/>
                            <input className="form-control" type="password" name="password"/>
                        </label>
                        <br/>
                        <button className="btn btn-success mt-2" type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;






