const {
    statusCodes: {
        BAD_REQUEST,
        FORBIDDEN,
    },
} = require('../config');
const { ApiError } = require('../errors');
const { User } = require('../models');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userFromDb = await User.findOne({ email });

            if (userFromDb) {
                throw new ApiError(BAD_REQUEST, 'User already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isActionOnHimself: async (req, res, next) => {
        try {
            const { authorizedUser } = req;
            const userToAction = req.entity;

            if (authorizedUser._id.toString() !== userToAction._id.toString()) {
                throw new ApiError(FORBIDDEN, 'You are not allowed to edit other users');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
