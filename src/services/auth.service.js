const { OAuth } = require('../models');
const { getFieldName: { tokenFieldName } } = require('../utils');

module.exports = {
    writeTokenPair: async (tokenPair, userId) => OAuth.create({ ...tokenPair, user: userId }),

    deleteToken: async (token, tokenType) => {
        const fieldName = tokenFieldName(tokenType);

        return OAuth.deleteOne({ [fieldName]: token });
    },

    findToken: async (token, tokenType) => {
        const fieldName = tokenFieldName(tokenType);

        return OAuth.findOne({ [fieldName]: token });
    },
};
