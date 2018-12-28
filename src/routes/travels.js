const express = require('express');
const router = express.Router();
const sequilize = require('../database.js');
const { SEED } = require('../config');

// CREATE
router.post('/create/travel', (req, res) => {
    const { token } = req.params;
    jwt.verify(token, SEED, (err, authData) => {
        if (err) {
            res.send({ success: false, message: err });
        } else {
            const userEmail = authData.user.email;
            sequilize
                .query('UPDATE usuarios SET usuario_valido = 1 WHERE email_id = ?',
                    { raw: true, replacements: [userEmail] })
                .then(rows => {
                    res.send('<h1>felicidades ya puedes entrar a la app y empezar a Carpoolear</h1>');
                })
                .catch(err => {
                    res.send({ success: false, message: 'el usuario no fue encontrado' });
                });
        }
    });
});

module.exports = router;
