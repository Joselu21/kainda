const GenericControllers = require("./src/generic.controllers");
const Metas = require("./src/meta.class");
const KaindaModel = require("./src/model");
const Logger = require("./src/logger.class");
const KaindaUtils = require("./src/utils");
const { 
    ExceptionHandler, 
    KaindaException,
    GenericKaindaExceptionHandler,
    GenericKaindaExceptions
} = require("./src/exceptions");
const KaindaMiddlewareUtils = require("./src/middlewares.utils");
const AuthFunctions = require("./src/auth.functions");
const chalk = require("chalk");

module.exports = {
    KaindaModel,

    GenericControllers,
    Metas,
    Logger,
    ...KaindaUtils,

    KaindaException,
    ExceptionHandler,
    GenericKaindaExceptionHandler,
    GenericKaindaExceptions,
    
    ...KaindaMiddlewareUtils,
    ...AuthFunctions,
    chalk
};
