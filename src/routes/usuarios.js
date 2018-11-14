const express = require('express');
const router = express.Router();

//const mysqlConnection  = require('../database.js');
const sequilize  = require('../database.js');

router.get('/', (req, res) => {
  res.send('welcome to my rest api');
});

router.get('/users/getAll', (req, res) => {
  sequilize.query('SELECT * FROM usuarios').then( rows => {
    //console.log(rows);
    res.json(rows[0]);
  });
});

// GET An User
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

router.post('/users/login', (req, res) => {
  const { email_id, password } = req.body; 
  sequilize
    .query('SELECT contraseña FROM usuarios WHERE email_id = ?',
    { replacements: [email_id]})
    .then(rows => {
      if(!rows[0][0].contraseña){
        res.send({'success': false});
      }else{
        if(rows[0][0].contraseña == password){
          res.send({'success': true});
        }else{
          res.send({'success': false});
        }
      }
    })
    .catch(err => {
      res.send({'success': false, 'message':err});
    });
});

// DELETE An User
router.delete('/users/delete/:email_id', (req, res) => {
  const { email_id } = req.params; 
  sequilize
    .query('DELETE FROM usuarios WHERE email_id = ?',
    { raw: true, replacements: [email_id] })
    .then(rows => {
      res.json(rows[0])})
    .catch(err => {
      console.error('ERROR:', err);
    });
});


// INSERT An User
router.post('/users/create', (req, res) => {
  const {nombres, apellidos, email_id, contraseña} = req.body;
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,TRUE,NULL,NULL,NULL,NULL);`;
  sequilize
    .query(query,
    { raw: true, replacements: [nombres, apellidos, email_id, contraseña] })
    .then(rows => {
      console.log(rows[0]);
      if(rows[0] === 0){
        res.send({'success': true });
      }else{
        res.send({'success': false, 'message':'the response it is not zero'});
      }
    })
    .catch(err => {
       res.send({'success': false, 'message':err});
    });
});

// UpDate An User
router.put('/users/update/:email_id', (req, res) => {
  const { edad, carrera, semestre } = req.body;
  const { email_id } = req.params;
  const query = `
    UPDATE usuarios
      SET edad = ?, carrera= ?, semestre = ?
      WHERE email_id = ?;
  `;
  sequilize
  .query(query,
  { raw: true, replacements: [edad, carrera, semestre, email_id]})
  .then(rows => {
    res.json(rows[0])})
  .catch(err => {
    console.error('ERROR:', err);
  });
});

module.exports = router;
