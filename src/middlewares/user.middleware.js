const { statusCodes: { BAD_REQUEST } } = require('../config');
const { ApiError } = require('../errors');
const { User } = require('../models');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userFromDb = await User.findOne({ email });

            if (userFromDb) {
                throw new ApiError(BAD_REQUEST, `Email: ${email} is already exist`);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
