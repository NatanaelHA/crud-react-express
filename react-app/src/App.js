import React from 'react';
import Navbar from './componentes/Navbar'
import { Fragment, useState, useEffect } from 'react';
import Listalibros from './componentes/listaLibros';
import Formulario from './componentes/formulario';
import GET from './peticiones/GET';

function App() {

  // useState que envia datos desde componente "formulario" a la api, y tambien para editar campos en "Listalibros"
  const [enviar, setEnviar] = useState({
    Titulo: "",
    Autor: "",
    Edicion: 0,
  });

  // useState en donde los datos vienen de la api, y se muestran en componente "Listalibros"
  const [libros, setLibros] = useState([]);

  // useState para actualizar los libros si se detecta en el componente "Listarlibros"
  const [actualizar, setActualizar] = useState(false);

  // useEffect para manejar los datos ingresados y tambien el actualizar al eliminar libros
  useEffect(() => {
    const getLibros = () => {
      GET()
        .then((data) => {
          setLibros(data);
        })
    }
    getLibros();
    // no actualizamos si estamos listando libros
    setActualizar(false);

    // si se envia un parametro "true" desde el componente "Listalibros", actualizamos
  }, [actualizar])

  return (
    <Fragment>
      <Navbar marca='APP LIBRERIA' />

      <div className='container'>
        <div className='row'>
          <div className='col-7 pt-3'>
            <h2 style={{ textAlign: 'center' }}>Lista de libros</h2>
            <Listalibros enviar = {enviar} libros={libros} setActualizar={setActualizar} setEnviar= {setEnviar} />
          </div>
          <div className='col-5 pt-3'>
            <h2 style={{ textAlign: 'center' }}>Formulario de libros</h2>
            <Formulario enviar = {enviar} setEnviar= {setEnviar} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
