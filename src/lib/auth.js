const jwt = require('jsonwebtoken');
const { SEED } = require('../config');

const functions = {};

functions.verifyToken = async (token) => {
    try {
        const res = await jwt.verify(token, SEED);
        return res;
    } catch (e) {
        throw Error(e);
    }
};

module.exports = functions;
