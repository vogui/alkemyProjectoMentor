import { createSlice, createAction } from "@reduxjs/toolkit";
import { endPoint } from "../../../const/constants";
import axios from "axios";
import swAlert from "@sweetalert/with-react";

export const movies = {
setMovies: createAction(`movies/setMovies`)
}

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesList: [],
    favList: [],
  },
  reducers: {
    moviesL: (state, {payload}) => {
      return {...state, moviesList:payload};
    },
    addFav: (state, { payload }) => {
      console.log({payload})
      return {...state, favList:payload};
    }
  },
});

export const { moviesL, addFav } = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchGetMovies = () => (dispatch) => {
  axios
    .get(endPoint)
    .then((response) => {
      const apiData = response.data;
      console.log({apiData})
      dispatch(moviesL(apiData.results));
    })
    .catch((error) => {
      swAlert(<h2>Hubo errores, intenta más tarde</h2>);
    });
};

export const addOrRemoveFromFav = (movie)=> (dispatch) => {
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
    dispatch(addFav(tempMoviesInFavs));
    swAlert("Se agregó la pelicula a favoritos","success"); 
  }else{
    let moviesLeft = tempMoviesInFavs.filter(oneMovie => {
      return oneMovie.id !== movieData.id
    });
    localStorage.setItem('favs', JSON.stringify(moviesLeft));
    dispatch(addFav(moviesLeft));
    swAlert("Se eliminó la pelicula a favoritos","success");
  }
}



