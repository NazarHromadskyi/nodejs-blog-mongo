const bcrypt = require('bcrypt');

const {
    messagesKeywords: { EMAIL_OR_PASS_WRONG },
    statusCodes: { BAD_REQUEST },
} = require('../config');
const { ApiError } = require('../errors');
const { messageBuilder: { getMessage } } = require('../utils');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (hash, password) => {
        const isPassMatched = await bcrypt.compare(password, hash);

        if (!isPassMatched) {
            throw new ApiError(BAD_REQUEST, getMessage(EMAIL_OR_PASS_WRONG));
        }
    },
};
