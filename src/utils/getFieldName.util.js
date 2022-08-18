const {
    databaseFields: {
        ACCESS_TOKEN,
        REFRESH_TOKEN,
    },
    tokenTypes: {
        ACCESS,
        REFRESH,
    },
} = require('../config');

module.exports = {
    tokenFieldName: (tokenType) => {
        switch (tokenType) {
            case ACCESS:
                return ACCESS_TOKEN;

            case REFRESH:
                return REFRESH_TOKEN;

            default:
                return '';
        }
    },
};
