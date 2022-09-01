const mongoose = require('mongoose');

const {
    statusCodes,
    variables: {
        DATABASE_NAME,
        MONGO_CONNECTION,
    },
} = require('../config');
const { ApiError } = require('../errors');

module.exports = {
    connectDb: async () => {
        try {
            await mongoose.connect(`${MONGO_CONNECTION}${DATABASE_NAME}`);

            require('../models/ActionToken');
            require('../models/Comment');
            require('../models/OAuth');
            require('../models/Post');
            require('../models/User');

            console.log('Database connected');
        } catch (e) {
            throw new ApiError(statusCodes.SERVER_ERROR, e.message);
        }
    },
};
