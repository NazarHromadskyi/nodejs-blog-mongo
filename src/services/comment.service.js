const { Comment } = require('../models');

module.exports = {
    getAllForPost: (postId) => Comment.find({ post: postId }),

    getOneByParam: (filter = {}) => Comment.findOne(filter),

    create: (data) => Comment.create(data),

    update: (id, data) => Comment.findByIdAndUpdate(id, data),

    delete: (filter = {}) => Comment.findOneAndDelete(filter),
};
