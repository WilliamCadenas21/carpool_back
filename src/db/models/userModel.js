const Sequelize = require('sequelize');
const sequelize = require('../dataBaseConfig');

// first define the model
const User = sequelize.define('user',
    {
        names: { type: Sequelize.STRING, primaryKey: true },
        lastNames: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,
        emailConfirmed: { type: Sequelize.STRING, defaultValue: false },
        plate: { type: Sequelize.STRING, defaultValue: null },
        age: { type: Sequelize.STRING, defaultValue: null },
        degree: { type: Sequelize.STRING, defaultValue: null },
        semester: { type: Sequelize.STRING, defaultValue: null },
        address: { type: Sequelize.STRING, defaultValue: null },
        neighborhood: { type: Sequelize.STRING, defaultValue: null },
    }, {
        timestamps: false,
    });

module.exports = User;
