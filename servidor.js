

const express = require('express');
const mysql = require('mysql');
const app = express();
const ejs = require('ejs');
const multer = require("multer");
const bodyParser = require('body-parser');
const axios = require('axios');
const indexRouter = require('./index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', indexRouter);

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'joselyn2',
  password: '123',
  database: 'anuario'
});

conexion.connect((error) => {
  if (error) {
    console.error('Error al conectarse a la base de datos: ' + error.stack);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// INICIO DE SESIÓN
app.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('login');
});

// Validación de usuario.
app.post('/login', (req, res) => {
  const correo_electronico = req.body.correo_electronico;
  const contrasena = req.body.contrasena;

  conexion.query(
    `SELECT * FROM alumnos WHERE correo_electronico = ? AND contrasena = ?`,
    [correo_electronico, contrasena],
    (error, resultsAlumnos) => {
      if (error) throw error;
      // Si el usuario está en la tabla de alumnos.
      if (resultsAlumnos.length > 0) {
        // Si está, redirige.
        res.redirect('/inicioalumno');
      } else {
        // Si el usuario está en la tabla de profesores.
        conexion.query(
          `SELECT * FROM administradores WHERE correo_electronico = ? AND contrasena = ?`,
          [correo_electronico, contrasena],
          (error, resultsProfesores) => {
            if (error) throw error;
            // Si está, redirige.
            if (resultsProfesores.length > 0) {
              res.redirect('/inicioadmi');
            } else {
              // Si el usuario no está en ninguna tabla.
              var nohayuser = "El usuario o contraseña son incorrectos.";
              res.send('<script>alert("' + nohayuser + '"); window.location.href="/";</script>');
            }
          }
        );
      }
    }
  );
});

// REGISTRO
app.get('/registrar', (req, res) => {
  res.render('registro');
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

//agregar proyecto para el administrador
app.post('/agregarproyecto', upload.single('foto'), (req, res) => {
  const { nombre_proyecto,detalles_proyecto,autores} = req.body;

  let foto ='';
  if (req.file) {
    foto = req.file.filename;
  }
  const query = 'INSERT INTO proyectos SET ?';
    conexion.query(query, {
        nombre_proyecto: nombre_proyecto,
        detalles_proyecto: detalles_proyecto,
        autores: autores,
        foto:foto
    }, (error, result) => {
        if (error) throw error;
    
        res.redirect('/proyectosadmi');
      });
    });
    //registrarse el alumno o cualquier usuario
app.post("/registrar", upload.single('fotografia'), (req, res) => {
  var num = req.body.num;
  var name = req.body.nombre;
  var correo_electronico = req.body.correo_electronico;
  var contrasena = req.body.contrasena;
  var intereses_academicos = req.body.intereses_academicos;
  var informacion_adicional = req.body.informacion_adicional;
  var habilidades_fortalezas = req.body.habilidades_fortalezas;
  var objetivos_corto_plazo = req.body.objetivos_corto_plazo;
  var objetivos_largo_plazo = req.body.objetivos_largo_plazo;
  var picture =  req.file ? req.file.filename : ''; ;

  // Verificar si el nombre de usuario ya existe
  var sql = 'SELECT * FROM alumnos WHERE nombre = ?';
  conexion.query(sql, [name], function (err, rows) {
    if (err) {
      console.error(err);
      var mensaje = "Ocurrió un error al verificar el nombre de usuario";
      res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
    } else {
      if (rows.length > 0) {
        var mensaje = "El nombre de usuario ya está en uso.";
        res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
      } else {
        // Insertar el registro en la base de datos
        var sql = 'INSERT INTO alumnos(nombre, Num_control, correo_electronico, contrasena, intereses_academicos, habilidades_fortalezas, objetivos_corto_plazo, objetivos_largo_plazo, informacion_adicional, fotografia) VALUES(?,?,?,?,?,?,?,?,?,?)';
        conexion.query(sql, [name, num, correo_electronico, contrasena, intereses_academicos, habilidades_fortalezas, objetivos_corto_plazo, objetivos_largo_plazo,informacion_adicional, picture], function (err, result) {
          if (err) {
            console.error(err);
            var mensaje = "No se pudo insertar el registro";
            res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
          } else {
            if (result.affectedRows > 0) {
              var mensaje = "Registro exitoso";
              res.send('<script>alert("' + mensaje + '"); window.location.href="/";</script>');
            } else {
              var mensaje = "No se pudo insertar el registro";
              res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
            }
          }
        });
      }
    }
  });
})
//agregar alumno administrador
app.post("/addalumno", upload.single('fotografia'), (req, res) => {
  var num = req.body.num;
  var name = req.body.nombre;
  var correo_electronico = req.body.correo_electronico;
  var contrasena = req.body.contrasena;
  var intereses_academicos = req.body.intereses_academicos;
  var informacion_adicional = req.body.informacion_adicional;
  var habilidades_fortalezas = req.body.habilidades_fortalezas;
  var objetivos_corto_plazo = req.body.objetivos_corto_plazo;
  var objetivos_largo_plazo = req.body.objetivos_largo_plazo;
  var picture =  req.file ? req.file.filename : ''; ;

  // Verificar si el nombre de usuario ya existe
  var sql = 'SELECT * FROM alumnos WHERE nombre = ?';
  conexion.query(sql, [name], function (err, rows) {
    if (err) {
      console.error(err);
      var mensaje = "Ocurrió un error al verificar el nombre de usuario";
      res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
    } else {
      if (rows.length > 0) {
        var mensaje = "El nombre de usuario ya está en uso.";
        res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
      } else {
        // Insertar el registro en la base de datos
        var sql = 'INSERT INTO alumnos(nombre, Num_control, correo_electronico, contrasena, intereses_academicos, habilidades_fortalezas, objetivos_corto_plazo, objetivos_largo_plazo, informacion_adicional, fotografia) VALUES(?,?,?,?,?,?,?,?,?,?)';
        conexion.query(sql, [name, num, correo_electronico, contrasena, intereses_academicos, habilidades_fortalezas, objetivos_corto_plazo, objetivos_largo_plazo,informacion_adicional, picture], function (err, result) {
          if (err) {
            console.error(err);
            var mensaje = "No se pudo insertar el registro";
            res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
          } else {
            if (result.affectedRows > 0) {
              var mensaje = "Registro exitoso";
              res.send('<script>alert("' + mensaje + '"); window.location.href="/";</script>');
            } else {
              var mensaje = "No se pudo insertar el registro";
              res.send('<script>alert("' + mensaje + '"); window.location.href="/registro";</script>');
            }
          }
        });
      }
    }
  });
})
//modificar alumno
app.get('/modificaralum', (req, res) => {
  const alumnoId = req.query.num; // Obtener el número de control del alumno de la consulta

  // Obtener el alumno de la base de datos usando el número de control
  conexion.query('SELECT * FROM alumnos WHERE Num_control = ?', [alumnoId], (err, result) => {
    if (err) throw err;

    const alumno = result[0];
    res.render('modificar-alumn', { alumno }); // Renderizar la vista de modificación del alumno con los datos obtenidos
  });
});
//agregar nuevo proyecto por parte del alumno
app.post('/newproyect', upload.single('foto'), (req, res) => {
  const { nombre_proyecto,detalles_proyecto,autores} = req.body;
  let foto ='';
  if (req.file) {
    foto = req.file.filename;
  }
  const query = 'INSERT INTO proyectos SET ?';
    conexion.query(query, {
        nombre_proyecto: nombre_proyecto,
        detalles_proyecto: detalles_proyecto,
        autores: autores,
        foto:foto
    }, (error, result) => {
        if (error) throw error;
    
        res.redirect('proyectos');
      });
    });
//ruta de proyectos admi y hace una consulta a la tabla de proyectos
app.get('/proyectosadmi', function (req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('proyectosadmi', { proyectos: [] }); // Renderiza la plantilla de proyectos con un arreglo vacío si hay error
    } else {
      res.render('proyectosadmi', { proyectos: rows }); // Renderiza la plantilla de proyectos con los datos obtenidos de la base de datos
    }
  });
});

// PÁGINA PARA MOSTRAR ALUMNOS
app.get('/alumnos', (req, res) => {
  const query = 'SELECT * FROM alumnos';

  conexion.query(query, (error, rows) => {
    if (error) {
      console.log(error);
      res.render('alumnos', { alumnos: [] }); // Renderiza la plantilla de inicioadmi con un arreglo vacío si hay error
    } else {
      res.render('alumnos', { alumnos: rows }); // Renderiza la plantilla de inicioadmi con los datos obtenidos de la base de datos
    }
  });

  res.render('alumnos');
});

// PÁGINA PRINCIPAL ALUMNOS
app.get('/inicioalumno', (req, res) => {
  res.render('inicioalum');
});

// PÁGINA PRINCIPAL PROFESORES
app.get('/inicioadmi', (req, res) => {
  res.render('inicioadmi');
});
//BÚSQUEDA
//alumnos
app.get('/', (req,res)=>{
  res.render('resultadosalum');
});
//SECCION PROYECTOS
app.get('/', (req,res)=>{
  res.render('proyectos');
});

//RESULTADOS DE BUSQUEDA DE ADMINISTRADORES
app.get('/', (req,res)=>{
  res.render('resultadosadmi');
});
//ADMINISTRACIÓN DE ALUMNOS
app.get('/', (req,res)=>{
  res.render('alumnosadmi');
});


// Eliminar un usuario.
app.post('/eliminaruser', (req, res) => {
  const num = req.body.num;
  console.log(num);
  
  // Eliminación del registro de la tabla correspondiente  por parte del admi
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
// Eliminar un proyecto
app.post('/eliminarproyecto', (req, res) => {
  const id = req.body.id;
  console.log(id);
  
  // Eliminación del registro de la tabla correspondiente
  const query = `DELETE FROM proyectos WHERE id = ?`;
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al eliminar el proyecto');
    } else {
      console.log('Proyecto eliminado correctamente');
      var mensajeeliminar = "Se ha eliminado al alumno.";
      res.send('<script>alert("' + mensajeeliminar + '"); window.location.href="/proyectosadmi";</script>');
    }
  });
});

app.get('/addalumno', function (req, res, next) {
  conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('agregaralumno', { alumnos: [] }); // Renderiza la plantilla de proyectos con un arreglo vacío si hay error
    } else {
      res.render('agregaralumno', { alumnos: rows }); // Renderiza la plantilla de proyectos con los datos obtenidos de la base de datos
    }
  });
});
app.get('/agregarproyecto', function (req, res, next) {
  conexion.query('SELECT * FROM proyectos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('proyectosadmi', { proyectos: [] }); // Renderiza la plantilla de proyectos con un arreglo vacío si hay error
    } else {
      res.render('proyectosadmi', { proyectos: rows }); // Renderiza la plantilla de proyectos con los datos obtenidos de la base de datos
    }
  });
});
app.get('/modificaralum', function (req, res, next) {
  conexion.query('SELECT * FROM alumnos', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.render('modificaralum', { alumnos: [] }); // Renderiza la plantilla de proyectos con un arreglo vacío si hay error
    } else {
      res.render('modificaralum', { alumnos: rows }); // Renderiza la plantilla de proyectos con los datos obtenidos de la base de datos
    }
  });
});



module.exports = conexion;
app.use(express.static(__dirname + '/'));


app.listen(5000, function () {
  console.log('servidor en linea');
});
