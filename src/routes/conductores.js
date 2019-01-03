const express = require('express');
const sequilize = require('../database');

const router = express.Router();

//CREATE
router.put('/conductores/create/:token', (req, res) => {
    const { age, degree, semester, address, neighborhood } = req.body;
    const { email_id } = req.params;
    const query = `UPDATE usuarios
        SET edad = ?, carrera= ?, semestre = ?, direccion = ?, barrio = ?
        WHERE email_id = ?;
    `;
    sequilize
        .query(query,
            { raw: true, replacements: [age, degree, semester, address, neighborhood, email_id] })
        .then(rows => {
            if (rows[0].affectedRows == 1) {
                res.send({ success: true, message: 'update successful' });
            } else {
                res.send({ success: false, message: 'the email is wrong' });
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
});

module.exports = router;
