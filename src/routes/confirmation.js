const express = require('express');
const sequilize = require('../db/dataBaseConfig');
const { verifyToken } = require('../lib/auth');

const router = express.Router();

router.get('/confirmation/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const auth = await verifyToken(token);
    const userEmail = auth.user.email;
    const query = 'UPDATE users SET emailConfirmed = 1 WHERE email = ?';
    const obj = { raw: true, replacements: [userEmail] };
    await sequilize.query(query, obj);
    res.send('<h1>felicidades ya puedes entrar a la app y empezar a Carpoolear</h1>');
  } catch (e) {
    res.send(`${e}`);
  }
});

module.exports = router;
