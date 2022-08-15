import { statusCodes } from '../config/index.js';

function notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message,
    });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodes.SERVER_ERROR)
        .json({
            message: err.message,
        });
}

export { notFoundError, errorHandler };
