const Sequelize = require('sequelize');

//url: mysql://b39610fbae5cd9:208daf58@
//us-cdbr-iron-east-01.cleardb.net/heroku_3885dbc12e8e764?reconnect=true 

//const sequelize = new Sequelize('mysql://b39610fbae5cd9:208daf58@us-cdbr-iron-east-01.cleardb.net/heroku_3885dbc12e8e764');

//LOCAL
// const sequelize = new Sequelize('carpooldb', 'root', null, {
//   dialect: 'mysql',
//   host: "localhost",
//   port: 3306,
// });

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

//new url mysql://babab61ebbf682:a1c9d1de@us-cdbr-iron-east-01.cleardb.net/heroku_025b0710027001d
//REMOTO
const sequelize = new Sequelize('mysql://babab61ebbf682:a1c9d1de@us-cdbr-iron-east-01.cleardb.net/heroku_025b0710027001d');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

// const mysqlConnection = mysql.createConnection({
//   host: 'us-cdbr-iron-east-01.cleardb.net',
//   user: 'b39610fbae5cd9', //Heroku MySql user 
//   password: '208daf58',//si no hay contrasña debe estar en blanco
//   database: 'heroku_3885dbc12e8e764',
//   multipleStatements:true,
// });

// mysqlConnection.connect(function (err) {
//   if (err) {
//     console.error(err);
//     return;
//   } else {
//     console.log('db is connected');
//   }
// });

// const db_config = {
//   host: 'us-cdbr-iron-east-01.cleardb.net',
//   user: 'b39610fbae5cd9', //Heroku MySql user 
//   password: '208daf58',//si no hay contrasña debe estar en blanco
//   database: 'heroku_3885dbc12e8e764',
//   multipleStatements:true,
// }

// function handleDisconnect() {
//   mysqlConnection = mysql.createConnection(db_config); // Recreate the connection, since
//                                                   // the old one cannot be reused.

//   mysqlConnection.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     } else {
//       console.log('db is connected');
//     }                                    // to avoid a hot loop, and to allow our node script to
//   });                                     // process asynchronous requests in the meantime.
//                                           // If you're also serving http, display a 503 error.
//   mysqlConnection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//       handleDisconnect();                         // lost due to either server restart, or a
//     } else {
//      console.log('error is err:', err);                                      // connnection idle timeout (the wait_timeout
//      // throw err;                                  // server variable configures this)
//     }
//   });
// }

// handleDisconnect();


//archivo listo