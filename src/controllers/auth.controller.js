const {
    fieldsName: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
    },
    statusCodes: {
        CREATED,
        DELETED,
    },
    tokenTypes: {
        ACCESS,
        REFRESH,
    },
} = require('../config');
const {
    authService,
    jwtService,
    passwordService,
} = require('../services');
const { objectNormalizer } = require('../utils');

const cookieOptions = {
    httponly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

module.exports = {
    login: async (req, res, next) => {
        try {
            const {
                entity,
                body: {
                    email,
                    password,
                },
            } = req;

            await passwordService.compare(entity.password, password);

            const {
                accessToken,
                refreshToken,
            } = jwtService.generateTokenPair(email);

            await authService.writeTokenPair({
                accessToken,
                refreshToken,
            }, entity._id);

            res.cookie(ACCESS_TOKEN, accessToken, cookieOptions);
            res.cookie(REFRESH_TOKEN, refreshToken, cookieOptions);
            res.cookie('loggedIn', true, {
                ...cookieOptions,
                httpOnly: false,
            });

            res.status(CREATED)
                .json({
                    accessToken,
                    user: objectNormalizer.normalize(entity),
                });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const tokenFromCookie = req.cookies[REFRESH_TOKEN];
            const user = req.authorizedUser;

            await authService.deleteToken(tokenFromCookie, REFRESH);

            const { accessToken, refreshToken } = jwtService.generateTokenPair(user.email);

            await authService.writeTokenPair({ accessToken, refreshToken }, user._id);

            res.cookie(ACCESS_TOKEN, accessToken, cookieOptions);
            res.cookie(REFRESH_TOKEN, refreshToken, cookieOptions);
            res.cookie('loggedIn', true, {
                ...cookieOptions,
                httpOnly: false,
            });

            res.status(CREATED)
                .json({
                    accessToken,
                    user: objectNormalizer.normalize(user),
                });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const accessToken = req.normalizedToken;

            await authService.deleteToken(accessToken, ACCESS);

            res.cookie(ACCESS_TOKEN, '', { maxAge: 1 });
            res.cookie(REFRESH_TOKEN, '', { maxAge: 1 });
            res.cookie('loggedIn', '', { maxAge: 1 });

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },
};
