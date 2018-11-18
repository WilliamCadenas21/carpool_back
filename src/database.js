const Sequelize = require('sequelize');

//url: mysql://b39610fbae5cd9:208daf58@us-cdbr-iron-east-01.cleardb.net/heroku_3885dbc12e8e764?reconnect=true 
//const sequelize = new Sequelize('mysql://b39610fbae5cd9:208daf58@us-cdbr-iron-east-01.cleardb.net/heroku_3885dbc12e8e764');

//new url mysql://babab61ebbf682:a1c9d1de@us-cdbr-iron-east-01.cleardb.net/heroku_025b0710027001d
//new REMOTO
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
