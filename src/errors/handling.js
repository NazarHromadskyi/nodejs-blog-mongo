const { statusCodes } = require('../config');

module.exports = {
    notFoundError: (err, req, res, next) => {
        next({
            status: err.status || statusCodes.NOT_FOUND,
            message: err.message,
        });
    },

    // eslint-disable-next-line no-unused-vars
    errorHandler: (err, req, res, next) => {
        res
            .status(err.status || statusCodes.SERVER_ERROR)
            .json({
                message: err.message,
            });
    },
};
