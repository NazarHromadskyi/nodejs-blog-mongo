const router = require('express').Router();

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
    getEntityByParams(User, 'email'),
    isEntityPresent,
    authController.login,
);

router.post(
    '/logout',
    validateAccessToken,
    authController.logout,
);

module.exports = router;
