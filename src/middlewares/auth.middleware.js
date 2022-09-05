const {
    statusCodes: { UNAUTHORIZED },
} = require('../config');
const { ApiError } = require('../errors');
const {
    authService,
    jwtService,
} = require('../services');
const {
    fieldsName: { ACCESS_TOKEN, REFRESH_TOKEN },
    tokenTypes: { ACCESS },
} = require('../config');

module.exports = {
    validateToken: (tokenType) => async (req, res, next) => {
        try {
            const token = tokenType === ACCESS
                ? (
                    req.cookies[ACCESS_TOKEN]
                ) : (
                    req.cookies[REFRESH_TOKEN]); // todo switch case for action token

            if (!token) {
                throw new ApiError(UNAUTHORIZED, `${tokenType} token missed`);
            }

            await jwtService.verifyToken(token, tokenType);

            const tokenFromDB = await authService.findToken(token, tokenType);

            if (!tokenFromDB) {
                throw new ApiError(UNAUTHORIZED, 'Invalid token');
            }

            req.authorizedUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
