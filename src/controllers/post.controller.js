const { postService, userService } = require('../services');
const { CREATED } = require('../config/statusCodes');
const { objectNormalizer: { normalize } } = require('../utils');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAll();
            const normalizedPosts = posts.map((post) => normalize(post));

            res.json(normalizedPosts);
        } catch (e) {
            next(e);
        }
    },

    getPostById: async (req, res, next) => {
        try {
            const { entity } = req;

            res.json(entity);
        } catch (e) {
            next(e);
        }
    },

    createPost: async (req, res, next) => {
        try {
            const { user } = req.body;
            const createdPost = await postService.create(req.body);
            await userService.update(user, {
                $push: {
                    posts: createdPost._id,
                },
            });
            const normalizedPost = normalize(createdPost);

            res.status(CREATED).json(normalizedPost);
        } catch (e) {
            next(e);
        }
    },

    updatePost: async (req, res, next) => {
        try {
            const { postId } = req.params;
            const updatedPost = await postService.update(postId, req.body);
            const normalizedPost = normalize(updatedPost);

            res.json(normalizedPost);
        } catch (e) {
            next(e);
        }
    },

    deletePost: async (req, res, next) => {
        try {
            const { postId } = req.params;
            await postService.delete(postId);

            res.json();
        } catch (e) {
            next(e);
        }
    },
};
