const {
    postService, userService,
    s3Service,
} = require('../services');
const { CREATED, DELETED } = require('../config/statusCodes');
const { objectNormalizer: { normalize } } = require('../utils');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const results = await postService.getAll(req.query);
            const normalizedPosts = results.data.map((post) => normalize(post));

            res.json({ ...results, data: normalizedPosts });
        } catch (e) {
            next(e);
        }
    },

    getPostById: async (req, res, next) => {
        try {
            const { entity } = req;
            const normalizedItem = normalize(entity);

            res.json(normalizedItem);
        } catch (e) {
            next(e);
        }
    },

    getPostsByTag: async (req, res, next) => {
        try {
            const { tagName } = req.params;
            const results = await postService.getAll({ tags: tagName });
            const normalizedItems = results.data.map((item) => normalize(item));

            res.json({ ...results, data: normalizedItems });
        } catch (e) {
            next(e);
        }
    },

    getTags: async (req, res, next) => {
        try {
            const tags = await postService.getTags();

            res.json(tags);
        } catch (e) {
            next(e);
        }
    },

    createPost: async (req, res, next) => {
        try {
            const { user } = req.body;
            const createdPost = await postService.create(req.validEntity);

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
            const updatedPost = await postService.update(postId, req.validEntity);
            const normalizedPost = normalize(updatedPost);

            res.json(normalizedPost);
        } catch (e) {
            next(e);
        }
    },

    deletePost: async (req, res, next) => {
        try {
            const { entity } = req;

            await postService.delete(entity._id);
            await userService.update(entity.user, {
                $pull: {
                    posts: entity._id,
                },
            });

            if (entity.imageUrl) {
                await s3Service.deleteFile(entity.imageUrl);
            }

            res.status(DELETED).json();
        } catch (e) {
            next(e);
        }
    },
};
