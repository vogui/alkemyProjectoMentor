import { configureStore } from "@reduxjs/toolkit";
import movies from "./slices/movies";
export default configureStore({
  reducer: { 
    movies
   },
});
