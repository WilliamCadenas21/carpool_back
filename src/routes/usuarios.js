const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all User
router.get('/users/getAll', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An User
router.get('/users/get/:email_id', (req, res) => {
  const { email_id } = req.params; 
  mysqlConnection.query('SELECT * FROM usuarios WHERE email_id = ?', [email_id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An User
router.delete('/users/delete/:email_id', (req, res) => {
  const { email_id } = req.params;
  mysqlConnection.query('DELETE FROM usuarios WHERE email_id = ?', [email_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An User
router.post('/users/create', (req, res) => {
  const {nombres, apellidos, email_id, contraseña} = req.body;
  console.log(req.body);
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,TRUE,NULL,NULL,NULL,NULL);`;
  mysqlConnection.query(query, [nombres, apellidos, email_id, contraseña], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User Create and Saved'});
    } else {
      console.log(err);
    }
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
  mysqlConnection.query(query, [edad, carrera, semestre, email_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'User Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
