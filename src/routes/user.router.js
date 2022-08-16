const router = require('express').Router();

const { userController } = require('../controllers');
const {
    commonMdlwr: {
        getEntityByParams,
        isEntityPresent,
        validateByParam,
    },
    userMdlwr: {
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

router.get('/', userController.getUsers);
router.post(
    '/',
    validateByParam(createUser),
    isEmailUnique,
    userController.createUser,
);

router.get(
    '/:userId',
    getEntityByParams(User, 'userId', 'params', '_id'),
    isEntityPresent,
    userController.getUserById,
);
router.patch(
    '/:userId',
    validateByParam(updateUser),
    getEntityByParams(User, 'userId', 'params', '_id'),
    isEntityPresent,
    userController.updateUser,
);
router.delete(
    '/:userId',
    getEntityByParams(User, 'userId', 'params', '_id'),
    isEntityPresent,
    userController.deleteUser,
);

module.exports = router;
