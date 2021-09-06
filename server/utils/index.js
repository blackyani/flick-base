const {loadMoreDefault} = require('../config/load-more');

const sortArgsHelper = (args) => {
    return {
        ...loadMoreDefault,
        ...args
    }
};
const getUserProps = (user) => {
    const {firstname, lastname, age, _id, email, role} = user;
    return{
        _id: _id.toHexString(),
        email,
        ...(firstname && {firstname}),
        ...(lastname && {lastname}),
        ...(age && {age}),
        role
    }
}

module.exports = { sortArgsHelper, getUserProps }