/**
* IMPORTS 
*/
const mongoose = require('mongoose');
const kainda = require('kainda');
const express = require("express");
const helmet = require("helmet");
const config = require('config');
const https = require('http');
const path = require('path');
const cors = require("cors");

async function main() {
    // We run express which will provide us an execution environment
    let app = express();

    // Setup the middlewares
    await setupMiddlewares(app);

    // Logger 
    const Logger = await setupLogger();
    global.Logger = Logger;

    // Critical database
    const mongoose = await setupCriticalDatabase();

    // Make some configuration and utils globally available
    global.mongoose = mongoose;
    global.Models = kainda.getModels();
    global.config = config;
    global.ExceptionHandler = kainda.ExceptionHandler;

    // Seed database if needed
    await seedDatabase();

    // Require the routes
    for (let model of Object.keys(Models)) {
        Models[model].Routes(app);
    }

    /**
    * Server creation
    */
    const port = config.get('server.port');
    const host = config.get('server.host');
    let poll = true;
    const server = https.createServer(app);
    server.listen(port, host, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        Logger.log('adi_server_starts', `adi_server is running on ${host}:${port}`);
        poll = false;
    });

    while(poll) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return app;

}

async function setupMiddlewares(app) {

    app.disable('x-powered-by');

    /**
     * We extract from the config file the cors options, where we specify which domains can cross request the api and which http methods can be used. 
     */
    let whitelist = config.get('cors.origin') ?? [];
    let corsOptions = {
        origin: whitelist,
        methods: config.get('cors.methods')
    };

    /**
     * Some middlewares added on initial configuration. These middlewares will execute once the petition reaches the server side.
     */
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(function (req, res, next) {
        const ip = req.headers['origin'];
        if (!kainda.blockByIP(ip, { whitelist: whitelist })) {
            console.log("[SECURITY] IP blocked: " + ip);
            return res.status(403).send({ message: 'Forbidden' });
        }
        next();
    });

    /**
     * Additional built-in middleware added for the express app
     */
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use((req, res, next) => {
        let oldSend = res.send
        res.send = function (data) {
            Logger.log('%%$PROJECT_NAME$%%_requests', {
                req: {
                    method: req.method,
                    headers: req.headers,
                    originalUrl: req.originalUrl,
                    ip: req.ip,
                    params: req.params,
                    query: req.query,
                    body: req.body,
                },
                res: {
                    headers: res.getHeaders(),
                    statusCode: res.statusCode,
                    body: data,
                }
            }, {
                ignoreConsole: true,
                ignoreFile: false,
            });
            res.send = oldSend
            return res.send(data)
        }
        next()
    });

}

async function setupLogger() {

    // Get the logging database
    const logging_config = config.get('databases').filter(db => db.description === 'logging')[0];

    if (!logging_config) {
        console.log("[CONFIG] Your configuration file is incorrect, you must specify a logging database");
    }

    const logging_uri = "mongodb://" + logging_config.username + ":" + encodeURIComponent(logging_config.password) + "@"
        + logging_config.host + ":" + logging_config.port
        + "/" + logging_config.database_name;

    // We start the logger database
    const Logger = new kainda.Logger("mongodb", {
        uri: logging_uri,
        options: logging_config.options ?? {},
        loggers: [
            new kainda.Logger("file", {
                full_path: path.join(__dirname + "/logs/"),
            }),
            new kainda.Logger("console", {})
        ]
    });

    return Logger;

}

async function setupCriticalDatabase() {
    // Get critical database
    const critical = config.get('databases').filter(db => db.description === 'critical')[0];

    if (!critical) {
        console.log("[CONFIG] Your configuration file is incorrect, you must specify a critical database");
        throw new Error("Your configuration file is incorrect, you must specify a critical database");
    }

    const uri = `mongodb://${critical.username}:${encodeURIComponent(critical.password)}@${critical.host}:${critical.port}/${critical.database_name}`;
    await mongoose.connect(uri, { useNewUrlParser: true, compressors: ['zstd'] });

}

async function seedDatabase() {

    if (process.env.NODE_ENV !== 'production' && process.argv.includes('seed')) {
        let transaction = await sequelize.transaction();
        try {
            console.log('[SEED] Seeding database...');
            for (let model of Object.keys(Models)) {
                await Models[model].Seeders.seed(transaction);
            }
            for (let model of Object.keys(Models)) {
                await Models[model].Seeders.associate(transaction);
            }
            await transaction.commit();
            console.log('[SEED] Database seeded successfully');
        } catch (error) {
            await transaction.rollback();
            console.log('[SEED] Error seeding database. Rolled back');
        }

    }

}

module.exports = main;