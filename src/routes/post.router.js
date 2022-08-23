const router = require('express').Router();

const {
    fieldsName: {
        _ID,
    },
    searchParams: {
        POST_ID,
        PARAMS,
    },
} = require('../config');
const { postController } = require('../controllers');
const {
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
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.updatePost,
);
router.delete(
    '/:postId',
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.deletePost,
);
module.exports = router;
