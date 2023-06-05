const KaindaException = require("./../../KaindaException");
const GenericKaindaExceptionTemplates = require("./../../genericTemplates");

/**
 * Represents an exception for multiple choices errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the client has requested a resource that has multiple choices available.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda300Exception("This is a message");
 * @example throw new Kainda300Exception({ message: "This is a message" });
 * @example throw new Kainda300Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda300Exception("This is a message", 300);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300|MDN Web Docs}
 */
class Kainda300Exception extends KaindaException 
{
    name = "KaindaMultipleChoicesException";
    response_code = 300;
    template = GenericKaindaExceptionTemplates.Kainda300Template;
}

/**
 * Represents an exception for moved permanently errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource has been permanently moved to a new location.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda301Exception("This is a message");
 * @example throw new Kainda301Exception({ message: "This is a message" });
 * @example throw new Kainda301Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda301Exception("This is a message", 301);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301|MDN Web Docs}
 */
class Kainda301Exception extends KaindaException 
{
    name = "KaindaMovedPermanentlyException";
    response_code = 301;
    template = GenericKaindaExceptionTemplates.Kainda301Template;
}

/**
 * Represents an exception for found errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource has been temporarily moved to a new location.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda302Exception("This is a message");
 * @example throw new Kainda302Exception({ message: "This is a message" });
 * @example throw new Kainda302Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda302Exception("This is a message", 302);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302|MDN Web Docs}
 */
class Kainda302Exception extends KaindaException 
{
    name = "KaindaFoundException";
    response_code = 302;
    template = GenericKaindaExceptionTemplates.Kainda302Template;
}

/**
 * Represents an exception for see other errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource can be found under a different URL and should be retrieved using a GET method on that resource.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda303Exception("This is a message");
 * @example throw new Kainda303Exception({ message: "This is a message" });
 * @example throw new Kainda303Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda303Exception("This is a message", 303);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303|MDN Web Docs}
 */
class Kainda303Exception extends KaindaException 
{
    name = "KaindaSeeOtherException";
    response_code = 303;
    template = GenericKaindaExceptionTemplates.Kainda303Template;
}

/**
 * Represents an exception for not modified errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource has not been modified since the last request.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda304Exception("This is a message");
 * @example throw new Kainda304Exception({ message: "This is a message" });
 * @example throw new Kainda304Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda304Exception("This is a message", 304);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304|MDN Web Docs}
 */
class Kainda304Exception extends KaindaException 
{
    name = "KaindaNotModifiedException";
    response_code = 304;
    template = GenericKaindaExceptionTemplates.Kainda304Template;
}

/**
 * Represents an exception for temporary redirect errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource has been temporarily moved to a new location.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda307Exception("This is a message");
 * @example throw new Kainda307Exception({ message: "This is a message" });
 * @example throw new Kainda307Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda307Exception("This is a message", 307);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307|MDN Web Docs}
 */
class Kainda307Exception extends KaindaException 
{
    name = "KaindaTemporaryRedirectException";
    response_code = 307;
    template = GenericKaindaExceptionTemplates.Kainda307Template;
}

/**
 * Represents an exception for permanent redirect errors.
 * @extends KaindaException
 * @class
 * @classdesc This exception should be thrown when the requested resource has been permanently moved to a new location.
 * @property {string} name - The name of the exception.
 * @property {number} response_code - The HTTP response code that corresponds to the exception.
 * @property {function} template - The error template function for this exception.
 * @example throw new Kainda308Exception("This is a message");
 * @example throw new Kainda308Exception({ message: "This is a message" });
 * @example throw new Kainda308Exception({ message: "This is a message", other: "other" });
 * @example throw new Kainda308Exception("This is a message", 308);
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308|MDN Web Docs}
 */
class Kainda308Exception extends KaindaException 
{
    name = "KaindaPermanentRedirectException";
    response_code = 308;
    template = GenericKaindaExceptionTemplates.Kainda308Template;
}

module.exports = {
    Kainda300Exception,
    Kainda301Exception,
    Kainda302Exception,
    Kainda303Exception,
    Kainda304Exception,
    Kainda307Exception,
    Kainda308Exception,
};