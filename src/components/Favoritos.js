import React from "react";
import { useEffect, useState} from 'react';

function Favoritos() {

    const [ favorites, setFavorites ] = useState([]);

    useEffect(() => {
        const favsInLocal = localStorage.getItem('favs');

        if (favsInLocal !== null) {
            const favsArray = JSON.parse(favsInLocal);
            console.log(favsArray);
        }
    }, []);



    return (
        <h2>Sección de Favoritos</h2>
    )
}

export default Favoritos;