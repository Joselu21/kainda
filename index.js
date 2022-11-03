const GenericControllers = require("./src/generic.controllers");
const Metas = require("./src/meta.class");
const Logger = require("./src/logger.class");
const KaindaUtils = require("./src/utils");
const { ExceptionHandler, KaindaException } = require("./src/exceptions");
const KaindaMiddlewareUtils = require("./src/middlewares.utils");
const AuthFunctions = require("./src/auth.functions");
const chalk = require("chalk");

module.exports = {
    GenericControllers,
    Metas,
    Logger,
    ...KaindaUtils,
    ExceptionHandler,
    KaindaException,
    ...KaindaMiddlewareUtils,
    ...AuthFunctions,
    chalk
};
