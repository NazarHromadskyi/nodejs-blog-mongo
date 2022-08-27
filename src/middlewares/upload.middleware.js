const {
    constants: {
        IMAGE_MAX_SIZE,
        MIMETYPES,
    },
    statusCodes: {
        BAD_REQUEST,
    },
} = require('../config');
const { ApiError } = require('../errors');

module.exports = {
    checkPostImage: (req, res, next) => {
        try {
            if (!req.files?.image) {
                throw new ApiError(BAD_REQUEST, 'Image file missed');
            }

            const { size, mimetype } = req.files.image;

            if (size > IMAGE_MAX_SIZE) {
                throw new ApiError(BAD_REQUEST, 'Max image size is 5 Mb');
            }

            if (!MIMETYPES.IMAGE.includes(mimetype)) {
                throw new ApiError(BAD_REQUEST, 'Only .jpeg, .jpg and .png format supported');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
