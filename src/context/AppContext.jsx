import { createContext, useState, useContext } from "react";
import swAlert from '@sweetalert/with-react';

export const AppContext = createContext();

export const useAppStore = () => useContext(AppContext);

export const AppStoreProvider = ({ children }) => {

  
  const [moviesList, setMoviesList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [moviesResults, setMoviesResults] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  const addOrRemoveFromFav = (movie) => {
    console.log({ movie });
    const favMovies = localStorage.getItem("favs");

    let tempMoviesInFavs;

    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    const movieData = {
      imgURL:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`, 
      title : movie.title, 
      overview : movie.overview,
      id: movie.id
    }

    let movieIsInArray = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    });

    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs));  
      setFavList(tempMoviesInFavs);
      swAlert("Se agregó la pelicula a favoritos","success"); 
    }else{
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
        return oneMovie.id !== movieData.id
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavList(moviesLeft);
      swAlert("Se eliminó la pelicula a favoritos","success");
    }
  };

  const submitHandler = (e, history) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    
    if (keyword.length === 0) {
        swAlert(<h5>Tienes que escribir una palabra clave</h5>);
    } else if (keyword.length < 4) {
        swAlert(<h5>Tienes que escribir más de 4 caracteres</h5>);
    } else {
        e.currentTarget.keyword.value = '';
        history(`/resultados?keyword=${keyword}`);
    }
}

  return (
    <AppContext.Provider
      value={{
        moviesList,
        favList,
        token,
        moviesResults,
        setMoviesResults,
        setToken,
        setMoviesList,
        setFavList,
        addOrRemoveFromFav,
        submitHandler
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
