var express = require('express');
var app = express();
var cors = require('cors');
var { conectar } = require('./db');  // Conexión a la base de datos



app.use(express.json());
app.use(cors());

// Obtener la conexión a la base de datos
var db = conectar(); // Llama a conectar y guarda la conexión

// Ruta de registro
app.post('/registro', (req, res) => {
  const { nombre, apellido, correo, contrasenia } = req.body;
  // Aquí deberías agregar la lógica para guardar el usuario en la base de datos
  db.query('INSERT INTO usuarios (nombre, apellido, correo_electronico, contrasenia) VALUES (?, ?, ?, ?)', [nombre, apellido, correo, contrasenia], (err, result) => {
    if (err) {
      return res.status(500).send('Error al registrar el usuario');
    }
      res.status(201).json({ message: 'Usuario registrado' });
  });
});

app.post('/iniciarSesion', (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ mensaje: 'Debes enviar correo y contraseña' });
  }

  // Asegúrate de que la consulta esté correctamente estructurada
  db.query('SELECT * FROM usuarios WHERE correo_electronico = ?', [correo], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = results[0];

    // Aquí deberías comparar la contraseña hasheada con bcrypt
    if (usuario.contrasenia !== contrasenia) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo_electronico
      }
    });
  });
});



// Iniciar el servidor
app.listen( process.env.PORT || 3000, () => {
    console.log('escuchando el puerto');
})
