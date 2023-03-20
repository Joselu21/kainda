/**
* IMPORTS 
*/
require('module-alias/register');
const serveDocumentation = require('./doc/doc-serve');
const LogService = require('@services/log.service');
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

    // Critical database
    const mongoose = await setupCriticalDatabase();

    // Make some configuration and utils globally available
    global.mongoose = mongoose;
    global.Models = kainda.getModels();

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
        LogService.log('__KAINDA__PROJECT__NAME___server_starts', `__KAINDA__PROJECT__NAME__ is running on ${host}:${port}`);
        poll = false;
    });

    while (poll) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(kainda.chalk.green("[SERVER] Server started on " + host + ":" + port));

    // Serve the documentation
    serveDocumentation(app, '/doc', path.join(__dirname, '/doc/openapi.json'));

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
            LogService.log('__KAINDA__PROJECT__NAME___requests', {
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

async function setupCriticalDatabase() {
    // Get critical database
    const critical = config.get('databases').filter(db => db.description === 'critical')[0];

    if (!critical || (!critical.uri && (!critical.host || !critical.port || !critical.database_name))) {
        console.log(kainda.chalk.red("[CONFIG] Your configuration file is incorrect, you must specify a critical database"));
        process.exit(1);
    }

    const uri = critical.uri ?? `mongodb://${critical.username}:${encodeURIComponent(critical.password)}@${critical.host}:${critical.port}/${critical.database_name}`;
    const options = critical.options ?? {
        useNewUrlParser: true,
        compressors: ['zstd'],
        maxPoolSize: critical.pool?.max ?? 100,
        minPoolSize: critical.pool?.min ?? 10,
        serverSelectionTimeoutMS: critical.pool?.acquire ?? 5000,
        socketTimeoutMS: critical.pool?.idle ?? 30000,
    };

    return await mongoose.connect(uri, options);

}

async function seedDatabase() {

    if ((process.env.NODE_ENV !== 'production' && process.argv.includes('--seed')) || process.env.NODE_ENV === 'test') {
        let transaction = await mongoose.startSession();
        try {
            transaction.startTransaction();
            console.log(kainda.chalk.blue('[SEED] Seeding database...'));
            for (let model of Object.keys(Models)) {
                if (Models[model].Seeders.seed && typeof Models[model].Seeders.seed === 'function') {
                    await Models[model].Seeders.seed(transaction);
                } else if (Models[model].seed && typeof Models[model].seed === 'function') {
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