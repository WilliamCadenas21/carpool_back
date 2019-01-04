const bcrypt = require('bcryptjs');

const obj = {};

obj.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

obj.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        throw Error(e);
    }
};

module.exports = obj;
