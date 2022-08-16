import React from "react";
import { useAppStore } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

function Buscador() {
    
  const history = useNavigate();

  const { submitHandler } = useAppStore();

  return (
    <form className="d-flex align-items-center" onSubmit={e => submitHandler(e ,history)}>
      <label className="form-label mb-0 mx-2">
        <input
          className="form-control"
          type="text"
          name="keyword"
          placeholder="Escribe una palabra clave..."
        />
      </label>

      <button className="btn btn-success" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default Buscador;
