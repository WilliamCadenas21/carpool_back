const Sequelize = require('sequelize');

//new url mysql://babab61ebbf682:a1c9d1de@us-cdbr-iron-east-01.cleardb.net/heroku_025b0710027001d
//new REMOTO
//const sequelize = new Sequelize('mysql://:@/');
const sequelize = new Sequelize('heroku_025b0710027001d', 'babab61ebbf682', 'a1c9d1de', {
  host: 'us-cdbr-iron-east-01.cleardb.net',
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  },
  operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
