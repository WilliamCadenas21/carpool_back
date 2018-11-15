const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const sequilize  = require('../database.js');

const account ={
    user:'service.carpool.vita@gmail.com',
    pass:'$Carpool123'
}

const SEED = 'secretword';

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


// Register an User
router.post('/users/create', (req, res) => {
  const {nombres, apellidos, email_id, contraseña} = req.body;
  const query = `
  INSERT INTO usuarios  
  VALUES (?,?,?,?,FALSE,NULL,NULL,NULL,NULL);`;
  sequilize
    .query(query,
    { raw: true, replacements: [nombres, apellidos, email_id, contraseña] })
    .then(rows => {
      if(rows[0] === 0){
        sendEmail(nombres,email_id,account);
        res.send({'success': true, 'massage':'please enter in your email and confirm your account'});
      }else{
        res.send({'success': false, 'message':'the response it is not zero'});
      }
    })
    .catch(err => {
      // if(err.errors[0].message == 'PRIMARY must be unique'){
      //   res.send({'success': false, 'message':'your email already has an account'});
      // }else{
      //   res.send({'success': false, 'message':err.errors[0].message});
      // }
      res.send(err);
    });

});

//Login a user
router.post('/users/login', (req, res) => {
  if(req.body === null){
    res.send({success: false, message: 'res.body is null'});
  }
  const email_id =req.body.email_id;
  const password  = req.body.password;
  console.log('1: '+email_id+' 2: '+password); 
  sequilize
    .query('SELECT contraseña FROM usuarios WHERE email_id = ?',
    {raw: true, replacements: [email_id]})
    .then(rows => {
      if(!rows[0][0].contraseña){
        res.send({'success': false, message: 'no contraseña' });
      }else{
        if(rows[0][0].contraseña == password){
          res.send({'success': true, message: 'contraseña y usuario conciden'});
        }else{
          res.send({'success': false, message: 'el password no concide'});
        }
      }
    })
    .catch(err => {
      res.send({'success': false, 'message':'el usuario no fue encontrado'});
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

router.get('/comfirmation/:token', (req, res) => {  
  const token = req.params;
  jwt.verify(token, SEED, (err, authData) => {
    if(err) {
      res.send({success:false, message:err})
    } else {
      userEmail=authData.user.email;
      sequilize
      .query('UPDATE usuarios SET usuario_valido = 1 WHERE email_id = ?',
      {raw: true, replacements: [userEmail]})
      .then(rows => {
          res.send('<h1>felicidades ya pudes entrar a la app y empezar a carpoolear</h1>');
      })
      .catch(err => {
        res.send({'success': false, 'message':'el usuario no fue encontrado'});
      });
    }
  });
});


function sendEmail(names,email,account) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: account.user, 
        pass: account.pass 
    }
  });
  const user = {
    username: names,
    email: email
  }

  jwt.sign({user}, SEED, { expiresIn: '7d' }, (err, token1) => {
    if(!err){
      let mailOptions = {
        from: '<service.carpool.vita@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: 'valida tu cuenta con Carpool✔', // Subject line
        html: `<h1>valida tu cuenta en este instante haciendo 
        click en el siguiente enlace 
        <a href='https://carpool-back.herokuapp.com/comfirmation/${token1}'>aquí</a><h2>` // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
          console.log('Message sent: ', info.messageId);
      });
    }else{
      console.log(err);
    }
  });
};

module.exports = router;