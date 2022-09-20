require('dotenv').config();

const chalk = require('chalk');
const cors = require('cors');
const connectRedis = require('connect-redis');
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
    sessionRouter,
} = require('./routes');

const app = express();

// app.set('trust proxy', 1);
const RedisStore = connectRedis(sessions);
const redisClient = redis.createClient({
    legacyMode: true,
});

(async function () {
    await redisClient.connect();
}());

redisClient.on('error', (err) => {
    console.log(chalk.red(`Could not establish a connection with redis. ${err}`));
});
redisClient.on('connect', () => {
    console.log(chalk.greenBright('Connected to redis successfully'));
});

app.use(sessions({
    store: new RedisStore({ client: redisClient }),
    secret: variables.SESSIONS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: constants.ONE_DAY,
        secure: false,
        sameSite: 'lax',
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
app.use('/session', sessionRouter);

app.use('*', notFoundHandler);
app.use(errorHandler);

startApp();

async function startApp() {
    try {
        await connection.connectDb();

        app.listen(variables.PORT, () => {
            console.log(chalk.greenBright(`App listen port: ${variables.PORT}`));
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
