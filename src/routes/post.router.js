const router = require('express').Router();

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

router.get(
    '/:postId',
    getEntityByParams(Post, 'postId', 'params', '_id'),
    isEntityPresent,
    postController.getPostById,
);
router.patch(
    '/:postId',
    getEntityByParams(Post, 'postId', 'params', '_id'),
    isEntityPresent,
    postController.updatePost,
);
router.delete(
    '/:postId',
    getEntityByParams(Post, 'postId', 'params', '_id'),
    isEntityPresent,
    postController.deletePost,
);
module.exports = router;
