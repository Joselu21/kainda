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

    static fromTemplate(params, code = null, override_template = null) {
        let auxError = new this(params, code);
        if (override_template) {
            auxError.body = override_template(params);
        } else if (auxError.template && typeof auxError.template === "function"){
            auxError.body = auxError.template(params);
        } else {
            throw new KaindaException("The exception does not have a template function.");
        }
        return auxError;
    }
}

module.exports = KaindaException;