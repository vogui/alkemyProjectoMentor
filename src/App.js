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



  return (
    <>
      <Header />

      <div className='container mt-3'>
        <Routes >
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={ <Listado/>} />
          <Route path="/detalle/:id" element={<Detalle/>} />
          <Route path="/resultados" element={<Resultados/>} />
          <Route path="/favoritos" element={<Favoritos/>} />
        </Routes>
      </div>

      <Footer />
    </>

  );
}

export default App;
