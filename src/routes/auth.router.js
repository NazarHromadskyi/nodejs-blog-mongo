const router = require('express').Router();

const { searchParams } = require('../config');
const { authController } = require('../controllers');
const {
    authMdlwr: {
        validateAccessToken,
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
    validateAccessToken,
    authController.logout,
);

module.exports = router;
