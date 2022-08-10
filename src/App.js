//Libraries
import {Routes, Route} from 'react-router-dom';

//Components
import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Header from './components/Header';
import Footer from './components/Footer';

//Styles
import './css/App.css';
import './css/bootstrap.min.css'


function App() {
  const addOrRemoveFromFavs = e => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    console.log(btn.dataSet);
    const movieData = {
      imgURL, title, overview,
      id: btn.dataSet.movieId
    }
    console.log(movieData);
  }

  return (
    <>
      <Header />

      <div className='container mt-3'>
        <Routes >
          <Route exact path="/" element={<Login/>} />
          <Route path="/listado" element={ <Listado addOrRemoveFromFavs = {addOrRemoveFromFavs} />} />
          <Route path="/detalle" element={<Detalle/>} />
          <Route path="/resultados" element={<Resultados/>} />
        </Routes>
      </div>

      <Footer />
    </>

  );
}

export default App;
