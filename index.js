const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require("multer");
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'joselyn2',
    password: '123',
    database: 'anuario'
});

// Configuracion de multer
const upload = multer({
  dest: 'public/imagenes',
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error('Solo se permiten archivos JPG'));
    }
    cb(null, true);
  } // fin del fileFilter
}); // fin del multer

//INICIO DE SESIÓN
router.get('/login', function(req, res, next) {
  conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('login', { rows: null });
    } else {
      res.render('login', { rows: rows });
    }
  });
  conexion.query('SELECT * FROM administradores', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('login', { rows: null });
    } else {
      res.render('login', { rows: rows });
    }
  });
  });
  //REGISTRO
router.get('/registro', function(req, res, next) {
    conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.render('registro', { rows: null });
        } else {
          res.render('registro', { rows: rows });
        }
      });
  });

//PÁGINA PRINCIPAL ALUMNOS
router.get('/inicioalumno', function(req, res, next) {
    res.render('inicioalumno');
  });
// Ruta para mostrar los proyectos

  //SECCION PROYECTOS
//alumnos
router.get('/proyectos', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('proyectos', { proyectos: null });
    } else {
      res.render('proyectos', { proyectos: rows });
    }
  });
});
  //SECCION PROYECTOS
//alumnos
router.get('/newproyect', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('newproyect', { proyectos: null });
    } else {
      res.render('newproyect', { proyectos: rows });
    }
  });
});
//alumnos
router.get('/agregarproyecto', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('agregarproyecto', { proyectos: [] });
    } else {
      res.render('agregarproyecto', { proyectos: rows });
    }
  });
});

router.get('/newproyect', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('newproyect', { proyectos: null });
    } else {
      res.render('newproyect', { proyectos: rows });
    }
  });
});
    // Ruta para mostrar los proyectos
router.get('/proyectosadmi', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('proyectosadmi', { proyectos: null });
    } else {
      res.render('proyectosadmi', { proyectos: rows });
    }
  });
});
  
  //PÁGINA PRINCIPAL ADMINISTRADORES
router.get('/inicioadmi', function(req, res, next) {
    res.render('inicioadmi');
  });

// Ruta para mostrar los proyectos
router.get('/proyectosadmi', function(req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('proyectosadmi', { proyectos: null });
    } else {
      res.render('proyectosadmi', { proyectos: rows });
    }
  });
});

router.post('/buscaralumnos', function(req, res, next) {
  const nombre = req.body.nombre;
  const sql = `SELECT * FROM alumnos WHERE nombre LIKE '%${nombre}%'`;

  conexion.query(sql, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('resultadosadmi', { rows: null });
    } else {
      res.render('resultadosadmi', { rows: rows });
    }
  });
});
  //alumnos
  router.get('/resultadosalum', function(req, res, next) {
    res.render('resultadosalum');
  });
  

//admi
router.get('/resultadosadmi', function(req, res, next) {
  res.render('resultadosadmi');
});
router.post('/buscaralumno', function(req, res, next) {
  const nombre = req.body.nombre;
  const sql = `SELECT * FROM alumnos WHERE nombre LIKE '%${nombre}%'`;

  conexion.query(sql, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('resultadosalum', { rows: null });
    } else {
      res.render('resultadosalum', { rows: rows });
    }
  });
});


//ADMINISTRACIÓN DE ALUMNOS
router.get('/alumnosadmi', function(req, res, next) {
  conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.render('alumnosadmi', { rows: null });
      } else {
        res.render('alumnosadmi', { alumno: rows });
      }
    });
});
//ADMINISTRACIÓN DE ALUMNOS
router.get('/alumnos', function(req, res, next) {
  conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.render('alumnos', { alumnos: null });
      } else {
        res.render('alumnos', { alumnos: rows });
      }
    });
});
router.post('/eliminaruser', (req, res) => {
  const num = req.body.num;
  console.log(num);

  // Eliminación del registro de la tabla correspondiente
  const query = `DELETE FROM alumnos WHERE Num_control = ?`;
  conexion.query(query, [num], (error, resultado) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el registro');
    } else {
      console.log('Registro eliminado correctamente');
      var mensajeeliminar = "Se ha eliminado al alumno.";
      res.send('<script>alert("' + mensajeeliminar + '"); window.location.href="/alumnosadmi";</script>');
    }
  });
});
//eliminar proyecto
router.post('/eliminarproyecto', (req, res) => {
  const id = req.body.id;
  

  // Eliminación del registro de la tabla correspondiente
  const query = `DELETE FROM proyectos WHERE id = ?`;
  conexion.query(query, [id], (error, resultado) => {
    console.log(resultado)
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el proyecto');
    } else {
      console.log('Proyecto eliminado correctamente');
      var mensajeeliminar = "Se ha eliminado el proyecto.";
      res.send('<script>alert("' + mensajeeliminar + '"); window.location.href="/proyectosadmi";</script>');
    }
  });
});

//modificar el alumno
router.get('/modificaralum', (req, res) => {
  const alumnoId = req.query.id; // Obtener el numero de control del alumno de la consulta

  // Obtener el alumno de la base de datos usando el numero de control
  conexion.query('SELECT * FROM alumnos WHERE Num_control = ?', [alumnoId], (err, result) => {
    console.log(result)
    if (err) throw err;

    const alumno = result[0];
    res.render('modificar-alum', { alumno }); // Renderizar la vista de modificación del alumno
  });
});

 router.post('/modificaralum', upload.single('fotografia'), (req, res) => {
   // Obtener los datos del formulario
   var num = req.body.num;
   var name = req.body.nombre;
   var correo_electronico = req.body.correo_electronico;
   var contrasena = req.body.contrasena;
   var intereses_academicos = req.body.intereses_academicos;
   var informacion_adicional = req.body.informacion_adicional;
   var habilidades_fortalezas = req.body.habilidades_fortalezas;
   var objetivos_corto_plazo = req.body.objetivos_corto_plazo;
   var objetivos_largo_plazo = req.body.objetivos_largo_plazo;
   var picture = req.file ? req.file.filename : ''

   const nuevosDatos = {
    nombre: name,
    correo_electronico,
    contrasena,
    intereses_academicos,
    informacion_adicional,
    habilidades_fortalezas,
    objetivos_corto_plazo,
    objetivos_largo_plazo,
    fotografia: picture,
   };


   // Realizar la actualización del alumno en la base de datos
    // conexion.query('UPDATE alumnos SET Num_Control= ?, correo_electronico = ?, contrasena = ?, fotografia = ?, intereses_academicos = ?, habilidades_fortalezas = ?, objetivos_corto_plazo = ?, objetivos_largo_plazo = ? WHERE Num_control = ?', [num,name, correo_electronico, contrasena, picture, intereses_academicos, habilidades_fortalezas, objetivos_corto_plazo, objetivos_largo_plazo,informacion_adicional], (err, result) => {
      const query = 'UPDATE alumnos SET ? WHERE Num_control = ?';
      conexion.query(query, [nuevosDatos, num], (err, result) => {
        if (err) throw err;
        console.log('Actualización exitosa');
        
      // conexion.query('UPDATE alumnos SET nombre = ?, WHERE Num_control = ?', [name, num], (err, result) => {
      if (err) throw err
      res.redirect('/inicioadmi'); // Redirigir a la vista principal después de la modificación
    });
 });

  module.exports = router;