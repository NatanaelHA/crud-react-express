import { React } from "react";
import DELETE from "../peticiones/DELETE";
import PUT from "../peticiones/PUT.js";

const Listalibros = ({ enviar, libros, setActualizar, setEnviar }) => {

  const handleDelete = (id) => {
    DELETE(id);
    // una vez eliminamos, enviamos "true" como parametro a el componente principal
    setActualizar(true);
  };

  const handleUpdate = (id) => {
    // la clave "Edicion" que viene del componente principal, debemos pasarla a entero para evitar errores
    let edicion = parseInt(enviar.Edicion, 10);

    // validamos datos enviados por el formulario
    if (enviar.Titulo === "" || enviar.Autor === "" || edicion <= 0) {
      return alert(" Todos los campos son obligatorios ");
    } else {
      PUT(id, enviar);
      // una vez eliminamos, enviamos "true" como parametro a el componente principal
      setActualizar(true);
      // limpiamos los campos
      setEnviar({
        Titulo: "",
        Autor: "",
        Edicion: 0,
      });
    }
  };

  return (
    <div className="pt-3">
      <table className="table">
        <thead>
          <tr>
            <th> ID </th>
            <th> TITULO </th>
            <th> AUTOR </th>
            <th> EDICION </th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td> {libro.id} </td>
              <td> {libro.Titulo} </td>
              <td> {libro.Autor} </td>
              <td> {libro.Edicion} </td>
              <td>
                <div className="mb-3">
                  <button onClick={() => handleDelete(libro.id)} className="btn btn-danger">Eliminar</button>
                </div>
                <div className="mb-3">
                  <button onClick={() => handleUpdate(libro.id)} className="btn btn-warning">Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listalibros;

// rafce para autocompletar
