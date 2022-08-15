module.exports = {
    normalize: (userToNormalize) => {
        const fieldsToRemove = [
            'password',
            '__v',
            '_id',
        ];
        const normalizedUser = userToNormalize.toJSON();

        fieldsToRemove.forEach((field) => {
            delete normalizedUser[field];
        });

        return normalizedUser;
    },
};
