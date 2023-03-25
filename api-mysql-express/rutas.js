const express = require('express');
const routes = express.Router();

//rutas enviadas

//----------------------------------------------------------------
routes.get('/', (req, res) => {
  req.getConnection((err, conexion) => {
    if (err) {
      return res.status(503).send(err);
    } else {
      conexion.query('SELECT * FROM libros', (err, query) => {
        if (err) return res.status(503).send(err);
        else return res.status(200).json(query);
      })
    }
  })
});

//----------------------------------------------------------------
routes.post('/', (req, res) => {

  //parametros a enviar a libros
  const libro = {
    Titulo: req.body.Titulo,
    Autor: req.body.Autor,
    Edicion: req.body.Edicion
  };

  req.getConnection((err, conexion) => {
    if (err) {
      return res.status(503).send(err);
    } else {
      // antes de ingresar un libro verificamos si existe un libro con los mismos valores
      conexion.query('SELECT * FROM libros WHERE Titulo = ? AND Autor = ? AND Edicion = ?', [libro.Titulo, libro.Autor, libro.Edicion], (err, query) => {
        if (err) {
          return res.status(503).send(err);
        } else if (query.length > 0) {
          // si existe algun libro con las caracteristicas que ingresamos en el body, dara por hecho de que existe en la base de datos
          return res.status(400).json({ message: "Este libro ya existe en la base de datos" });
        } else {
          // si no existe un registro con los mismos valores, procede a insertar el nuevo libro
          conexion.query('INSERT INTO libros SET ?', libro, (err, query) => {
            if (err) {
              return res.status(503).send(err);
            } else {
              return res.status(201).json({ message: "Libro agregado!" });
            }
          });
        }
      });
    }
  });
});
//-------------------------------------------------------------------
routes.delete('/:id', (req, res) => {
  // id a eliminar
  const id = req.params.id;

  req.getConnection((err, conexion) => {
    if (err) {
      return res.status(503).send(err);
    } else {
      // verificamos si la id ingresada en la url existe
      conexion.query('SELECT * FROM libros WHERE id = ?', id, (err, query) => {
        if (err) {
          return res.status(503).send(err);
        } else {
          // Si no se encuentra la id, devuelve un mensaje de error
          if (query.length === 0) {
            return res.status(404).json({ message: 'No se puede eliminar un libro que no existe' });
          } else {
            // Si la id existe, elimina el registro
            conexion.query('DELETE FROM libros WHERE id = ?', id, (err, query) => {
              if (err) {
                return res.status(503).send(err);
              } else {
                return res.status(200).json({ message: "Libro eliminado!" });
              }
            });
          }
        }
      });
    }
  });
});

//------------------------------------------------------------------------
routes.put('/:id', (req, res) => {

  // id del libro a actualizar
  const id = req.params.id;
  // objeto a editar
  const libro = {
    Titulo: req.body.Titulo,
    Autor: req.body.Autor,
    Edicion: req.body.Edicion
  };


  req.getConnection((err, conexion) => {
    if (err) {
      return res.status(503).send(err);
    } else {
      // verificamos si la id ingresada en la url existe
      conexion.query('SELECT * FROM libros WHERE id = ?', id, (err, query) => {
        if (err) {
          return res.status(503).send(err);
        } else {
          // Si no se encuentra la id, devuelve un mensaje de error
          if (query.length === 0) {
            return res.status(404).json({ message: 'No se puede editar un libro que no existe' });
          } else {
            // Si la id existe, actualizamos el registro
            conexion.query('UPDATE libros set ? where id = ?', [libro, id], (err, query) => {
              if (err) return res.status(503).send(err);
              else return res.status(200).json({ message: "Libro editado!" });
            });
          }
        }
      });
    }
  });
});


module.exports = routes;