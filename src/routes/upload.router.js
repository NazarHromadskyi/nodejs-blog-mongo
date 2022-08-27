const router = require('express')
    .Router();

const {
    tokenTypes: {
        ACCESS,
    },
    searchParams: {
        BODY,
        POST_ID,
        USER_ID,
    },
    fieldsName: {
        _ID,
    },
} = require('../config');
const { uploadController } = require('../controllers');
const {
    authMdlwr: {
        validateToken,
    },
    userMdlwr: {
        isActionOnHimself,
    },
    commonMdlwr: {
        getEntityByParams,
        isEntityPresent,
    },
    uploadMiddleware: { checkPostImage },
} = require('../middlewares');
const {
    Post,
    User,
} = require('../models');

router.post(
    '/image',
    checkPostImage,
    getEntityByParams(User, USER_ID, BODY, _ID),
    isEntityPresent,
    uploadController.uploadImage,
);

router.delete(
    '/image',
    validateToken(ACCESS),
    // getEntityByParams(Post, POST_ID, BODY, _ID),
    // isActionOnHimself,
    // isEntityPresent,
    uploadController.deleteImage,
);

module.exports = router;
