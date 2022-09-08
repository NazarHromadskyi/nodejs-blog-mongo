const {
    postService, userService,
    s3Service,
} = require('../services');
const { CREATED, DELETED } = require('../config/statusCodes');
const { objectNormalizer: { normalize } } = require('../utils');

module.exports = {
    getPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAllByFilter();
            const normalizedPosts = posts.map((post) => normalize(post));

            res.json(normalizedPosts);
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
            const items = await postService.getAllByFilter({ tags: tagName });
            const normalizedItems = items.map((item) => normalize(item));

            res.json(normalizedItems);
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
