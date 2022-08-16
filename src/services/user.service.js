const { User } = require('../models');

module.exports = {
    getAll: () => User.find(),
    getById: (id) => User.findById(id),
    create: (user) => User.create(user),
    update: (id, dataToUpdate) => User.findByIdAndUpdate(id, dataToUpdate, { new: true }),
    delete: (id) => User.findByIdAndDelete(id),
};
