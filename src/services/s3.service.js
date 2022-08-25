const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid');

const {
    variables: {
        BUCKET_REGION,
        BUCKET_NAME,
        ACCESS_KEY_ID,
        SECRET_ACCESS_KEY,
    },
} = require('../config');

const Bucket = new S3({
    region: BUCKET_REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
});

module.exports = {
    uploadFile: (file, fileType, fileId) => {
        const { data, mimetype, name } = file;

        const uploadFilePath = filePathBuilder(name, fileType, fileId.toString());

        return Bucket
            .upload({
                Bucket: BUCKET_NAME,
                Body: data,
                Key: uploadFilePath,
                ContentType: mimetype,
            })
            .promise();
    },

    deleteFile: (filePath) => {
        const Key = filePath.split('.com/')[1];

        return Bucket
            .deleteObject({
                Bucket: BUCKET_NAME,
                Key,
            })
            .promise();
    },
};

function filePathBuilder(fileName, fileType, fileId) {
    const fileExtension = path.extname(fileName);

    return `${fileType}/${fileId}/${uuid.v4()}${fileExtension}`;
}
