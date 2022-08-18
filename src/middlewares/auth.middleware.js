const {
    constants: { AUTHORIZATION },
    statusCodes: { UNAUTHORIZED },
} = require('../config');
const { ApiError } = require('../errors');
const { authService, jwtService } = require('../services');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);

            if (!accessToken) {
                throw new ApiError(UNAUTHORIZED, 'Invalid token');
            }

            await jwtService.verifyToken(accessToken);

            const tokenFromDB = await authService.findToken(accessToken);

            if (!tokenFromDB) {
                throw new ApiError(UNAUTHORIZED, 'Invalid token');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
