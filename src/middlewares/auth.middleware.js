const {
    fieldsName: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
    },
    messagesKeywords: {
        MISSED_TOKEN,
        INVALID_TOKEN,
    },
    tokenTypes: { ACCESS },
    statusCodes: { UNAUTHORIZED },
} = require('../config');
const { ApiError } = require('../errors');
const {
    authService,
    jwtService,
} = require('../services');
const { messageBuilder: { getMessage } } = require('../utils');

module.exports = {
    validateToken: (tokenType) => async (req, res, next) => {
        try {
            const token = tokenType === ACCESS
                ? (
                    req.cookies[ACCESS_TOKEN]
                ) : (
                    req.cookies[REFRESH_TOKEN]); // todo switch case for action token

            if (!token) {
                throw new ApiError(UNAUTHORIZED, getMessage(MISSED_TOKEN, tokenType));
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await authService.findToken(token, tokenType);

            if (!tokenFromDB) {
                throw new ApiError(UNAUTHORIZED, getMessage(INVALID_TOKEN, tokenType));
            }

            req.authorizedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    sessionChecker: (req, res, next) => {
        try {
            console.log(`Session checker: ${req.session.id}`);

            next();
        } catch (e) {
            next(e);
        }
    },
};
