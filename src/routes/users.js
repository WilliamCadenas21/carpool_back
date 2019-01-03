const express = require('express');
const jwt = require('jsonwebtoken');
const sequilize = require('../db/dataBaseConfig');
const { sendEmail } = require('../lib/email');
const { SEED } = require('../lib/config');
const { verifyToken } = require('../lib/auth');
const User = require('../db/models/userModel');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('What are you looking for ?');
});

// CREATE
router.post('/users/create', async (req, res) => {
  try {
    const { names, lastNames, password, email } = req.body;
    const user = User.build({
      names,
      lastNames,
      password,
      email,
    });

    await user.save();
    await sendEmail(names, email);
    res.send({ success: true, massage: 'please enter in your email and confirm your account' });
  } catch (e) {
    console.log(e);
    if (e.name === 'SequelizeUniqueConstraintError') {
      res.send({ success: false, message: 'this email already has an account' });
    } else {
      res.send({ success: false, message: `${e}` });
    }
  }
});

// LOGIN
router.post('/users/login', async (req, res) => {
  try {
    const { email } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    const obj = { raw: true, replacements: [email] };
    const response = await sequilize.query(query, obj);
    const { password, emailConfirmed } = response[0][0];
    const userToSend = response[0][0];

    if (password === req.body.password) {
      if (emailConfirmed === 1) {
        const user = {
          email
        };
        const token = await jwt.sign({ user }, SEED, { expiresIn: '1d' });
        res.send({
          success: true,
          message: 'usuario valido',
          user: {
            ...userToSend,
            token
          }
        });
      } else {
        res.send({ success: false, message: 'por favor debe validar su usuario' });
      }
    } else {
      res.send({ success: false, message: 'usuario invalido' });
    }
  } catch (e) {
    res.send({ success: false, message: `${e}` });
  }
});

// UPDATE 
router.put('/users/update/rider', async (req, res) => {
  try {
    const { email, token, age, degree, semester, address, neighborhood } = req.body;
    const auth = await verifyToken(token);

    if (auth.user.email === email) {
      const query = `UPDATE users SET 
          age = ?, 
          degree= ?, 
          semester = ?, 
          address = ?,
          neighborhood = ?
          WHERE email = ?;`;

      const obj = {
        raw: true,
        replacements: [age, degree, semester, address, neighborhood, email]
      };

      const response = await sequilize.query(query, obj);
      
      if (response[0][0].affectedRows === 1) {
        res.send({ success: true, message: 'update successful' });
      } else {
        res.send({ success: false, message: 'the info stay equal' });
      }
    } else {
      res.send({ success: false, message: 'bad request' });
    }
  } catch (e) {
    res.send({ success: false, message: `${e}` });
  }
});

//Update conductor
router.post('/users/create/driver', (req, res) => {
  const { email_id, token, car } = req.body;
  const { plate, model, color, brand } = car;
  jwt.verify(token, SEED, (err, authData) => {
    if (err) {
      res.send({ success: false, message: err });
    } else if (authData.user.email === email_id) {
      const query = `UPDATE usuarios SET placa = ? WHERE email_id = ?;
      INSERT INTO vehiculos VALUES (?,?,?,?,?);`;
      sequilize
        .query(query,
          { raw: true, replacements: [plate, email_id, plate, model, color, brand, email_id] })
        .then(rows => {
          console.log(rows);
          if (rows[0][0].affectedRows === 1) {
            res.send({ success: true, message: 'create successful' });
          } else {
            res.send({ success: false, message: 'the email is wrong' });
          }
        })
        .catch(error => {
          res.send({ success: false, message: error });
        });
    } else {
      res.send({ success: false, message: 'bad request' });
    }
  });
});

//ruta de prueba de concepto
router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const auth = await verifyToken(token);
    if (auth) {
      res.send(auth);
    }
  } catch (e) {
    res.send(`${e}`);
  }
});

module.exports = router;
