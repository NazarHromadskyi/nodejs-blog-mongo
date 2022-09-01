const Joi = require('joi');

const create = Joi.object({
    text: Joi
        .string()
        .min(1)
        .trim()
        .required(),

    user: Joi
        .string()
        .trim()
        .required(),

    post: Joi
        .string()
        .trim()
        .required(),
});

const update = Joi.object({
    text: Joi
        .string()
        .min(1)
        .trim()
        .required(),
});

module.exports = {
    create,
    update,
};
