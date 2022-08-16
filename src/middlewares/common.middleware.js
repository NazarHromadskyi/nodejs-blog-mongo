const { statusCodes: { BAD_REQUEST } } = require('../config');
const { ErrorHandler } = require('../errors');
const { NOT_FOUND } = require('../config/statusCodes');

module.exports = {
    getEntityByParams: (
        Model,
        paramName,
        searchIn,
        dbField = paramName,
    ) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            req.entity = await Model.findOne({ [dbField]: value });
            next();
        } catch (e) {
            next(e);
        }
    },

    isEntityPresent: (req, res, next) => {
        try {
            const { entity } = req;

            if (!entity) {
                throw new ErrorHandler(NOT_FOUND, 'Entity not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateByParam: (validator, searchIn = 'body') => (req, res, next) => {
        try {
            const { error } = validator.validate(req[searchIn]);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
