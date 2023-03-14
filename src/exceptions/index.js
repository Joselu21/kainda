const KaindaException = require("./src/KaindaException");
const GenericKaindaExceptions = require("./src/genericExceptions");
const GenericKaindaExceptionTemplates = require("./src/genericTemplates");
const {
    GenericKaindaExceptionHandler,
    ExceptionHandler,
} = require("./src/handlers");

/**
 * Exports KaindaException class.
 * @type {KaindaException}
 */
module.exports.KaindaException = KaindaException;

/**
 * Exports all generic exception classes.
 * @type {Object}
 * @property {class} Kainda300Exception - Represents a multiple choices error.
 * @property {class} Kainda301Exception - Represents a moved permanently error.
 * @property {class} Kainda302Exception - Represents a found error.
 * @property {class} Kainda303Exception - Represents a see other error.
 * @property {class} Kainda304Exception - Represents a not modified error.
 * @property {class} Kainda307Exception - Represents a temporary redirect error.
 * @property {class} Kainda308Exception - Represents a permanent redirect error.
 * @property {class} Kainda400Exception - Represents a bad request error.
 * @property {class} Kainda401Exception - Represents an unauthorized error.
 * @property {class} Kainda402Exception - Represents a payment required error.
 * @property {class} Kainda403Exception - Represents a forbidden error.
 * @property {class} Kainda404Exception - Represents a not found error.
 * @property {class} Kainda405Exception - Represents a method not allowed error.
 * @property {class} Kainda406Exception - Represents a not acceptable error.
 * @property {class} Kainda407Exception - Represents a proxy authentication required error.
 * @property {class} Kainda408Exception - Represents a request timeout error.
 * @property {class} Kainda409Exception - Represents a conflict error.
 * @property {class} Kainda410Exception - Represents a gone error.
 * @property {class} Kainda411Exception - Represents a length required error.
 * @property {class} Kainda412Exception - Represents a precondition failed error.
 * @property {class} Kainda413Exception - Represents a payload too large error.
 * @property {class} Kainda414Exception - Represents a uri too long error.
 * @property {class} Kainda415Exception - Represents an unsupported media type error.
 * @property {class} Kainda416Exception - Represents a range not satisfiable error.
 * @property {class} Kainda417Exception - Represents an expectation failed error.
 * @property {class} Kainda418Exception - Represents an im a teapot error.
 * @property {class} Kainda421Exception - Represents a misdirected request error.
 * @property {class} Kainda422Exception - Represents an unprocessable entity error.
 * @property {class} Kainda423Exception - Represents a locked error.
 * @property {class} Kainda424Exception - Represents a failed dependency error.
 * @property {class} Kainda426Exception - Represents a upgrade required error.
 * @property {class} Kainda428Exception - Represents a precondition required error.
 * @property {class} Kainda429Exception - Represents a too many requests error.
 * @property {class} Kainda431Exception - Represents a request header fields too large error.
 * @property {class} Kainda451Exception - Represents a unavailable for legal reasons error.
 * @property {class} Kainda500Exception - Represents an internal server error.
 * @property {class} Kainda501Exception - Represents a not implemented error.
 * @property {class} Kainda502Exception - Represents a bad gateway error.
 * @property {class} Kainda503Exception - Represents a service unavailable error.
 * @property {class} Kainda504Exception - Represents a gateway timeout error.
 * @property {class} Kainda505Exception - Represents a http version not supported error.
 * @property {class} Kainda506Exception - Represents a variant also negotiates error.
 * @property {class} Kainda507Exception - Represents a insufficient storage error.
 * @property {class} Kainda508Exception - Represents a loop detected error.
 * @property {class} Kainda510Exception - Represents a not extended error.
 * @property {class} Kainda511Exception - Represents a network authentication required error.
 */
module.exports.GenericKaindaExceptions = GenericKaindaExceptions;

/**
 * Exports all generic exception templates.
 * @type {Object}
 * @property {function} Kainda300Template - Returns an object with the format { error_type: "Multiple Choices", error_message: "... ${message}" }.
 * @property {function} Kainda301Template - Returns an object with the format { error_type: "Moved Permanently", error_message: "... ${message}" }.
 * @property {function} Kainda302Template - Returns an object with the format { error_type: "Found", error_message: "... ${message}" }.
 * @property {function} Kainda303Template - Returns an object with the format { error_type: "See Other", error_message: "... ${message}" }.
 * @property {function} Kainda304Template - Returns an object with the format { error_type: "Not Modified", error_message: "... ${message}" }.
 * @property {function} Kainda306Template - Returns an object with the format { error_type: "Switch Proxy", error_message: "... ${message}" }.
 * @property {function} Kainda307Template - Returns an object with the format { error_type: "Temporary Redirect", error_message: "... ${message}" }.
 * @property {function} Kainda308Template - Returns an object with the format { error_type: "Permanent Redirect", error_message: "... ${message}" }.
 * @property {function} Kainda400Template - Returns an object with the format { error_type: "Bad Request", error_message: "... ${message}" }.
 * @property {function} Kainda401Template - Returns an object with the format { error_type: "Unauthorized", error_message: "... ${message}" }.
 * @property {function} Kainda402Template - Returns an object with the format { error_type: "Payment Required", error_message: "... ${message}" }.
 * @property {function} Kainda403Template - Returns an object with the format { error_type: "Forbidden", error_message: "... ${message}" }.
 * @property {function} Kainda404Template - Returns an object with the format { error_type: "Not Found", error_message: "... ${message}" }.
 * @property {function} Kainda405Template - Returns an object with the format { error_type: "Method Not Allowed", error_message: "... ${message}" }.
 * @property {function} Kainda406Template - Returns an object with the format { error_type: "Not Acceptable", error_message: "... ${message}" }.
 * @property {function} Kainda407Template - Returns an object with the format { error_type: "Proxy Authentication Required", error_message: "... ${message}" }.
 * @property {function} Kainda408Template - Returns an object with the format { error_type: "Request Timeout", error_message: "... ${message}" }.
 * @property {function} Kainda409Template - Returns an object with the format { error_type: "Conflict", error_message: "... ${message}" }.
 * @property {function} Kainda410Template - Returns an object with the format { error_type: "Gone", error_message: "... ${message}" }.
 * @property {function} Kainda411Template - Returns an object with the format { error_type: "Length Required", error_message: "... ${message}" }.
 * @property {function} Kainda412Template - Returns an object with the format { error_type: "Precondition Failed", error_message: "... ${message}" }.
 * @property {function} Kainda413Template - Returns an object with the format { error_type: "Payload Too Large", error_message: "... ${message}" }.
 * @property {function} Kainda414Template - Returns an object with the format { error_type: "URI Too Long", error_message: "... ${message}" }.
 * @property {function} Kainda415Template - Returns an object with the format { error_type: "Unsupported Media Type", error_message: "... ${message}" }.
 * @property {function} Kainda416Template - Returns an object with the format { error_type: "Range Not Satisfiable", error_message: "... ${message}" }.
 * @property {function} Kainda417Template - Returns an object with the format { error_type: "Expectation Failed", error_message: "... ${message}" }.
 * @property {function} Kainda418Template - Returns an object with the format { error_type: "I'm a teapot", error_message: "... ${message}" }.
 * @property {function} Kainda421Template - Returns an object with the format { error_type: "Misdirected Request", error_message: "... ${message}" }.
 * @property {function} Kainda422Template - Returns an object with the format { error_type: "Unprocessable Entity", error_message: "... ${message}" }.
 * @property {function} Kainda423Template - Returns an object with the format { error_type: "Locked", error_message: "... ${message}" }.
 * @property {function} Kainda424Template - Returns an object with the format { error_type: "Failed Dependency", error_message: "... ${message}" }.
 * @property {function} Kainda426Template - Returns an object with the format { error_type: "Upgrade Required", error_message: "... ${message}" }.
 * @property {function} Kainda428Template - Returns an object with the format { error_type: "Precondition Required", error_message: "... ${message}" }.
 * @property {function} Kainda429Template - Returns an object with the format { error_type: "Too Many Requests", error_message: "... ${message}" }.
 * @property {function} Kainda431Template - Returns an object with the format { error_type: "Request Header Fields Too Large", error_message: "... ${message}" }.
 * @property {function} Kainda451Template - Returns an object with the format { error_type: "Unavailable For Legal Reasons", error_message: "... ${message}" }.
 */
module.exports.GenericKaindaExceptionTemplates = GenericKaindaExceptionTemplates;

/**
 * Exports GenericKaindaExceptionHandler function.
 * @type {function}
 */
module.exports.GenericKaindaExceptionHandler = GenericKaindaExceptionHandler;

/**
 * Exports ExceptionHandler function.
 * @type {function}
 */
module.exports.ExceptionHandler = ExceptionHandler;