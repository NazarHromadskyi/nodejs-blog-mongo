const {
    databaseFields: {
        __V, PASSWORD,
    },
} = require('../config');

module.exports = {
    normalize: (userToNormalize) => {
        const fieldsToRemove = [
            PASSWORD,
            __V,
        ];
        const normalizedUser = userToNormalize.toJSON();

        fieldsToRemove.forEach((field) => {
            delete normalizedUser[field];
        });

        return normalizedUser;
    },
};
