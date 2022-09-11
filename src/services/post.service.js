const { Post } = require('../models');

module.exports = {
    getAll: async (query = {}) => {
        const {
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const perPage = 5;
        const orderBy = order === 'asc' ? -1 : 1;
        const filterObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'title': {
                    filterObject.title = { $regex: `${filters.title}`, $options: 'gi' }; // todo about gi
                    break;
                }
                default: {
                    filterObject[filterParam] = filters[filterParam];
                }
            }
        });

        const posts = await Post
            .find(filterObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page - 1) * perPage);

        const totalResults = await Post.countDocuments(filterObject);
        const totalPages = Math.ceil(totalResults / perPage);

        return {
            page: +page,
            totalPages,
            totalResults,
            data: posts,
        };
    },

    getTags: async () => {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

        return posts.map((post) => post.tags).flat().slice(0, 5);
    },

    create: (post) => Post.create(post),

    update: (id, dataToUpdate) => Post.findByIdAndUpdate(id, dataToUpdate, { new: true }),

    delete: (id) => Post.findByIdAndDelete(id),
};
