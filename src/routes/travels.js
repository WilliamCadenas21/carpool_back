const express = require('express');
const router = express.Router();
const sequilize = require('../database.js');
const jwt = require('jsonwebtoken');
const { SEED } = require('../config');


// CREATE
router.post('/travels/create', (req, res) => {
    const { travel, email, token } = req.body;
    const { startingPoint, endPoint, date_hour, seats } = travel;
    const state = 'agendado';
    jwt.verify(token, SEED, (err, authData) => {
        if (err) {
            res.send({ success: false, message: err });
        } else if (authData.user.email == email) {
            sequilize
                .query(`INSERT INTO viajes 
                (ubicación_inicial, ubicación_final, fecha_hora, puestos, estado, email_id_conductor) 
                VALUES(?,?,?,?,?,?);`,
                    { raw: true, replacements: [startingPoint, endPoint, date_hour, seats, state, email] })
                .then(rows => {
                    console.log(rows);
                    if (rows[1] == 1) {
                        res.send({ success: true, message: 'create successful' });
                    } else {
                        res.send({ success: false, message: 'create rejected' });
                    }
                })
                .catch(err => {
                    res.send({ success: false, message: 'has been a problem' });
                });
        } else {
            res.send({ success: false, message: 'bad request' });
        }
    });
});

module.exports = router;
