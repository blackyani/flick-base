const {loadMoreDefault} = require('../config/load-more');

const sortArgsHelper = (args) => {
    return {
        ...loadMoreDefault,
        ...args
    }
};

module.exports = { sortArgsHelper }