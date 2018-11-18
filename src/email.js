const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const account ={
    user:'service2.carpool.vita@gmail.com',
    pass:'$Carpool2'
}

const SEED = 'secretword';

function sendEmail(names,email) {
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
        <a href='https://carpool-back.herokuapp.com/confirmation/${token1}'>aquí</a><h2>` // html body
      };
      console.log ('token:'+token1);
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

module.exports = {
  method: sendEmail,
  seed: SEED
}