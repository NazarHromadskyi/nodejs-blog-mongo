const bcrypt = require('bcrypt');

const { statusCodes: { BAD_REQUEST } } = require('../config');
const { ApiError } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPassMatched = await bcrypt.compare(password, hash);

        if (!isPassMatched) {
            throw new ApiError(BAD_REQUEST, 'Email or password are wrong');
        }
    },
};
