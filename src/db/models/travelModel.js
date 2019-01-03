const Sequelize = require('sequelize');
const sequelize = require('../dataBaseConfig');

// first define the model
const Travel = sequelize.define('travel',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        startingPoint: Sequelize.STRING,
        endPoint: Sequelize.STRING,
        date: Sequelize.STRING,
        seats: { type: Sequelize.INTEGER, defaultValue: 4 },
        state: { type: Sequelize.STRING, defaultValue: 'agendado' },
        emailDriver: Sequelize.STRING,
    }, {
        timestamps: false,
    });

module.exports = Travel;
