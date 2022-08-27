const router = require('express').Router();

const {
    fieldsName: {
        _ID,
    },
    searchParams: {
        POST_ID,
        PARAMS,
    },
    tokenTypes: {
        ACCESS,
    },
} = require('../config');
const { postController } = require('../controllers');
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
const {
    postValidator: {
        createPost,
    },
} = require('../validators');
const { Post } = require('../models');

router.get('/', postController.getPosts);
router.post(
    '/',
    validateByParam(createPost),
    validateToken(ACCESS),
    postController.createPost,
);

router.get('/tags', postController.getTags);

router.get(
    '/:postId',
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.getPostById,
);
router.patch(
    '/:postId',
    validateToken(ACCESS),
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.updatePost,
);
router.delete(
    '/:postId',
    validateToken(ACCESS),
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.deletePost,
);

module.exports = router;
