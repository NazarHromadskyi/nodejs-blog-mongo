const {
    searchParams,
    statusCodes: { BAD_REQUEST },
} = require('../config');
const { ApiError } = require('../errors');
const { NOT_FOUND } = require('../config/statusCodes');

module.exports = {
    getEntityByParams: (
        Model,
        paramName,
        searchIn = searchParams.BODY,
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
                throw new ApiError(NOT_FOUND, 'Entity not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateByParam: (
        validator,
        searchIn = searchParams.BODY,
    ) => (req, res, next) => {
        try {
            const { error } = validator.validate(req[searchIn]);

            if (error) {
                throw new ApiError(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
