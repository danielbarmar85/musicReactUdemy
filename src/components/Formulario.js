import React, { useState } from "react";

function Formulario({ consultarAPILetra }) {
  const [busqueda, agregarBusqueda] = useState({
    artista: "",
    cancion: ""
  });

  // Funcion para actualizar el state de los inputs.
  const handleChange = e => {
    agregarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  // Funcion para controlar el submit.
  const handleSubmit = e => {
    e.preventDefault();
    // Funcion para pasarselo al componente padre.
    consultarAPILetra(busqueda);
  };

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
            className="col card text-white bg-transparent  mb-5 pt-5 pb-2"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre Artista"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Canción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre Canción"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Formulario;
