const KaindaException = require("./../../KaindaException");
const GenericKaindaExceptionTemplates = require("./../../genericTemplates");

/**
 * Represents an exception for bad requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is invalid or incorrect.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda400Exception("This is a message");
 * @example throw new Kainda400Exception({ message: "This is a message" });
 * @example throw new Kainda400Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda400Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400|400 Bad Request}
*/
class Kainda400Exception extends KaindaException 
{
    name = "KaindaBadRequestException";
    response_code = this.response_code ?? 400;
    template = GenericKaindaExceptionTemplates.Kainda400Template;
}

/**
 * Represents an exception for unauthorized requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is not authorized.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda401Exception("This is a message");
 * @example throw new Kainda401Exception({ message: "This is a message" });
 * @example throw new Kainda401Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda401Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401|401 Unauthorized}
 */
class Kainda401Exception extends KaindaException 
{
    name = "KaindaUnauthorizedException";
    response_code = this.response_code ?? 401;
    template = GenericKaindaExceptionTemplates.Kainda401Template;
}

/**
 * Represents an exception for payment required requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client requires payment.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda402Exception("This is a message");
 * @example throw new Kainda402Exception({ message: "This is a message" });
 * @example throw new Kainda402Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda402Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402|402 Payment Required}
 */
class Kainda402Exception extends KaindaException 
{
    name = "KaindaPaymentRequiredException";
    response_code = this.response_code ?? 402;
    template = GenericKaindaExceptionTemplates.Kainda402Template;
}

/**
 * Represents an exception for forbidden requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is forbidden.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda403Exception("This is a message");
 * @example throw new Kainda403Exception({ message: "This is a message" });
 * @example throw new Kainda403Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda403Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403|403 Forbidden}
 */
class Kainda403Exception extends KaindaException 
{
    name = "KaindaForbiddenException";
    response_code = this.response_code ?? 403;
    template = GenericKaindaExceptionTemplates.Kainda403Template;
}

/**
 * Represents an exception for not found requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is not found.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda404Exception("This is a message");
 * @example throw new Kainda404Exception({ message: "This is a message" });
 * @example throw new Kainda404Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda404Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404|404 Not Found}
 */
class Kainda404Exception extends KaindaException 
{
    name = "KaindaNotFoundException";
    response_code = this.response_code ?? 404;
    template = GenericKaindaExceptionTemplates.Kainda404Template;
}

/**
 * Represents an exception for method not allowed requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is not allowed.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda405Exception("This is a message");
 * @example throw new Kainda405Exception({ message: "This is a message" });
 * @example throw new Kainda405Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda405Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405|405 Method Not Allowed}
 */
class Kainda405Exception extends KaindaException 
{
    name = "KaindaMethodNotAllowedException";
    response_code = this.response_code ?? 405;
    template = GenericKaindaExceptionTemplates.Kainda405Template;
}

/**
 * Represents an exception for not acceptable requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is not acceptable.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda406Exception("This is a message");
 * @example throw new Kainda406Exception({ message: "This is a message" });
 * @example throw new Kainda406Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda406Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406|406 Not Acceptable}
 */
class Kainda406Exception extends KaindaException 
{
    name = "KaindaNotAcceptableException";
    response_code = this.response_code ?? 406;
    template = GenericKaindaExceptionTemplates.Kainda406Template;
}

/**
 * Represents an exception for proxy authentication requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client requires proxy authentication.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda407Exception("This is a message");
 * @example throw new Kainda407Exception({ message: "This is a message" });
 * @example throw new Kainda407Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda407Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407|407 Proxy Authentication Required}
 */
class Kainda407Exception extends KaindaException 
{
    name = "KaindaProxyAuthenticationRequiredException";
    response_code = this.response_code ?? 407;
    template = GenericKaindaExceptionTemplates.Kainda407Template;
}

/**
 * Represents an exception for request timeout requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client times out.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda408Exception("This is a message");
 * @example throw new Kainda408Exception({ message: "This is a message" });
 * @example throw new Kainda408Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda408Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408|408 Request Timeout}
 */
class Kainda408Exception extends KaindaException 
{
    name = "KaindaRequestTimeoutException";
    response_code = this.response_code ?? 408;
    template = GenericKaindaExceptionTemplates.Kainda408Template;
}

/**
 * Represents an exception for conflict requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client conflicts with another request.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda409Exception("This is a message");
 * @example throw new Kainda409Exception({ message: "This is a message" });
 * @example throw new Kainda409Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda409Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409|409 Conflict}
 */
class Kainda409Exception extends KaindaException 
{
    name = "KaindaConflictException";
    response_code = this.response_code ?? 409;
    template = GenericKaindaExceptionTemplates.Kainda409Template;
}

/**
 * Represents an exception for gone requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is gone.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda410Exception("This is a message");
 * @example throw new Kainda410Exception({ message: "This is a message" });
 * @example throw new Kainda410Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda410Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410|410 Gone}
 */
class Kainda410Exception extends KaindaException 
{
    name = "KaindaGoneException";
    response_code = this.response_code ?? 410;
    template = GenericKaindaExceptionTemplates.Kainda410Template;
}

/**
 * Represents an exception for length required requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client requires a length.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda411Exception("This is a message");
 * @example throw new Kainda411Exception({ message: "This is a message" });
 * @example throw new Kainda411Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda411Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411|411 Length Required}
 */
class Kainda411Exception extends KaindaException 
{
    name = "KaindaLengthRequiredException";
    response_code = this.response_code ?? 411;
    template = GenericKaindaExceptionTemplates.Kainda411Template;
}

/**
 * Represents an exception for precondition failed requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client fails a precondition.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda412Exception("This is a message");
 * @example throw new Kainda412Exception({ message: "This is a message" });
 * @example throw new Kainda412Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda412Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412|412 Precondition Failed}
 */
class Kainda412Exception extends KaindaException 
{
    name = "KaindaPreconditionFailedException";
    response_code = this.response_code ?? 412;
    template = GenericKaindaExceptionTemplates.Kainda412Template;
}

/**
 * Represents an exception for payload too large requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is too large.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda413Exception("This is a message");
 * @example throw new Kainda413Exception({ message: "This is a message" });
 * @example throw new Kainda413Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda413Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413|413 Payload Too Large}
 */
class Kainda413Exception extends KaindaException 
{
    name = "KaindaPayloadTooLargeException";
    response_code = this.response_code ?? 413;
    template = GenericKaindaExceptionTemplates.Kainda413Template;
}

/**
 * Represents an exception for URI too long requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has a URI that is too long.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda414Exception("This is a message");
 * @example throw new Kainda414Exception({ message: "This is a message" });
 * @example throw new Kainda414Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda414Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414|414 URI Too Long}
 */
class Kainda414Exception extends KaindaException 
{
    name = "KaindaURITooLongException";
    response_code = this.response_code ?? 414;
    template = GenericKaindaExceptionTemplates.Kainda414Template;
}

/**
 * Represents an exception for unsupported media type requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has an unsupported media type.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda415Exception("This is a message");
 * @example throw new Kainda415Exception({ message: "This is a message" });
 * @example throw new Kainda415Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda415Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415|415 Unsupported Media Type}
 */
class Kainda415Exception extends KaindaException 
{
    name = "KaindaUnsupportedMediaTypeException";
    response_code = this.response_code ?? 415;
    template = GenericKaindaExceptionTemplates.Kainda415Template;
}

/**
 * Represents an exception for range not satisfiable requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has a range that is not satisfiable.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda416Exception("This is a message");
 * @example throw new Kainda416Exception({ message: "This is a message" });
 * @example throw new Kainda416Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda416Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416|416 Range Not Satisfiable}
 */
class Kainda416Exception extends KaindaException 
{
    name = "KaindaRangeNotSatisfiableException";
    response_code = this.response_code ?? 416;
    template = GenericKaindaExceptionTemplates.Kainda416Template;
}

/**
 * Represents an exception for expectation failed requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has an expectation that failed.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda417Exception("This is a message");
 * @example throw new Kainda417Exception({ message: "This is a message" });
 * @example throw new Kainda417Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda417Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417|417 Expectation Failed}
 */
class Kainda417Exception extends KaindaException 
{
    name = "KaindaExpectationFailedException";
    response_code = this.response_code ?? 417;
    template = GenericKaindaExceptionTemplates.Kainda417Template;
}

/**
 * Represents an exception for I'm a teapot requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should not be thrown. It is a joke exception. Kainda uses it to test the exception handling and for impossible cases.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda418Exception("This is a message");
 * @example throw new Kainda418Exception({ message: "This is a message" });
 * @example throw new Kainda418Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda418Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418|418 I'm a teapot}
 */
class Kainda418Exception extends KaindaException 
{
    name = "KaindaImATeapotException";
    response_code = this.response_code ?? 418;
    template = GenericKaindaExceptionTemplates.Kainda418Template;
}

/**
 * Represents an exception for misdirected requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is misdirected.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda421Exception("This is a message");
 * @example throw new Kainda421Exception({ message: "This is a message" });
 * @example throw new Kainda421Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda421Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421|421 Misdirected Request}
 */
class Kainda421Exception extends KaindaException 
{
    name = "KaindaMisdirectedException";
    response_code = this.response_code ?? 421;
    template = GenericKaindaExceptionTemplates.Kainda421Template;
}

/**
 * Represents an exception for unprocessable entity requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has an unprocessable entity.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda422Exception("This is a message");
 * @example throw new Kainda422Exception({ message: "This is a message" });
 * @example throw new Kainda422Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda422Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422|422 Unprocessable Entity}
 */
class Kainda422Exception extends KaindaException 
{
    name = "KaindaUnprocessableEntityException";
    response_code = this.response_code ?? 422;
    template = GenericKaindaExceptionTemplates.Kainda422Template;
}

/**
 * Represents an exception for locked requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is locked.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda423Exception("This is a message");
 * @example throw new Kainda423Exception({ message: "This is a message" });
 * @example throw new Kainda423Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda423Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423|423 Locked}
 */
class Kainda423Exception extends KaindaException 
{
    name = "KaindaLockedException";
    response_code = this.response_code ?? 423;
    template = GenericKaindaExceptionTemplates.Kainda423Template;
}

/**
 * Represents an exception for failed dependency requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has a failed dependency.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda424Exception("This is a message");
 * @example throw new Kainda424Exception({ message: "This is a message" });
 * @example throw new Kainda424Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda424Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424|424 Failed Dependency}
 */
class Kainda424Exception extends KaindaException 
{
    name = "KaindaFailedDependencyException";
    response_code = this.response_code ?? 424;
    template = GenericKaindaExceptionTemplates.Kainda424Template;
}

/**
 * Represents an exception for too early requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is too early.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda425Exception("This is a message");
 * @example throw new Kainda425Exception({ message: "This is a message" });
 * @example throw new Kainda425Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda425Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425|425 Too Early}
 */
class Kainda425Exception extends KaindaException 
{
    name = "KaindaTooEarlyException";
    response_code = this.response_code ?? 425;
    template = GenericKaindaExceptionTemplates.Kainda425Template;
}

/**
 * Represents an exception for upgrade required requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client requires an upgrade.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda426Exception("This is a message");
 * @example throw new Kainda426Exception({ message: "This is a message" });
 * @example throw new Kainda426Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda426Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426|426 Upgrade Required}
 */
class Kainda426Exception extends KaindaException 
{
    name = "KaindaUpgradeRequiredException";
    response_code = this.response_code ?? 426;
    template = GenericKaindaExceptionTemplates.Kainda426Template;
}

/**
 * Represents an exception for precondition required requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client requires a precondition.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda428Exception("This is a message");
 * @example throw new Kainda428Exception({ message: "This is a message" });
 * @example throw new Kainda428Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda428Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428|428 Precondition Required}
 */
class Kainda428Exception extends KaindaException 
{
    name = "KaindaPreconditionRequiredException";
    response_code = this.response_code ?? 428;
    template = GenericKaindaExceptionTemplates.Kainda428Template;
}

/**
 * Represents an exception for rate limit exceeded requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client is rate limited.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda429Exception("This is a message");
 * @example throw new Kainda429Exception({ message: "This is a message" });
 * @example throw new Kainda429Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda429Exception("This is a message", 500); 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429|429 Too Many Requests}
 */
class Kainda429Exception extends KaindaException 
{
    name = "KaindaTooManyRequestsException";
    response_code = this.response_code ?? 429;
    template = GenericKaindaExceptionTemplates.Kainda429Template;
}

/**
 * Represents an exception for request header fields too large requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the request made by the client has header fields that are too large.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda431Exception("This is a message");
 * @example throw new Kainda431Exception({ message: "This is a message" });
 * @example throw new Kainda431Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda431Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431|431 Request Header Fields Too Large}
 */
class Kainda431Exception extends KaindaException 
{
    name = "KaindaRequestHeaderFieldsTooLargeException";
    response_code = this.response_code ?? 431;
    template = GenericKaindaExceptionTemplates.Kainda431Template;
}

/**
 * Represents an exception for unavailable for legal reasons requests.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when a resource is unavailable for legal reasons.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda451Exception("This is a message");
 * @example throw new Kainda451Exception({ message: "This is a message" });
 * @example throw new Kainda451Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda451Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451|451 Unavailable For Legal Reasons}
 */
class Kainda451Exception extends KaindaException 
{
    name = "KaindaUnavailableForLegalReasonsException";
    response_code = this.response_code ?? 451;
    template = GenericKaindaExceptionTemplates.Kainda451Template;
}

module.exports = {
    Kainda400Exception,
    Kainda401Exception,
    Kainda402Exception,
    Kainda403Exception,
    Kainda404Exception,
    Kainda405Exception,
    Kainda406Exception,
    Kainda407Exception,
    Kainda408Exception,
    Kainda409Exception,
    Kainda410Exception,
    Kainda411Exception,
    Kainda412Exception,
    Kainda413Exception,
    Kainda414Exception,
    Kainda415Exception,
    Kainda416Exception,
    Kainda417Exception,
    Kainda418Exception,
    Kainda421Exception,
    Kainda422Exception,
    Kainda423Exception,
    Kainda424Exception,
    Kainda425Exception,
    Kainda426Exception,
    Kainda428Exception,
    Kainda429Exception,
    Kainda431Exception,
    Kainda451Exception
};