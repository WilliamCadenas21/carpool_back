const express = require('express');

const sequilize = require('../db/dataBaseConfig');
const { verifyToken } = require('../lib/auth');

const router = express.Router();

// CREATE
router.post('/travels/create', async (req, res) => {
    try {
        const { travel, emailDriver, token } = req.body;
        const { startingPoint, endPoint, date, seats } = travel;
        const state = 'agendado';
        const auth = await verifyToken(token);
        if (auth.user.email == emailDriver) {
            const query = `INSERT INTO viajes 
            (ubicación_inicial, ubicación_final, fecha_hora, puestos, estado, email_id_conductor) 
            VALUES(?,?,?,?,?,?);`;
            const obj = {
                raw: true,
                replacements: [startingPoint, endPoint, date, seats, state, emailDriver]
            };

            const response = await sequilize.query(query, obj);
            if (response[1] == 1) {
                res.send({ success: true, message: 'create successful' });
            } else {
                res.send({ success: false, message: 'create rejected' });
            }
        } else {
            res.send({ success: false, message: 'bad request' });
        }
    } catch (e) {
        res.send({ success: false, message: `${e}` });
    }
});

router.post('/get/travels', async (req, res) => {
    try {
        const { token, email } = req.body;
        const auth = await verifyToken(token);

        if (auth.user.email == email) {
            const query = `INSERT INTO viajes 
            (ubicación_inicial, ubicación_final, fecha_hora, puestos, estado, email_id_conductor) 
            VALUES(?,?,?,?,?,?);`;
            const obj = {
                raw: true,
                replacements: [startingPoint, endPoint, date_hour, seats, state, email]
            };

            const response = await sequilize.query(query, obj);
            if (response[1] == 1) {
                res.send({ success: true, message: 'create successful' });
            } else {
                res.send({ success: false, message: 'create rejected' });
            }
        } else {
            res.send({ success: false, message: 'bad request' });
        }
    } catch (e) {
        res.send({ success: false, message: `${e}` });
    }
});

module.exports = router;
