/**
 * Base class for all Kainda exceptions that are thrown by the application.
 * @param {*} options It can be a string or and object. If it is a string, it is the message of the exception. 
 * If it is an object, it is the full response body
 * @param {*} code The code of the exception. The response code, if not specified, it is the default of that exception class.
 */
class KaindaException extends Error {
    constructor(options, user_code = null) {
        if (typeof options === "string") {
            super(options);
            this.body = {
                message: options,
            }
        } else {
            super();
            if(options) {
                this.body = options;
            } 
        }
        if(user_code) {
            this.response_code = user_code;
        }
    }
}

/**
 * Function that handles all exception types that are thrown by the application.
 * The exception must have a code and a message property. It is recommended to use the kainda standard.
 * @param {*} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
 * @param {*} res The response object. Used to send the response to the client based on the error.
 * @returns Nothing. The function sends the response to the client.
 */
function ExceptionHandler(error, res) {

    // If the logs are active, log the error to the console
    // TODO: Log the error to a handler
    if (config.get("logging"))
        console.log(error);

    // If error is an array, extract the first element, it should not happen.
    if (Array.isArray(error))
        error = error[0];

    // If the error is a user-defined exception or a kainda generated exception
    if(Models) {
        let keys = Object.keys(Models);
        for (let key in keys) {
            if (Models[keys[key]] && Models[keys[key]].Exceptions[error.name] && error instanceof Models[keys[key]].Exceptions[error.name]) {
                return Models[keys[key]].Exceptions[keys[key] + "ExceptionHandler"](error, res);
            }
        }
    }

    // If the error is a Sequelize error
    if (error?.errors) {
        return res.status(500).send({
            reason: error.errors[0].message,
            attribute: error.errors[0].path,
        });
    
    // If the error is not handled correctly, send a generic error
    // NOTE: This should not happen, you must program your exceptions to be handled by this point
    } else {
        return res.status(418).send({
            message: "This should never happen, fck im a teapot",
            error: error.message
        });
    }

}

module.exports = {
    KaindaException,
    ExceptionHandler
};