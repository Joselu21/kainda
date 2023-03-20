const { getModels } = require("../../utils");
const KaindaException = require("./KaindaException");

/**
 * @imports KaindaException from ./KaindaException
 */

/**
 * Function that handles all exception types that are thrown by the application.
 * The exception must have a code and a message property. It is recommended to use the kainda standard.
 * @param {Error|KaindaException} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
 * @param {object} res The response object. Used to send the response to the client based on the error.
 * @returns {void} Returns nothing.
 * @example
 * const { GenericKaindaExceptionHandler, GenericKaindaExceptions } = require("kainda");
 * try {
 *  throw new GenericKaindaExceptions.Kainda400Exception();
 * } catch (error) {
 *  ExceptionHandler(error, res);
 * }
 */
function ExceptionHandler(error, res) {

    // If error is an array, extract the first element, it can happen on validation errors from Sequelize
    if (Array.isArray(error)) {
        error = error[0];
    }

    // If the error is a user-defined exception or a kainda generated exception
    const Models = getModels();
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
    let error_data = error;

    return res.status(error_code).json({
        error_type,
        error_message,
        error_data
    });

}

/**
 * Handles KaindaException objects by returning a JSON error response with the exception details.
 * @param {KaindaException} error - The KaindaException object to handle.
 * @param {object} res - The Express response object to send the error response to.
 * @returns {void} Returns nothing.
 * @example
 * const { GenericKaindaExceptionHandler, GenericKaindaExceptions } = require("kainda");
 * try {
 *  throw new GenericKaindaExceptions.Kainda400Exception();
 * } catch (error) {
 *  GenericKaindaExceptionHandler(error, res);
 * }
 */
function GenericKaindaExceptionHandler(error, res) {

    if (error instanceof KaindaException) {
        res.status(error?.response_code ?? error?.code ?? 500).json(error?.body ?? {
            error_type: error?.name,
            error_message: error?.message,
        });
    }

}

module.exports = {
    ExceptionHandler,
    GenericKaindaExceptionHandler
};