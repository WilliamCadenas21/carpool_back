const express = require('express');

const sequilize = require('../database');
const { verifyToken } = require('../lib/auth');

const router = express.Router();

// CREATE
router.post('/travels/create', async (req, res) => {
    try {
        const { travel, email, token } = req.body;
        const { startingPoint, endPoint, date_hour, seats } = travel;
        const state = 'agendado';
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
