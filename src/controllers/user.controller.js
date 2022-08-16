const {
    statusCodes: {
        CREATED,
        DELETED,
    },
} = require('../config');
const { userService } = require('../services');
const { objectNormalizer: { normalize } } = require('../utils');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();
            const normalizedUsers = users.map((user) => normalize(user));

            res.json(normalizedUsers);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { entity } = req;
            const normalizedUser = normalize(entity);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.create(req.body);
            const normalizedUser = normalize(createdUser);

            res.status(CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const updatedUser = await userService.update(userId, req.body);
            const normalizedUser = normalize(updatedUser);

            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await userService.delete(userId);

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },
};
