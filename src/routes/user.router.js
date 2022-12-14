const router = require('express').Router();

const {
    fieldsName: {
        _ID,
    },
    searchParams: {
        PARAMS,
        USER_ID,
    },
    tokenTypes,
} = require('../config');
const { userController } = require('../controllers');
const {
    authMdlwr: {
        validateToken,
    },
    commonMdlwr: {
        getEntityByParams,
        isEntityPresent,
        validateByParam,
    },
    userMdlwr: {
        isActionOnHimself,
        isEmailUnique,
    },
} = require('../middlewares');
const {
    userValidator: {
        createUser,
        updateUser,
    },
} = require('../validators');
const { User } = require('../models');

router.get(
    '/',
    userController.getUsers,
);
router.post(
    '/',
    validateByParam(createUser),
    isEmailUnique,
    userController.createUser,
);

router.get(
    '/:userId',
    getEntityByParams(User, USER_ID, PARAMS, _ID),
    isEntityPresent,
    userController.getUserById,
);
router.patch(
    '/:userId',
    validateByParam(updateUser),
    validateToken(tokenTypes.ACCESS),
    getEntityByParams(User, USER_ID, PARAMS, _ID),
    isActionOnHimself,
    isEntityPresent,
    userController.updateUser,
);
router.delete(
    '/:userId',
    validateToken(tokenTypes.ACCESS),
    getEntityByParams(User, USER_ID, PARAMS, _ID),
    isActionOnHimself,
    isEntityPresent,
    userController.deleteUser,
);

module.exports = router;
