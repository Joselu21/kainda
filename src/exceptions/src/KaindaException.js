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
 * @class KaindaException
 * @extends Error
 */
class KaindaException extends Error 
{

    /**
     * Creates a new KaindaException. 
     * @param {string|Object} options It can be a string or and object. If it is a string, it is the message of the exception. If it is an object, it is the full response body.
     * @param {number} [user_code=null] The HTTP status code of the exception. The response code, if not specified, it is the default of that exception class.
     * @returns {KaindaException} The KaindaException instance.
     * @memberof KaindaException
     * @example throw new KaindaException("This is a message");
     * @example throw new KaindaException({ message: "This is a message" });
     * @example throw new KaindaException({ message: "This is a message", other: "other" });
     * @example throw new KaindaException("This is a message", 500);
     */
    constructor(options, user_code = null) 
    {
        super(typeof options === "string" ? options : undefined);
        this.body = typeof options === "object" ? options : { message: options };
        if (user_code) 
        {
            this.response_code = user_code;
        }
    }

    /**
     * Creates a new error instance from the provided template.
     * @param {Object} params - The parameters object.
     * @param {number} [code=null] - The HTTP status code of the error.
     * @param {Function} [override_template=null] - A custom function to generate the error body.
     * @returns {Object} - The error object.
     * @throws {KaindaException} - If the error does not have a template function.
     * @static
     * @memberof KaindaException
     * @example throw SubClassOfKaindaException.fromTemplate({ param1: "value1", param2: "value2" });
     * @example throw SubClassOfKaindaException.fromTemplate({ param1: "value1", param2: "value2" }, 500);
     * @example throw SubClassOfKaindaException.fromTemplate({ param1: "value1", param2: "value2" }, 500, (params) => { return { message: `Custom message with ${params.param1} and ${params.param2}` } });
     */
    static fromTemplate(params, code = null, override_template = null) 
    {
        const auxError = new this(params, code);
        const templateFn = override_template || auxError.template;

        if (templateFn && typeof templateFn === "function") 
        {
            auxError.body = templateFn(params);
        }
        else 
        {
            throw new KaindaException("The exception does not have a template function.");
        }

        return auxError;
    }

}

module.exports = KaindaException;