const {
    messagesKeywords: {
        ACTION_ON_HIMSELF,
        ALREADY_EXIST_USER,
    },
    statusCodes: {
        BAD_REQUEST,
        FORBIDDEN,
    },
} = require('../config');
const { ApiError } = require('../errors');
const { User } = require('../models');
const { messageBuilder: { getMessage } } = require('../utils');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userFromDb = await User.findOne({ email });

            if (userFromDb) {
                throw new ApiError(BAD_REQUEST, getMessage(ALREADY_EXIST_USER, email));
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
                throw new ApiError(FORBIDDEN, getMessage(ACTION_ON_HIMSELF));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
