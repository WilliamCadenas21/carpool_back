const express = require('express');

//const sequilize = require('../db/dataBaseConfig');
const { verifyToken } = require('../lib/auth');
const Travel = require('../db/models/travelModel');

const router = express.Router();

// CREATE
router.post('/travels/create', async (req, res) => {
    try {
        const { travel, email, token } = req.body;
        const auth = await verifyToken(token);
        if (auth.user.email === email) {
            const newTravel = Travel.build({ ...travel, emailDriver: email });
            const response = await newTravel.save();
            res.send({ success: true, message: response });
        } else {
            res.send({ success: false, message: 'bad request' });
        }
    } catch (e) {
        res.send({ success: false, message: `${e}` });
    }
});

// CREATE
router.post('/travels/get', async (req, res) => {
    try {
        const { email, token } = req.body;
        const auth = await verifyToken(token);
        if (auth.user.email === email) {
            const response = await Travel.findAll();
            console.log(response);
            res.send({ success: true, message: response });
        } else {
            res.send({ success: false, message: 'bad request' });
        }
    } catch (e) {
        res.send({ success: false, message: `${e}` });
    }
});


module.exports = router;
