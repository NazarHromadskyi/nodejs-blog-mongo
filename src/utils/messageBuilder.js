const {
    messagesKeywords: {
        INVALID_KEYWORD,
        MISSED_TOKEN,
        INVALID_TOKEN,
        NOT_FOUND_ENTITY,
        ALLOWED_IMG_FORMAT,
        MAX_SIZE_IMG,
        MISSED_IMG,
        ACTION_ON_HIMSELF,
        ALREADY_EXIST_USER,
        EMAIL_OR_PASS_WRONG,
    },
} = require('../config');

const messages = {
    [INVALID_KEYWORD]: 'Invalid keyword',

    [INVALID_TOKEN]: 'Invalid token',
    [MISSED_TOKEN]: 'Token missed',

    [NOT_FOUND_ENTITY]: 'Entity not found',

    [ALLOWED_IMG_FORMAT]: 'Only .jpeg, .jpg and .png format supported',
    [MAX_SIZE_IMG]: 'Image size is too big. Max size is 5 Mb. Your file size is:',
    [MISSED_IMG]: 'Image file missed',

    [ACTION_ON_HIMSELF]: 'You are not allowed to edit other users',
    [ALREADY_EXIST_USER]: 'User already exist',

    [EMAIL_OR_PASS_WRONG]: 'Email or password are wrong',
};

module.exports = {
    // eslint-disable-next-line arrow-body-style
    getMessage: (keyword, details = '') => {
        return `${messages[keyword]} (${details})` || messages[INVALID_KEYWORD];
    },
};
