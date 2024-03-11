/**
* IMPORTS 
*/
require("module-alias/register");
const DocumentationService = require("@services/documentation.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const setupMiddlewares = require("./middlewares");
const express = require("express");
const kainda = require("kainda");
const config = require("config");
const https = require("http");

async function main () 
{
    if(process.env.NODE_ENV === "documentation")
    {
        DocumentationService.generateDocumentation();
        return;
    }
    
    // We run express which will provide us an execution environment
    let app = express();

    // Setup the logger
    LogService.init(config.get("logs"));

    // Setup the middlewares
    setupMiddlewares(app);

    // Critical database initialization
    const critical = config.get("databases").filter(db => db.description === "critical")[ 0 ];
    await DbService.init(critical);

    // Make some configuration and utils globally available
    const Models = kainda.getModels();
    ModelsService.init(Models);

    // Seed database if needed
    if ((process.env.NODE_ENV !== "production" && process.argv.includes("--seed"))) 
    {
        DbService.seed(Models);
    }

    // Require the routes
    ModelsService.setupRoutes(app);

    // Add the documentation route to the express app
    DocumentationService.addDocumentationRouteToExpress(app);

    /**
    * Server creation
    */
    const port = config.get("server.port");
    const host = config.get("server.host");
    let poll = true;
    const server = https.createServer(app);
    server.listen(port, host, (err) => 
    {
        if (err) 
        {
            LogService.StartLogger.error(err);
            throw new Error("Error while starting the server: " + (err.message ?? "Possible EADDRINUSE"));
        }
        LogService.StartLogger.info(`suarte_backend is running on ${ host }:${ port }`);
        poll = false;
    });

    server.on("error", (err) => 
    {
        LogService.StartLogger.error(err);
        throw new Error("Error while starting the server: " + (err.message ?? "Possible EADDRINUSE"));
    });

    while (poll) 
    {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return app;

}

module.exports = main;