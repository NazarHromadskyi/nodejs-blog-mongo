const { Post } = require('../models');

module.exports = {
    getAll: () => Post.find(),

    create: (post) => Post.create(post),

    update: (id, dataToUpdate) => Post.findByIdAndUpdate(id, dataToUpdate, { new: true }),

    delete: (id) => Post.findByIdAndDelete(id),
};
