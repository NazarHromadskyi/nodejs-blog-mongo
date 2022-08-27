const {
    itemsTypesS3: { POSTS },
    statusCodes: { DELETED },
} = require('../config');
const { s3Service } = require('../services');

module.exports = {
    uploadImage: async (req, res, next) => {
        try {
            const { entity, files: { image } } = req;

            const s3Response = await s3Service.uploadFile(image, POSTS, entity._id);

            res.json(s3Response.Location);
        } catch (e) {
            next(e);
        }
    },

    deleteImage: async (req, res, next) => {
        try {
            const { imageUrl } = req.body;

            await s3Service.deleteFile(imageUrl);

            res.status(DELETED).json('Image deleted');
        } catch (e) {
            next(e);
        }
    },
};
