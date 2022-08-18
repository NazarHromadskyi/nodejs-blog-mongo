const { OAuth } = require('../models');

module.exports = {
    writeTokenPair: async (tokenPair, userId) => OAuth.create({ ...tokenPair, user: userId }),
    deleteAccessToken: async (accessToken) => OAuth.deleteOne({ accessToken }),
    findToken: async (token, tokenType = 'access') => {
        const fieldName = tokenType === 'access' ? 'accessToken' : 'refreshToken';

        return OAuth.findOne({ [fieldName]: token });
    },
};
