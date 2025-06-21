var express = require('express');
var app = express();
var cors = require('cors');
var { conectar } = require('./db');  // Conexión a la base de datos



app.use(express.json());
app.use(cors());

// Obtener la conexión a la base de datos
var db = conectar(); // Llama a conectar y guarda la conexión

// Ruta de registro de usuarios
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

// Ruta de registro de productos
app.post('/registrarproducto', (req, res) => {
  const { nombre, categoria, precio, descripcion, imagen } = req.body;
  // Aquí deberías agregar la lógica para guardar el usuario en la base de datos
  db.query('INSERT INTO productos (nombre, categoria, precio, descripcion, imagen) VALUES (?, ?, ?, ?, ?)', [nombre, categoria, precio, descripcion, imagen], (err, result) => {
    if (err) {
      return res.status(500).send('Error al registrar el producto');
    }
      res.status(201).json({ message: 'Producto registrado' });
  });
});

app.get('/registrarproducto', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
});

// Obtener todos los productos
app.get('/registrarproducto', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);
  });
});

// Obtener un producto por ID
app.get('/registrarproducto/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener el producto');
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
});


// Ruta para actualizar un producto existente
app.put('/registrarproducto/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, precio, descripcion, imagen } = req.body;
  
  // Ejemplo con MySQL (ajusta según tu base de datos)
  db.query(
    'UPDATE productos SET nombre = ?, categoria = ?, precio = ?, descripcion = ?, imagen = ? WHERE id = ?',
    [nombre, categoria, precio, descripcion, imagen, id],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar:', err);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto actualizado correctamente' });
    }
  );
});

app.delete('/registrarproducto/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Verifica si el ID es un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    // Elimina el producto de la base de datos
    db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Verifica si se eliminó algún producto
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto eliminado exitosamente' });
    });
});



// Iniciar el servidor
app.listen( process.env.PORT || 3000, () => {
    console.log('escuchando el puerto');
});
