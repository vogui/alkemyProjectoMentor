//Libraries
import {Routes, Route} from 'react-router-dom';
import { useEffect, useState} from 'react';
import swAlert from '@sweetalert/with-react';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './css/App.css';
import './css/bootstrap.min.css'

function App() {

  const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');

        if (favsInLocal !== null) {
            const favsArray = JSON.parse(favsInLocal);
            setFavorites(favsArray);
        }
    }, []);

  const addOrRemoveFromFavs = e => {
    const favMovies = localStorage.getItem('favs');

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    }else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));  
      setFavorites(tempMoviesInFavs);
      swAlert("Se agregó la pelicula a favoritos","success"); 
    }else{
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      swAlert("Se eliminó la pelicula a favoritos","success");
    }
  }

  return (
    <>
      <Header favorites={favorites} />

      <div className='container mt-3'>
        <Routes >
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={ <Listado addOrRemoveFromFavs = {addOrRemoveFromFavs} />} />
          <Route path="/detalle" element={<Detalle/>} />
          <Route path="/resultados" element={<Resultados favorites={favorites} addOrRemoveFromFavs = {addOrRemoveFromFavs} />} />
          <Route path="/favoritos" element={<Favoritos favorites={favorites} addOrRemoveFromFavs = {addOrRemoveFromFavs}/>} />
        </Routes>
      </div>

      <Footer />
    </>

  );
}

export default App;
