const express = require('express');
const router = express.Router();

//const mysqlConnection  = require('../database.js');
const sequilize  = require('../database.js');

router.get('/', (req, res) => {
  res.send('welcome to my rest api');
});

// GET all User
// router.get('/users/getAll', (req, res) => {
//   mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
//     if(!err) {
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });  
// });

router.get('/users/getAll', (req, res) => {
  sequilize.query('SELECT * FROM usuarios').then( rows => {
    //console.log(rows);
    res.json(rows[0]);
  });
});

// GET An User

// router.get('/users/get/:email_id', (req, res) => {
//   const { email_id } = req.params; 
//   mysqlConnection.query('SELECT * FROM usuarios WHERE email_id = ?', [email_id], (err, rows, fields) => {
//     if (!err) {
//       res.json(rows[0]);
//     } else {
//       console.log(err);
//     }
//   });
// });

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

// DELETE An User
// router.delete('/users/delete/:email_id', (req, res) => {
//   const { email_id } = req.params;
//   mysqlConnection.query('DELETE FROM usuarios WHERE email_id = ?', 
//     { raw: true, replacements: [email_id]}).then(rows => {
//       res.json(rows[0])
//     .catch(err => {
//       console.error('ERROR:', err);
//     });  
//   });
// });

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
// router.post('/users/create', (req, res) => {
//   const {nombres, apellidos, email_id, contraseña} = req.body;
//   console.log(req.body);
//   const query = `
//   INSERT INTO usuarios  
//   VALUES (?,?,?,?,TRUE,NULL,NULL,NULL,NULL);`;
//   mysqlConnection.query(query, [nombres, apellidos, email_id, contraseña], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'User Create and Saved'});
//     } else {
//       console.log(err);
//     }
//   });
// });

router.post('/users/create', (req, res) => {
  const {nombres, apellidos, email_id, contraseña} = req.body;
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,TRUE,NULL,NULL,NULL,NULL);`;
  sequilize
    .query(query,
    { raw: true, replacements: [nombres, apellidos, email_id, contraseña] })
    .then(rows => {
      res.json(rows[0])})
    .catch(err => {
      console.error('ERROR:', err);
    });
});

// UpDate An User
// router.put('/users/update/:email_id', (req, res) => {
//   const { edad, carrera, semestre } = req.body;
//   const { email_id } = req.params;
//   const query = `
//     UPDATE usuarios
//       SET edad = ?, carrera= ?, semestre = ?
//       WHERE email_id = ?;
//   `;
//   mysqlConnection.query(query, [edad, carrera, semestre, email_id], (err, rows, fields) => {
//     if(!err) {
//       res.json({status: 'User Updated'});
//     } else {
//       console.log(err);
//     }
//   });
// });

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
