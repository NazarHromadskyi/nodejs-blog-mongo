const router = require('express').Router();

const { searchParams, tokenTypes } = require('../config');
const { authController } = require('../controllers');
const {
    authMdlwr: {
        validateToken,
    },
    commonMdlwr: {
        getEntityByParams,
        isEntityPresent,
        validateByParam,
    },
} = require('../middlewares');
const { User } = require('../models');
const { userValidator } = require('../validators');

router.post(
    '/',
    validateByParam(userValidator.login),
    getEntityByParams(User, searchParams.EMAIL),
    isEntityPresent,
    authController.login,
);

router.post(
    '/logout',
    validateToken(tokenTypes.ACCESS),
    authController.logout,
);

router.post(
    '/refresh',
    validateToken(tokenTypes.REFRESH),
    authController.refresh,
);

module.exports = router;
