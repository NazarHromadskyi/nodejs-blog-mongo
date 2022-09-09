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
        .items(Joi.string().trim().lowercase())
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
        .min(2)
        .trim(),

    text: Joi
        .string()
        .min(2)
        .trim(),

    imageUrl: Joi
        .string()
        .trim(),

    tags: Joi
        .array()
        .items(Joi.string().trim().lowercase()),

    viewsCount: Joi
        .number()
        .min(0),

    user: Joi
        .string()
        .trim(),
});

module.exports = {
    createPost,
    updatePost,
};
