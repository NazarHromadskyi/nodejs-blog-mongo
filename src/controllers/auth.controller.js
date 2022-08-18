const {
    constants: { AUTHORIZATION },
    statusCodes: { CREATED, DELETED },
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

            const tokenPair = jwtService.generateTokenPair({ email });

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

            await authService.deleteAccessToken(accessToken);

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },
};
