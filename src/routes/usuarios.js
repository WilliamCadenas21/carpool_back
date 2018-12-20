const express = require('express');
const router = express.Router();
const sequilize  = require('../database.js');
const exp = require('../email.js');

const sendEmail= exp.method;

router.get('/', (req, res) => {
  res.send('welcome to my rest api');
});

router.get('/users/getAll', (req, res) => {
  sequilize.query('SELECT * FROM usuarios').then( rows => {
    res.json(rows[0]);
  });
});

// GET
router.get('/users/get/:email_id', (req, res) => {
  const { email_id } = req.params; 
  sequilize
    .query('SELECT * FROM usuarios WHERE email_id = ?',
    { raw: true, replacements: [email_id]})
    .then(rows => {
      res.json(rows[0])})
    .catch(err => {
      console.error('ERROR:', err);
    });
});

// DELETE 
router.delete('/users/delete/:email_id', (req, res) => {
  const { email_id } = req.params; 
  sequilize
    .query('DELETE FROM usuarios WHERE email_id = ?',
    { raw: true, replacements: [email_id] })
    .then(rows => {
      if(rows[0].affectedRows == 1){
        res.send({'success': true, 'message':'delete successful'});
      }else{
        res.send({'success': false, 'message':'the email is wrong'});
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
});


// CREATE
router.post('/users/create', (req, res) => {
  const {nombres, apellidos, email_id, contraseña} = req.body;
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,FALSE,NULL,NULL,NULL,NULL,NULL,NULL);`;
  sequilize
    .query(query,
    { raw: true, replacements: [nombres, apellidos, email_id, contraseña] })
    .then(rows => {
      if(rows[0] === 0){
        sendEmail(nombres,email_id);
        res.send({'success': true, 'massage':'please enter in your email and confirm your account'});
      }else{
        res.send({'success': false, 'message':'the response it is not zero'});
      }
    })
    .catch(err => {
      if(err.errors[0].message == 'PRIMARY must be unique'){
        res.send({'success': false, 'message':'this email already has an account'});
      }else{
        res.send({'success': false, 'message':err.errors[0].message});
      }
      res.send('error:'+err);
    });
});

// LOGIN
router.post('/users/login', (req, res) => {
  if(req.body === null){
    res.send({success: false, message: 'res.body is null'});
  }
  const email_id =req.body.email_id;
  const password  = req.body.password;
  sequilize
    .query('SELECT * FROM usuarios WHERE email_id = ?',
    {raw: true, replacements: [email_id]})
    .then(rows => {
        if(rows[0][0].contraseña == password){
          if(rows[0][0].usuario_valido == 1){
            res.send({'success': true, 
            message: 'usuario valido',
            user: {
              names:rows[0][0].nombres,
              lastNames:rows[0][0].apellidos,
              plate:rows[0][0].placa,
              age:rows[0][0].edad,
              degree:rows[0][0].carrera,
              semester:rows[0][0].semestre,
              email:rows[0][0].email_id,
              address:rows[0][0].direccion,
              neighborhood:rows[0][0].barrio
            }
          });
          }else{
            res.send({'success': false, message: 'por favor debe validar su usuario'});
          }
        }else{
          res.send({'success': false, message: 'el password no concide'});
        }
    })
    .catch(err => {
      res.send({'success': false, 'message':'su correo no coincide'});
    });
});

// UPDATE
router.put('/users/update/:email_id', (req, res) => {
  const { age, degree, semester, address, neighborhood } = req.body;
  const { email_id } = req.params;
  const query = `
    UPDATE usuarios
      SET edad = ?, carrera= ?, semestre = ?, direccion = ?, barrio = ?
      WHERE email_id = ?;
  `;
  sequilize
  .query(query,
  { raw: true, replacements: [age, degree, semester, address, neighborhood, email_id]})
  .then(rows => {
    if(rows[0].affectedRows == 1){
      res.send({'success': true, 'message':'update successful'});
    }else{
      res.send({'success': false, 'message':'the email is wrong'});
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});


module.exports = router;