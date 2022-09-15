require('dotenv').config();

const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const sessions = require('express-session');
const redis = require('redis');

const {
    constants,
    statusCodes,
    variables,
} = require('./config');
const {
    ApiError,
    handlers: {
        errorHandler,
        notFoundHandler,
    },
} = require('./errors');
const { connection } = require('./database');
const {
    authRouter,
    postRouter,
    uploadRouter,
    userRouter,
} = require('./routes');

const redisClient = redis.createClient(variables.REDIS_PORT);

const app = express();

app.set('trust proxy', 1);
app.use(sessions({
    secret: variables.SESSIONS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: constants.ONE_DAY,
    },
}));

app.use(cors({ origin: configureCors, credentials: true }));

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === constants.DEV_ENVIRONMENT) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/upload', uploadRouter);
app.use('/users', userRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

startApp();

async function startApp() {
    try {
        await connection.connectDb();

        app.listen(variables.PORT, () => {
            console.log(`App listen port: ${variables.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

function configureCors(origin, callback) {
    const whiteList = variables.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env
        .NODE_ENV === constants.DEV_ENVIRONMENT) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(
            new ApiError(
                statusCodes.FORBIDDEN,
                `Origin '${origin}' not allowed by CORS`,
            ),
            false,
        );
    }

    return callback(null, true);
}
