const {
    databaseFields: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
    },
    tokenTypes: {
        ACCESS,
    },
} = require('../config');
const { OAuth } = require('../models');

module.exports = {
    writeTokenPair: async (tokenPair, userId) => OAuth.create({ ...tokenPair, user: userId }),
    deleteAccessToken: async (accessToken) => OAuth.deleteOne({ accessToken }),
    findToken: async (token, tokenType = ACCESS) => {
        const fieldName = tokenType === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN;

        return OAuth.findOne({ [fieldName]: token });
    },
};
