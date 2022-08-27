module.exports = {
    PORT: process.env.PORT || 8888,
    MONGO_CONNECTION: process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/',
    DATABASE_NAME: process.env.DATABASE_NAME || 'blog-db',

    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'access_secret_key',
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'refresh_secret_key',

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:3000;http://localhost:4200',
    COOKIE_SECRET_KEY: process.env.COOKIE_SECRET_KEY || 'cookie_secret_key',

    BUCKET_NAME: process.env.BUCKET_NAME,
    BUCKET_REGION: process.env.BUCKET_REGION,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
};
