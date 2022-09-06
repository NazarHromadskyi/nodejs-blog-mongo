const {
    constants: {
        IMAGE_MAX_SIZE,
        MIMETYPES,
    },
    messagesKeywords: {
        ALLOWED_IMG_FORMAT,
        MAX_SIZE_IMG,
        MISSED_IMG,
    },
    statusCodes: {
        BAD_REQUEST,
    },
} = require('../config');
const { ApiError } = require('../errors');
const { messageBuilder: { getMessage } } = require('../utils');

module.exports = {
    checkPostImage: (req, res, next) => {
        try {
            if (!req.files?.image) {
                throw new ApiError(BAD_REQUEST, getMessage(MISSED_IMG));
            }

            const { size, mimetype } = req.files.image;

            if (size > IMAGE_MAX_SIZE) {
                throw new ApiError(
                    BAD_REQUEST,
                    getMessage(MAX_SIZE_IMG, (size / (1024 ** 2)).toFixed(2).toString()),
                );
            }

            if (!MIMETYPES.IMAGE.includes(mimetype)) {
                throw new ApiError(BAD_REQUEST, getMessage(ALLOWED_IMG_FORMAT, mimetype));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
