const {
    constants: { AUTHORIZATION },
    statusCodes: { CREATED, DELETED },
    tokenTypes: { ACCESS, REFRESH },
} = require('../config');
const {
    authService,
    jwtService,
    passwordService,
} = require('../services');
const { objectNormalizer } = require('../utils');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { entity, body: { email, password } } = req;

            await passwordService.compare(entity.password, password);

            const tokenPair = jwtService.generateTokenPair(email);

            await authService.writeTokenPair(tokenPair, entity._id);

            res.status(CREATED).json({
                ...tokenPair,
                user: objectNormalizer.normalize(entity),
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);

            await authService.deleteToken(accessToken, ACCESS);

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);
            const user = req.authorizedUser;

            await authService.deleteToken(refreshToken, REFRESH);

            const tokenPair = jwtService.generateTokenPair(user.email);

            await authService.writeTokenPair(tokenPair, user._id);

            res.status(CREATED).json({
                ...tokenPair,
                user: objectNormalizer.normalize(user),
            });
        } catch (e) {
            next(e);
        }
    },
};
