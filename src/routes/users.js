const express = require('express');
const jwt = require('jsonwebtoken');
const sequilize = require('../database');
const exp = require('../lib/email');
const { SEED } = require('../lib/config');
const { verifyToken } = require('../lib/auth');

const router = express.Router();
const sendEmail = exp.method;

router.get('/', (req, res) => {
  res.send('What are you looking for ?');
});

// CREATE
router.post('/users/create', (req, res) => {
  const { nombres, apellidos, email_id, contraseña } = req.body;
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,FALSE,NULL,NULL,NULL,NULL,NULL,NULL);`;
  sequilize
    .query(query,
      { raw: true, replacements: [nombres, apellidos, email_id, contraseña] })
    .then(rows => {
      if (rows[0] === 0) {
        sendEmail(nombres, email_id);
        res.send({ success: true, massage: 'please enter in your email and confirm your account' });
      } else {
        res.send({ success: false, message: 'the response it is not zero' });
      }
    })
    .catch(err => {
      if (err.errors[0].message == 'PRIMARY must be unique') {
        res.send({ success: false, message: 'this email already has an account' });
      } else {
        res.send({ success: false, message: err.errors[0].message });
      }
      res.send(`error: ${err}`);
    });
});

// LOGIN
router.post('/users/login', (req, res) => {
  const { email_id, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email_id = ?';
  sequilize.query(query, { raw: true, replacements: [email_id] })
    .then(rows => {
      if (rows[0][0].contraseña == password) {
        if (rows[0][0].usuario_valido == 1) {
          const user = {
            email: email_id
          };
          jwt.sign({ user }, SEED, { expiresIn: '1d' }, (err, token) => {
            if (!err) {
              res.send({
                success: true,
                message: 'usuario valido',
                user: {
                  names: rows[0][0].nombres,
                  lastNames: rows[0][0].apellidos,
                  plate: rows[0][0].placa,
                  age: rows[0][0].edad,
                  degree: rows[0][0].carrera,
                  semester: rows[0][0].semestre,
                  email: rows[0][0].email_id,
                  address: rows[0][0].direccion,
                  neighborhood: rows[0][0].barrio,
                  token
                }
              });
            } else {
              res.send({ success: false, message: err });
            }
          });
        } else {
          res.send({ success: false, message: 'por favor debe validar su usuario' });
        }
      } else {
        res.send({ success: false, message: 'el password no coincide' });
      }
    })
    .catch(err => {
      res.send({ success: false, message: `error: ${err}` });
    });
});

// UPDATE async/await implemented
router.put('/users/update/rider', async (req, res) => {
  try {
    const { email_id, token, age, degree, semester, address, neighborhood } = req.body;
    const auth = await verifyToken(token);

    if (auth.user.email == email_id) {
      const query = `UPDATE usuarios SET 
          edad = ?, 
          carrera= ?, 
          semestre = ?, 
          direccion = ?,
          barrio = ?
          WHERE email_id = ?;`;

      const obj = {
        raw: true,
        replacements: [age, degree, semester, address, neighborhood, email_id]
      };

      const response = await sequilize.query(query, obj);

      if (response[0].affectedRows == 1) {
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
    } else if (authData.user.email == email_id) {
      const query = `UPDATE usuarios SET placa = ? WHERE email_id = ?;
      INSERT INTO vehiculos VALUES (?,?,?,?,?);`;
      sequilize
        .query(query,
          { raw: true, replacements: [plate, email_id, plate, model, color, brand, email_id] })
        .then(rows => {
          console.log(rows);
          if (rows[0][0].affectedRows == 1) {
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
  } catch (err) {
    res.send('error: ' + err);
  }
});

module.exports = router;
