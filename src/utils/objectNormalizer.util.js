const {
    databaseFields: {
        _ID, __V, PASSWORD,
    },
} = require('../config');

module.exports = {
    normalize: (userToNormalize) => {
        const fieldsToRemove = [
            PASSWORD,
            __V,
            _ID,
        ];
        const normalizedUser = userToNormalize.toJSON();

        fieldsToRemove.forEach((field) => {
            delete normalizedUser[field];
        });

        return normalizedUser;
    },
};
