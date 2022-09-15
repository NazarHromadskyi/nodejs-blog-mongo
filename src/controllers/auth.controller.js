const {
    fieldsName: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
        IS_LOGGED_IN,
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
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours todo const
    sameSite: 'Lax',
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

            res.cookie(ACCESS_TOKEN, accessToken, cookieOptions); // todo use express-session
            res.cookie(REFRESH_TOKEN, refreshToken, cookieOptions);
            res.cookie(IS_LOGGED_IN, true, {
                ...cookieOptions,
                httpOnly: false,
            });

            res.status(CREATED)
                .json({ user: objectNormalizer.normalize(entity) });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const tokenFromCookie = req.cookies[REFRESH_TOKEN];
            const user = req.authorizedUser;

            await authService.deleteToken(tokenFromCookie, REFRESH);

            const {
                accessToken,
                refreshToken,
            } = jwtService.generateTokenPair(user.email);

            await authService.writeTokenPair({
                accessToken,
                refreshToken,
            }, user._id);

            res.cookie(ACCESS_TOKEN, accessToken, {
                ...cookieOptions,
                httpOnly: false,
            });
            res.cookie(REFRESH_TOKEN, refreshToken, cookieOptions);
            res.cookie(IS_LOGGED_IN, true, {
                ...cookieOptions,
                httpOnly: false,
            });

            res.status(CREATED)
                .json({ user: objectNormalizer.normalize(user) });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const accessToken = req.cookies[ACCESS_TOKEN];

            await authService.deleteToken(accessToken, ACCESS);

            res.cookie(ACCESS_TOKEN, '', { maxAge: 1 });
            res.cookie(REFRESH_TOKEN, '', { maxAge: 1 });
            res.cookie(IS_LOGGED_IN, '', { maxAge: 1 });

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },

    getMe: async (req, res, next) => {
        try {
            const { authorizedUser } = req;
            const normalizedUser = objectNormalizer.normalize(authorizedUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },
};
