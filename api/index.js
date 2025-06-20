var express = require('express');
var app = express();
var cors = require('cors');
var { conectar } = require('./db');  // Conexión a la base de datos



app.use(express.json());
app.use(cors());

// Obtener la conexión a la base de datos
var db = conectar(); // Llama a conectar y guarda la conexión

app.get('/prueba/', (req, res) => {
  res.send('API funcionando');
});

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


// Iniciar el servidor
app.listen( process.env.PORT || 3000, () => {
    console.log('escuchando el puerto');
})
