const { Comment } = require('../models');

module.exports = {
    getAll: () => Comment.find(),

    getOneByParam: (filter = {}) => Comment.findOne(filter),

    create: (data) => Comment.create(data),

    update: (id, data) => Comment.findByIdAndUpdate(id, data),

    delete: (filter = {}) => Comment.findOneAndDelete(filter),
};
