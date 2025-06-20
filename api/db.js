var mysql = require('mysql');

var conexion = mysql.createConnection({
  host: 'mysql.db.mdbgo.com',
  user: 'javi7l_root',
  password: 'Beltran#2025',
  database: 'javi7l_gestionproductos',
  port: 3306
});

function conectar() {
  conexion.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
    } else {
      console.log('Conexión a la base de datos exitosa');
    }
  });
  return conexion; // Devolver la conexión
}

module.exports = { conectar };
