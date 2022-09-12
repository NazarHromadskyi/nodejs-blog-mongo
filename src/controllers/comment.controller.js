const {
    statusCodes: {
        CREATED,
    },
} = require('../config');
const {
    commentService,
    postService,
    userService,
} = require('../services');
const { objectNormalizer } = require('../utils');
const { Post } = require('../models');

module.exports = {
    getAllForPost: async (req, res, next) => {
        try {
            const { entity } = req;
            const items = await commentService.getAllForPost(entity._id);
            const normalizedItems = items.map((item) => objectNormalizer.normalize(item));

            res.json(normalizedItems);
        } catch (e) {
            next(e);
        }
    },

    getLatest: async (req, res, next) => {
        try {
            const items = await commentService.getLatest();
            const normalizedItems = items.map((item) => objectNormalizer.normalize(item));

            res.json(normalizedItems);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {
                user,
                post,
            } = req.body;
            const createdItem = await commentService.create(req.body);

            await userService.update(user, {
                $push: {
                    comments: createdItem._id,
                },
            });
            await postService.update(post, {
                $push: {
                    comments: createdItem._id,
                },
            });

            res.status(CREATED)
                .json(createdItem);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const { commentId } = req.params;
            const updatedItem = await commentService.update(commentId, req.body);
            const normalizedItem = objectNormalizer.normalize(updatedItem);

            res.json(normalizedItem);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { entity } = req;

            await commentService.delete({ _id: entity._id });
            await userService.update(entity.user, {
                $pull: {
                    comments: entity._id,
                },
            });
            await postService.update(entity.post, {
                $pull: {
                    comments: entity._id,
                },
            });

            res.json();
        } catch (e) {
            next(e);
        }
    },
};
