const { OAuth } = require('../models');
const { getFieldName: { tokenFieldName } } = require('../utils');

module.exports = {
    writeTokenPair: (tokenPair, userId) => OAuth.create({ ...tokenPair, user: userId }),

    deleteToken: (token, tokenType) => {
        const fieldName = tokenFieldName(tokenType);

        return OAuth.deleteOne({ [fieldName]: token });
    },

    findToken: (token, tokenType) => {
        const fieldName = tokenFieldName(tokenType);

        return OAuth.findOne({ [fieldName]: token });
    },
};
