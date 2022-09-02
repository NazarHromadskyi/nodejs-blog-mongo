const router = require('express').Router();

const {
    fieldsName: {
        _ID,
    },
    searchParams: {
        COMMENT_ID,
        POST_ID,
        PARAMS,
    },
    tokenTypes: {
        ACCESS,
    },
} = require('../config');
const {
    postController,
    commentController,
} = require('../controllers');
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
        updatePost,
    },
    commentsValidator,
} = require('../validators');
const {
    Post,
    Comment,
} = require('../models');
const { BODY } = require('../config/searchParams');

// -- /POSTS
router.get('/', postController.getPosts);
router.post(
    '/',
    validateByParam(createPost),
    validateToken(ACCESS),
    postController.createPost,
);

// -- /POSTS/COMMENTS
router.get(
    '/comments',
    getEntityByParams(Post, POST_ID, BODY, _ID),
    isEntityPresent,
    commentController.getAllForPost,
);
router.post(
    '/comments',
    validateByParam(commentsValidator.create),
    validateToken(ACCESS),
    commentController.create,
);
router.patch(
    '/comments/:commentId',
    validateByParam(commentsValidator.update),
    validateToken(ACCESS),
    getEntityByParams(Comment, COMMENT_ID, PARAMS, _ID),
    isEntityPresent,
    commentController.update,
);
router.delete(
    '/comments/:commentId',
    validateToken(ACCESS),
    getEntityByParams(Comment, COMMENT_ID, PARAMS, _ID),
    isEntityPresent,
    commentController.delete,
);

// -- /POSTS/TAGS
router.get('/tags', postController.getTags);

// -- /POSTS/:POST_ID
router.get(
    '/:postId',
    getEntityByParams(Post, POST_ID, PARAMS, _ID),
    isEntityPresent,
    postController.getPostById,
);
router.patch(
    '/:postId',
    validateByParam(updatePost),
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
