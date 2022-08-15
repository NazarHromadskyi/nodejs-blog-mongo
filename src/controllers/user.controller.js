const {
    statusCodes: {
        CREATED_OR_UPDATE,
        DELETED,
    },
} = require('../config');
const { User } = require('../models');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await User.create(req.body);

            res.status(CREATED_OR_UPDATE).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body);

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            await User.findByIdAndDelete(userId);

            res.sendStatus(DELETED);
        } catch (e) {
            next(e);
        }
    },
};
