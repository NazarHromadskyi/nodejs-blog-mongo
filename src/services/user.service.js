const { User } = require('../models');

module.exports = {
    getAll: () => User.find(),
    create: (user) => User.create(user),
    update: (id, dataToUpdate) => User.findByIdAndUpdate(id, dataToUpdate, { new: true }),
    delete: (id) => User.findByIdAndDelete(id),
};
