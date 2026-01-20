const GenericControllers = require("./src/generic.controllers.js");
const KaindaModel = require("./src/model/index.js");
const KaindaTransaction = require("./src/model/src/transaction/transaction.js");
const KaindaUtils = require("./src/utils.js");
const {
    ExceptionHandler,
    KaindaException,
    GenericKaindaExceptionHandler,
    GenericKaindaExceptions,
} = require("./src/exceptions/index.js");

const { KaindaMiddlewares, KaindaMiddlewareUtils } = require(
    "./src/middlewares.utils.js",
);
const AuthFunctions = require("./src/auth.functions.js");
const chalk = require("chalk");

module.exports = {
    KaindaModel,
    KaindaTransaction,

    GenericControllers,
    ...KaindaUtils,

    KaindaException,
    ExceptionHandler,
    GenericKaindaExceptionHandler,
    GenericKaindaExceptions,

    ...KaindaMiddlewareUtils,
    ...KaindaMiddlewares,
    ...AuthFunctions,
    chalk,
};
