const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { SEED } = require('./config');

const obj = {};

const account = {
  user: 'service2.carpool.vita@gmail.com',
  pass: '$Carpool2'
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: account.user,
    pass: account.pass
  }
});

obj.sendEmail = async (names, email) => {
  try {
    const user = {
      email
    };
    const token = await jwt.sign({ user }, SEED, { expiresIn: '7d' });
    const mailOptions = {
      from: '<service.carpool.vita@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `${names} valida tu cuenta con Carpool✔`, // Subject line
      html: `<h1>valida tu cuenta en este instante haciendo 
          click en el siguiente enlace 
          <a href='https://carpool-back.herokuapp.com/confirmation/${token}'>aquí</a><h2>` // html body
    };
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw Error(e);
  }
};

module.exports = obj;
