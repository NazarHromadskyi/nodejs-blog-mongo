const { statusCodes: { BAD_REQUEST } } = require('../config');
const { ErrorHandler } = require('../errors');
const { User } = require('../models');

module.exports = {
    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userFromDb = await User.findOne({ email });

            if (userFromDb) {
                throw new ErrorHandler(BAD_REQUEST, `Email: ${email} is already exist`);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
