module.exports = {
    AUTHORIZATION: 'Authorization',
    DEV_ENVIRONMENT: 'dev',
    PROD_ENVIRONMENT: 'prod',

    EMAIL_REGEXP: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    PASSWORD_REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,128})/,

    IMAGE_MAX_SIZE: 5 * 1024 * 1024,
    MIMETYPES: {
        IMAGE: [
            'image/jpeg',
            'image/png',
            'image/webp',
        ],
    },

    ONE_DAY: 24 * 60 * 60 * 1000,
};
