const express = require('express');
const router = express.Router();
const sequilize = require('../database.js');

router.get('/getTravels/:token', (req, res) => {
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
                    res.send('<h1>felicidades ya pudes entrar a la app y empezar a carpoolear</h1>');
                })
                .catch(err => {
                    res.send({ 'success': false, 'message': 'el usuario no fue encontrado' });
                });
        }
    });
});

module.exports = router;
