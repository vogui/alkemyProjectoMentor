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
  },
});

export const { moviesL } = moviesSlice.actions;

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

