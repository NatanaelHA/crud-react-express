import { React } from "react";
import POST from "../peticiones/POST";

const Formulario = ({ enviar, setEnviar }) => {
  /* ---------------------------------------------------------------------------------------------------------- */
  const handleChange = (evento) => {
    // obtenemos los valores escritos en los campos
    setEnviar({
      ...enviar,
      [evento.target.name]: evento.target.value,
    });
  };

  /* ---------------------------------------------------------------------------------------------------------- */
  const handleSubmit = (event) => {
    //event.preventDefault() // para impedir la recarga automatica o redireccion

    // la clave "Edicion" que viene del componente principal, debemos pasarla a entero para evitar errores
    let edicion = parseInt(enviar.Edicion, 10);

    // validamos datos enviados por el formulario
    if (enviar.Titulo === "" || enviar.Autor === "" || edicion <= 0) {
      return alert(" Todos los campos son obligatorios ");
    } else {
      // si esta correcto, registramos los datos de "enviar" en la api
      POST(enviar);
    }
  };

  return (
    // en el campo "name" del input debe ir el mismo nombre que ingresamos en el useState "enviar" en app.js
    // y en cuanto al campo "value" se usaran al actualizar un campo, para limpiar los campos
    <form onSubmit={handleSubmit} className="pt-3">
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">
          Titulo
        </label>
        <input
          value={enviar.Titulo}
          name="Titulo"
          onChange={handleChange}
          type="text"
          id="titulo"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="autor" className="form-label">
          Autor
        </label>
        <input
          value={enviar.Autor}
          name="Autor"
          onChange={handleChange}
          type="text"
          id="Autor"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="edicion" className="form-label">
          Edicion
        </label>
        <input
          value={enviar.Edicion}
          name="Edicion"
          onChange={handleChange}
          type="number"
          id="Edicion"
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Enviar
      </button>
    </form>
  );
};

export default Formulario;
