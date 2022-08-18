const {
    constants: { AUTHORIZATION },
    statusCodes: { UNAUTHORIZED },
} = require('../config');
const { ApiError } = require('../errors');
const { authService, jwtService } = require('../services');

module.exports = {
    validateToken: (tokenType) => async (req, res, next) => {
        try {
            const token = req.get(AUTHORIZATION);

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
