const Joi = require('joi');

const createPost = Joi.object({
    title: Joi
        .string()
        .min(2)
        .trim()
        .required(),

    text: Joi
        .string()
        .min(2)
        .trim()
        .required(),

    tags: Joi
        .array()
        .required(),

    imageUrl: Joi
        .string()
        .trim(),

    user: Joi
        .string()
        .trim()
        .required(),
});

const updatePost = Joi.object({
    title: Joi
        .string()
        .alphanum()
        .min(2)
        .trim(),

    text: Joi
        .string()
        .alphanum()
        .min(2)
        .trim(),

    tags: Joi
        .array(),

    viewsCount: Joi
        .number()
        .min(0),
});

module.exports = {
    createPost,
    updatePost,
};
