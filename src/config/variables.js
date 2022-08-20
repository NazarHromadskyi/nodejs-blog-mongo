module.exports = {
    PORT: process.env.PORT || 8888,
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/',
    DATABASE_NAME: process.env.DATABASE_NAME || 'blog-db',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access_secret_key',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh_secret_key',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000;http://localhost:4200',
};
