const jwt = require('jsonwebtoken');
const util = require('util');

const {
    statusCodes: {
        UNAUTHORIZED,
    },
    tokenTypes: { ACCESS },
    variables: {
        ACCESS_SECRET_KEY,
        REFRESH_SECRET_KEY,
    },
} = require('../config');
const { ApiError } = require('../errors');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenPair: (payload) => {
        const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            accessToken,
            refreshToken,
        };
    },

    verifyToken: async (token, tokenType = ACCESS) => {
        try {
            const secretKey = tokenType === ACCESS ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secretKey);
        } catch (e) {
            throw new ApiError(UNAUTHORIZED, 'Invalid token');
        }
    },
};
