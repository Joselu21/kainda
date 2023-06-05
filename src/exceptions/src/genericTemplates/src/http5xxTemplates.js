const onlyReason = require("./onlyReasonTemplate");

/**
 * Creates a new Kainda500Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=INTERNAL_SERVER_ERROR] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda500Template({reason: 'unexpected error occurred'});
 * console.log(error); // {error_type: 'INTERNAL_SERVER_ERROR', error_message: 'An unexpected error occurred.', error_data: {reason: 'unexpected error occurred'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500}
 */
function Kainda500Template(params = {}) 
{
    return onlyReason(
        params,
        "An unexpected error occurred.",
        "INTERNAL_SERVER_ERROR"
    );
}

/**
 * Creates a new Kainda501Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NOT_IMPLEMENTED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda501Template({reason: 'functionality not implemented'});
 * console.log(error); // {error_type: 'NOT_IMPLEMENTED', error_message: 'The functionality you requested is not implemented.', error_data: {reason: 'functionality not implemented'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501}
 */
function Kainda501Template(params = {}) 
{
    return onlyReason(
        params,
        "The functionality you requested is not implemented.",
        "NOT_IMPLEMENTED"
    );
}

/**
 * Creates a new Kainda502Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=BAD_GATEWAY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda502Template({reason: 'upstream server did not respond'});
 * console.log(error); // {error_type: 'BAD_GATEWAY', error_message: 'The upstream server did not respond.', error_data: {reason: 'upstream server did not respond'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502}
 */
function Kainda502Template(params = {}) 
{
    return onlyReason(
        params,
        "The upstream server did not respond.",
        "BAD_GATEWAY"
    );
}

/**
 * Creates a new Kainda503Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=SERVICE_UNAVAILABLE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda503Template({reason: 'service down for maintenance'});
 * console.log(error); // {error_type: 'SERVICE_UNAVAILABLE', error_message: 'The service is currently unavailable.', error_data: {reason: 'service down for maintenance'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503}
 */
function Kainda503Template(params = {}) 
{
    return onlyReason(params, "The service is currently unavailable.", "SERVICE_UNAVAILABLE");
}

/**
 * Creates a new Kainda504Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=GATEWAY_TIMEOUT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda504Template({reason: 'proxy server timed out'});
 * console.log(error); // {error_type: 'GATEWAY_TIMEOUT', error_message: 'The proxy server timed out.', error_data: {reason: 'proxy server timed out'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504}
 */
function Kainda504Template(params = {}) 
{
    return onlyReason(params, "The proxy server timed out.", "GATEWAY_TIMEOUT");
}

/**
 * Creates a new Kainda505Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=HTTP_VERSION_NOT_SUPPORTED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda505Template({reason: 'unsupported HTTP version'});
 * console.log(error); // {error_type: 'HTTP_VERSION_NOT_SUPPORTED', error_message: 'The HTTP version is not supported.', error_data: {reason: 'unsupported HTTP version'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505}
 */
function Kainda505Template(params = {}) 
{
    return onlyReason(params, "The HTTP version is not supported.", "HTTP_VERSION_NOT_SUPPORTED");
}

/**
 * Creates a new Kainda506Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=VARIANT_ALSO_NEGOTIATES] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda506Template({reason: 'variant also negotiates'});
 * console.log(error); // {error_type: 'VARIANT_ALSO_NEGOTIATES', error_message: 'The requested variant also negotiates.', error_data: {reason: 'variant also negotiates'}}
 */
function Kainda506Template(params = {}) 
{
    return onlyReason(params, "The requested variant also negotiates.", "VARIANT_ALSO_NEGOTIATES");
}

/**
 * Creates a new Kainda507Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=INSUFFICIENT_STORAGE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda507Template({reason: 'out of disk space'});
 * console.log(error); // {error_type: 'INSUFFICIENT_STORAGE', error_message: 'The server is out of disk space.', error_data: {reason: 'out of disk space'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507}
 */
function Kainda507Template(params = {}) 
{
    return onlyReason(params, "The server is out of disk space.", "INSUFFICIENT_STORAGE");
}

/**
 * Creates a new Kainda508Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=LOOP_DETECTED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda508Template({reason: 'detected a loop in the request processing'});
 * console.log(error); // {error_type: 'LOOP_DETECTED', error_message: 'The server detected a loop in the request processing.', error_data: {reason: 'detected a loop in the request processing'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508}
 */
function Kainda508Template(params = {}) 
{
    return onlyReason(params, "The server detected a loop in the request processing.", "LOOP_DETECTED");
}

/**
 * Creates a new Kainda510Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NOT_EXTENDED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda510Template({reason: 'Not extended'});
 * console.log(error); // {error_type: 'NOT_EXTENDED', error_message: 'The server requires additional extensions to be accepted.', error_data: {reason: 'Not extended'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510}
 */
function Kainda510Template(params = {}) 
{
    return onlyReason(params, "The server requires additional extensions to be accepted.", "NOT_EXTENDED");
}

/**
 * Creates a new Kainda511Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NETWORK_AUTHENTICATION_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda511Template({reason: 'Network authentication required'});
 * console.log(error); // {error_type: 'NETWORK_AUTHENTICATION_REQUIRED', error_message: 'The client needs to authenticate to gain network access.', error_data: {reason: 'Network authentication required'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511}
 */
function Kainda511Template(params = {}) 
{
    return onlyReason(params, "The client needs to authenticate to gain network access.", "NETWORK_AUTHENTICATION_REQUIRED");
}


module.exports = {
    Kainda500Template,
    Kainda501Template,
    Kainda502Template,
    Kainda503Template,
    Kainda504Template,
    Kainda505Template,
    Kainda506Template,
    Kainda507Template,
    Kainda508Template,
    Kainda510Template,
    Kainda511Template,
};