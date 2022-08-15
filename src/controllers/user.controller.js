const {
    statusCodes: {
        CREATED_OR_UPDATE,
        DELETED,
    },
} = require('../config');
const { userService } = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await userService.create(req.body);

            res.status(CREATED_OR_UPDATE).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const updatedUser = await userService.update(userId, req.body);

            res.json(updatedUser);
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
