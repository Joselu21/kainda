/**
* IMPORTS 
*/
require('module-alias/register');   
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
        for (let route of Object.keys(Models[model].Routes)) {
            Models[model].Routes[route](app);
        }
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
            console.log(kainda.chalk.red(err));
            process.exit(1);
        }
        Logger.log('__KAINDA__PROJECT__NAME___server_starts', `__KAINDA__PROJECT__NAME__ is running on ${host}:${port}`);
        poll = false;
    });

    while (poll) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(kainda.chalk.green("[SERVER] Server started on " + host + ":" + port));


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
            console.log(kainda.chalk.red("[SECURITY] IP blocked: " + ip));
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
            Logger.log('__KAINDA__PROJECT__NAME___requests', {
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
        console.log(kainda.chalk.yellow("[CONFIG] Your configuration file is incorrect, you must specify a logging database or disable database logging"));

        // Log only to file and console
        const Logger = new kainda.Logger("file", {
            full_path: path.join(__dirname + "/logs/"),
            loggers: [
                new kainda.Logger("console", {})
            ]
        });

        return Logger;

    }

    const logging_uri = "mongodb://" + logging_config.username + ":" + encodeURIComponent(logging_config.password) + "@"
        + logging_config.host + ":" + logging_config.port
        + "/" + logging_config.database_name;

    // We start the logger database, and log also to file and to console
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

    if (!critical || !critical.host || !critical.port || !critical.database_name) {
        console.log(kainda.chalk.red("[CONFIG] Your configuration file is incorrect, you must specify a critical database"));
        process.exit(1);
    }

    const uri = `mongodb://${critical.username}:${encodeURIComponent(critical.password)}@${critical.host}:${critical.port}/${critical.database_name}`;
    return await mongoose.connect(uri, { useNewUrlParser: true, compressors: ['zstd'] });

}

async function seedDatabase() {

    if ((process.env.NODE_ENV !== 'production' && process.argv.includes('--seed')) || process.env.NODE_ENV === 'test') {
        let transaction = await mongoose.startSession();
        try {
            transaction.startTransaction();
            console.log(kainda.chalk.blue('[SEED] Seeding database...'));
            for (let model of Object.keys(Models)) {
                if(Models[model].Seeders.seed && typeof Models[model].Seeders.seed === 'function'){
                    await Models[model].Seeders.seed(transaction);
                } else if (Models[model].seed && typeof Models[model].seed === 'function'){
                    await Models[model].seed(null, { transaction });
                }            
            }
            await transaction.commitTransaction();
            console.log(kainda.chalk.green('[SEED] Database seeded successfully'));
        } catch (error) {
            await transaction.abortTransaction();
            console.log(kainda.chalk.red('[SEED] Error seeding database. Rolled back'));
        }

    }

}

module.exports = main;