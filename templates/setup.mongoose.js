/**
* IMPORTS 
*/
require('module-alias/register');
const ModelsService = require('@services/models.service');
const LogService = require('@services/log.service');
const DbService = require('@services/db.service');
const setupMiddlewares = require('./middlewares');
const express = require("express");
const kainda = require('kainda');
const config = require('config');
const https = require('http');

async function main() {
    // We run express which will provide us an execution environment
    let app = express();

    // Setup the logger
    LogService.init(config.get('logs'));

    // Setup the middlewares
    setupMiddlewares(app);

    // Critical database initialization
    const critical = config.get('databases').filter(db => db.description === 'critical')[0];
    await DbService.init(critical);

    // Make some configuration and utils globally available
    const Models = kainda.getModels();
    ModelsService.init(Models);

    // Seed database if needed
    if ((process.env.NODE_ENV !== 'production' && process.argv.includes('--seed'))) {
        DbService.seed(Models);
    }

    // Require the routes
    ModelsService.setupRoutes(app);

    /**
    * Server creation
    */
    const port = config.get('server.port');
    const host = config.get('server.host');
    let poll = true;
    const server = https.createServer(app);
    server.listen(port, host, (err) => {
        if (err) {
            LogService.StartLogger.error('__KAINDA__PROJECT__NAME___server_starts', err);
            process.exit(1);
        }
        LogService.StartLogger.info('__KAINDA__PROJECT__NAME___server_starts', `__KAINDA__PROJECT__NAME__ is running on ${host}:${port}`);
        poll = false;
    });

    while (poll) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(kainda.chalk.green("[SERVER] Server started on " + host + ":" + port));

    return app;

}

module.exports = main;