/**
 * Represents a Kainda exception that is thrown by the application.
 *
 * @typedef {Error} KaindaException
 * @property {Object} body - The response body of the exception.
 * @property {string} body.message - The message of the exception.
 * @property {number} response_code - The HTTP status code of the exception.
 * @export KaindaException
 */

/**
 * Base class for all Kainda exceptions that are thrown by the application.
 * @extends Error
 */
class KaindaException extends Error {

    /**
     * Creates a new KaindaException. 
     * @param {string|Object} options It can be a string or and object. If it is a string, it is the message of the exception. If it is an object, it is the full response body.
     * @param {number} [user_code=null] The HTTP status code of the exception. The response code, if not specified, it is the default of that exception class.
     */
    constructor(options, user_code = null) {
        if (typeof options === "string") {
            super(options);
            this.body = {
                message: options,
            }
        } else {
            super();
            if (options) {
                this.body = options;
            }
        }
        if (user_code) {
            this.response_code = user_code;
        }
    }
}

/**
 * Function that handles all exception types that are thrown by the application.
 * The exception must have a code and a message property. It is recommended to use the kainda standard.
 * @param {Error|KaindaException} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
 * @param {*} res The response object. Used to send the response to the client based on the error.
 * @returns {void} Returns nothing.
 */
function ExceptionHandler(error, res) {

    // If the logs are active, log the error to the console
    if (config.get("logging")) {
        if (Logger) {
            Logger.log("exceptions", error);
        } else {
            console.log(error);
        }
    }

    // If error is an array, extract the first element, it should not happen.
    if (Array.isArray(error))
        error = error[0];

    // If the error is a user-defined exception or a kainda generated exception
    if (error instanceof KaindaException) {
        if (Models) {
            let keys = Object.keys(Models);
            for (let key in keys) {
                if (Models[keys[key]] && Models[keys[key]].Exceptions[error.name] && error instanceof Models[keys[key]].Exceptions[error.name]) {
                    return Models[keys[key]].Exceptions[keys[key] + "ExceptionHandler"](error, res);
                }
            }
        }
        return res.status(error.response_code).json(error.body);
    }

    let error_type = "GENERIC_ERROR";
    let error_message = "An unknown error has occurred";
    let error_code = 418;
    let error_data = null;

    // If the error is a Sequelize error
    if ((sequelize && error instanceof sequelize.Error) || (error?.name && error.name === "SequelizeBaseError")) {

        error_type = "SEQUELIZE_ERROR";
        error_message = error.errors[0]?.message ?? "Sequelize error";
        error_code = 500;
        error_data = error.errors[0];

        // MongoDB error
    } else if ((mongoose && error instanceof mongoose.Error) || (error?.name && error.name === "MongooseError")) {

        error_type = "MONGOOSE_ERROR";
        error_message = error.message ?? "Mongoose error";
        error_code = 500;
        error_data = error;

    }

    return res.status(error_code).json({
        error_type,
        error_message,
        error_data
    });

}

function GenericKaindaExceptionHandler(error, res) {

    if (error instanceof KaindaException) {
        res.status(error.response_code ?? error.code).json(error.body ?? {
            error_type: error.name,
            error_message: error.message,
        });
    } 

}

class Kainda400Exception extends KaindaException { name = "KaindaBadRequestException"; response_code = 400; }
class Kainda401Exception extends KaindaException { name = "KaindaUnauthorizedException"; response_code = 401; }
class Kainda403Exception extends KaindaException { name = "KaindaForbiddenException"; response_code = 403; }
class Kainda404Exception extends KaindaException { name = "KaindaNotFoundException"; response_code = 404; }
class Kainda409Exception extends KaindaException { name = "KaindaConflictException"; response_code = 409; }
class Kainda418Exception extends KaindaException { name = "KaindaImATeapotException"; response_code = 418; }
class Kainda429Exception extends KaindaException { name = "KaindaTooManyRequestsException"; response_code = 429; }
class Kainda500Exception extends KaindaException { name = "KaindaInternalServerErrorException"; response_code = 500; }
class Kainda501Exception extends KaindaException { name = "KaindaNotImplementedException"; response_code = 501; }
class Kainda502Exception extends KaindaException { name = "KaindaBadGatewayException"; response_code = 502; }
class Kainda503Exception extends KaindaException { name = "KaindaServiceUnavailableException"; response_code = 503; }

module.exports = {
    KaindaException,
    ExceptionHandler,
    GenericKaindaExceptionHandler,
    GenericKaindaExceptions : {
        Kainda400Exception,
        Kainda401Exception,
        Kainda403Exception,
        Kainda404Exception,
        Kainda409Exception,
        Kainda418Exception,
        Kainda429Exception,
        Kainda500Exception,
        Kainda501Exception,
        Kainda502Exception,
        Kainda503Exception,
    }
};