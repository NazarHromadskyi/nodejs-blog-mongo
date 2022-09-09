const {
    messagesKeywords: { NOT_FOUND_ENTITY },
    searchParams,
    statusCodes: { BAD_REQUEST, NOT_FOUND },
} = require('../config');
const { ApiError } = require('../errors');
const { messageBuilder } = require('../utils');

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
                throw new ApiError(NOT_FOUND, messageBuilder.getMessage(NOT_FOUND_ENTITY));
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
            const { error, value } = validator.validate(req[searchIn]);

            if (error) {
                throw new ApiError(BAD_REQUEST, error.details[0].message);
            }

            req.validEntity = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
