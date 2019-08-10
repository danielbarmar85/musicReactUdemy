import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Informacion from "./components/Informacion";

function App() {
  // Controlar el state.
  const [artista, guardarArtista] = useState("");
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo] = useState({});

  // Metodo para consultar la API de canciones.
  const consultarAPILetra = async busqueda => {
    const { artista, cancion } = busqueda;
    const apiKey = "xxxxxx";
    const cors = "https://cors-anywhere.herokuapp.com/";
    const url = "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get";
    const urlLyric = `${cors}${url}?q_track=${cancion}&q_artist=${artista}&apikey=${apiKey}`;

    // Consultar la API.
    const resultado = await axios(urlLyric);

    if (resultado.data.message.body.lyrics) {
      // Almacenar el artista que se busco.
      guardarArtista(artista);

      const lyrics = resultado.data.message.body.lyrics.lyrics_body;
      // Almacenar letra.
      guardarLetra(lyrics);
    } else {
      guardarLetra('');
      guardarArtista('');
    }
  };

  // Metodo para consultar la API de información
  const consultarAPIInfo = async () => {
    if (artista) {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);
      guardarInfo(resultado.data.artists[0]);
    }
  };

  useEffect(() => {
    consultarAPIInfo();
  }, [artista]);

  return (
    <Fragment>
      <Formulario consultarAPILetra={consultarAPILetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
