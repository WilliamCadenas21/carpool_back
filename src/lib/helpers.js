
const obj = {};

obj.prepareToSend = (user) => {
    return Object.keys(user).filter((key) => {
        return key !== 'password';
    }).reduce((object, current) => {
        object[current] = user[current];
        return object;
    }, {});
};

module.exports = obj;
