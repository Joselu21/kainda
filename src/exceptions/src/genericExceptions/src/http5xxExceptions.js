const KaindaException = require("./../../KaindaException");
const GenericKaindaExceptionTemplates = require("./../../genericTemplates");

/**
 * Represents an exception for internal server errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda500Exception("This is a message");
 * @example throw new Kainda500Exception({ message: "This is a message" });
 * @example throw new Kainda500Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda500Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500|MDN Web Docs}
 */
class Kainda500Exception extends KaindaException 
{
    name = "KaindaInternalServerErrorException";
    response_code = 500;
    template = GenericKaindaExceptionTemplates.Kainda500Template;
}

/**
 * Represents an exception for not implemented errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda501Exception("This is a message");
 * @example throw new Kainda501Exception({ message: "This is a message" });
 * @example throw new Kainda501Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda501Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501|MDN Web Docs}
 */
class Kainda501Exception extends KaindaException 
{
    name = "KaindaNotImplementedException";
    response_code = 501;
    template = GenericKaindaExceptionTemplates.Kainda501Template;
}

/**
 * Represents an exception for bad gateway errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda502Exception("This is a message");
 * @example throw new Kainda502Exception({ message: "This is a message" });
 * @example throw new Kainda502Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda502Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502|MDN Web Docs}
 */
class Kainda502Exception extends KaindaException 
{
    name = "KaindaBadGatewayException";
    response_code = 502;
    template = GenericKaindaExceptionTemplates.Kainda502Template;
}

/**
 * Represents an exception for service unavailable errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda503Exception("This is a message");
 * @example throw new Kainda503Exception({ message: "This is a message" });
 * @example throw new Kainda503Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda503Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503|MDN Web Docs}
 */
class Kainda503Exception extends KaindaException 
{
    name = "KaindaServiceUnavailableException";
    response_code = 503;
    template = GenericKaindaExceptionTemplates.Kainda503Template;
}

/**
 * Represents an exception for gateway timeout errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda504Exception("This is a message");
 * @example throw new Kainda504Exception({ message: "This is a message" });
 * @example throw new Kainda504Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda504Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504|MDN Web Docs}
 */
class Kainda504Exception extends KaindaException 
{
    name = "KaindaGatewayTimeoutException";
    response_code = 504;
    template = GenericKaindaExceptionTemplates.Kainda504Template;
}

/**
 * Represents an exception for HTTP version not supported errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda505Exception("This is a message");
 * @example throw new Kainda505Exception({ message: "This is a message" });
 * @example throw new Kainda505Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda505Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505|MDN Web Docs}
 */
class Kainda505Exception extends KaindaException 
{
    name = "KaindaHTTPVersionNotSupportedException";
    response_code = 505;
    template = GenericKaindaExceptionTemplates.Kainda505Template;
}
/**
 * Represents an exception for variant also negotiates errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda506Exception("This is a message");
 * @example throw new Kainda506Exception({ message: "This is a message" });
 * @example throw new Kainda506Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda506Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506|MDN Web Docs}
 */
class Kainda506Exception extends KaindaException 
{
    name = "KaindaVariantAlsoNegotiatesException";
    response_code = 506;
    template = GenericKaindaExceptionTemplates.Kainda506Template;
}
/**
 * Represents an exception for insufficient storage errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda507Exception("This is a message");
 * @example throw new Kainda507Exception({ message: "This is a message" });
 * @example throw new Kainda507Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda507Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507|MDN Web Docs}
 */
class Kainda507Exception extends KaindaException 
{
    name = "KaindaInsufficientStorageException";
    response_code = 507;
    template = GenericKaindaExceptionTemplates.Kainda507Template;
}
/**
 * Represents an exception for loop detected errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda508Exception("This is a message");
 * @example throw new Kainda508Exception({ message: "This is a message" });
 * @example throw new Kainda508Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda508Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508|MDN Web Docs}
 */
class Kainda508Exception extends KaindaException 
{
    name = "KaindaLoopDetectedException";
    response_code = 508;
    template = GenericKaindaExceptionTemplates.Kainda508Template;
}

/**
 * Represents an exception for not extended errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda510Exception("This is a message");
 * @example throw new Kainda510Exception({ message: "This is a message" });
 * @example throw new Kainda510Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda510Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510|MDN Web Docs}
 */
class Kainda510Exception extends KaindaException 
{
    name = "KaindaNotExtendedException";
    response_code = 510;
    template = GenericKaindaExceptionTemplates.Kainda510Template;
}

/**
 * Represents an exception for network authentication required errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the server encounters an internal error.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda511Exception("This is a message");
 * @example throw new Kainda511Exception({ message: "This is a message" });
 * @example throw new Kainda511Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda511Exception("This is a message", 500);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511|MDN Web Docs}
 */
class Kainda511Exception extends KaindaException 
{
    name = "KaindaNetworkAuthenticationRequiredException";
    response_code = 511;
    template = GenericKaindaExceptionTemplates.Kainda511Template;
}

module.exports = {
    Kainda500Exception,
    Kainda501Exception,
    Kainda502Exception,
    Kainda503Exception,
    Kainda504Exception,
    Kainda505Exception,
    Kainda506Exception,
    Kainda507Exception,
    Kainda508Exception,
    Kainda510Exception,
    Kainda511Exception,
};