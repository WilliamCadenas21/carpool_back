const express = require('express');
const jwt = require('jsonwebtoken');
const sequilize = require('../db/dataBaseConfig');
const { sendEmail } = require('../lib/email');
const { SEED } = require('../lib/config');
const { verifyToken } = require('../lib/auth');
const User = require('../db/models/userModel');
const { encryptPassword, matchPassword } = require('../lib/bcrypt');
const { prepareToSend } = require('../lib/helpers');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('What are you looking for ?');
});

// CREATE
router.post('/users/create', async (req, res) => {
  try {
    const { names, lastNames, password, email } = req.body;
    const newPassword = await encryptPassword(password);
    const user = User.build({
      names,
      lastNames,
      password: newPassword,
      email,
    });

    await user.save();
    await sendEmail(names, email);
    res.send({ success: true, massage: 'please enter in your email and confirm your account' });
  } catch (e) {
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
    const plainPassword = req.body.password;
    const query = 'SELECT * FROM users WHERE email = ?';
    const obj = { raw: true, replacements: [email] };
    const response = await sequilize.query(query, obj);
    const { password, emailConfirmed } = response[0][0];

    //get rid of the password
    const userToSend = prepareToSend(response[0][0]);
    const match = await matchPassword(plainPassword, password);

    if (match) {
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
      if (response[0].affectedRows === 1) {
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

//Create conductor
router.post('/users/create/driver', async (req, res) => {
  try {
    const { email, token, car } = req.body;
    const { plate, model, color, brand } = car;
    const auth = await verifyToken(token);
    if (auth.user.email === email) {
      const query = `UPDATE users SET plate = ? WHERE email = ?;
        INSERT INTO vehicles VALUES (?,?,?,?,?);`;
      const configObj = {
        raw: true,
        replacements: [plate, email, plate, model, color, brand, email]
      };
      const response = await sequilize.query(query, configObj);
      console.log(response);
      if (response[0][0].affectedRows === 1) {
        res.send({ success: true, message: 'create successful' });
      } else {
        res.send({ success: false, message: 'the email is wrong' });
      }
    } else {
      res.send({ success: false, message: 'bad request' });
    }
  } catch (e) {
    console.log(e);
    res.send({ success: false, message: `${e}` });
  }
});

module.exports = router;
