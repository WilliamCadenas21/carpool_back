const mysql = require('mysql');


//url: mysql://b39610fbae5cd9:208daf58@
//us-cdbr-iron-east-01.cleardb.net/heroku_3885dbc12e8e764?reconnect=true 
const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b39610fbae5cd9', //Heroku MySql user 
  password: '208daf58',//si no hay contrasña debe estar en blanco
  database: 'heroku_3885dbc12e8e764',
  multipleStatements:true,
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;
//archivo listo