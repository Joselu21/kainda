const onlyReason = require("./onlyReasonTemplate");

/**
 * Generates a 400 (Bad Request) HTTP response error object.
 *
 * @param {Object} params - An object containing the parameters to customize the error message.
 * @param {string} [params.key] - The key of the resource that caused the error.
 * @param {string} [params.value] - The value of the resource that caused the error.
 * @param {string} [params.resource] - The name of the resource that caused the error.
 * @param {string} [params.reason] - The reason why the resource is invalid.
 * @param {string} [params.error_type="BAD_REQUEST"] - The type of the error.
 * @param {string} [params.error_message] - The custom error message to display.
 * @param {Object} [params.error_data] - Additional data to include in the error object.
 * @returns {Object} An object representing the error.
 * @example
 * const error = Kainda400Template({key: 'name', value: '123', resource: 'name', reason: 'The name must be a string.'});
 * console.log(error); // {error_type: 'BAD_REQUEST', error_message: 'The resource name value 123 is invalid. The name must be a string.', error_data: {key: 'name', value: '123', resource: 'name', reason: 'The name must be a string.'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400}
 */
function Kainda400Template(params = {}) {
    let message = "The request is invalid.";
    if (params.key && typeof params.key === "string" && !params.value) {
        message = `The resource ${params.resource} is required.`;
    } else if (params.key && typeof params.key === "string" && params.value) {
        message = `The resource ${params.resource} value ${params.value} is invalid.`;
        if (params.reason && typeof params.reason === "string") {
            message += ` ${params.reason}`;
        }
    }
    return {
        error_type: params.error_type ?? "BAD_REQUEST",
        error_message: params.error_message ?? message,
        error_data: params.error_data ?? { ...params }
    }
}

/**
 * Creates a new Kainda401Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.token] - The token that caused the exception.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=UNAUTHORIZED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda401Template({token: 'invalid-token', reason: 'expired'});
 * console.log(error); // {error_type: 'UNAUTHORIZED', error_message: 'The token invalid-token is invalid. expired', error_data: {token: 'invalid-token', reason: 'expired'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401}
 */
function Kainda401Template(params = {}) {
    let message = "The request is unauthorized.";
    if (params.token && typeof params.token === "string") {
        message = `The token ${params.token} is invalid.`;
        if (params.reason && typeof params.reason === "string") {
            message += ` ${params.reason}`;
        }
    } else {
        message = "No token was provided. Remember to include the token in the Authorization header.";
    }
    return {
        error_type: params.error_type ?? "UNAUTHORIZED",
        error_message: params.error_message ?? message,
        error_data: params.error_data ?? { ...params }
    }
}

/**
 * Creates a new Kainda402Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=PAYMENT_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda402Template({reason: 'payment required'});
 * console.log(error); // {error_type: 'PAYMENT_REQUIRED', error_message: 'The request cannot be processed until the client pays the balance.', error_data: {reason: 'payment required'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402}
 */
function Kainda402Template(params = {}) {
    return onlyReason(params, "The request cannot be processed until the client pays the balance.", "PAYMENT_REQUIRED");
}

/**
 * Creates a new Kainda403Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.resource] - The resource that caused the exception.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=FORBIDDEN] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example 
 * const error = Kainda403Template({resource: 'user', reason: 'not allowed'});
 * console.log(error); // {error_type: 'FORBIDDEN', error_message: 'The resource user cannot be accessed with your authorization level or with any level at all. not allowed', error_data: {resource: 'user', reason: 'not allowed'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403}
 */
function Kainda403Template(params = {}) {
    message = "The request is forbidden.";
    if (params.resource && typeof params.resource === "string") {
        message = `The resource ${params.resource} cannot be accessed with your authorization level or with any level at all.`;
        if (params.reason && typeof params.reason === "string") {
            message += ` ${params.reason}`;
        }
    }
    return {
        error_type: params.error_type ?? "FORBIDDEN",
        error_message: params.error_message ?? message,
        error_data: params.error_data ?? { ...params }
    }
}

/**
 * Creates a new Kainda404Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.resource] - The resource that caused the exception.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NOT_FOUND] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda404Template({resource: 'user', reason: 'not found'});
 * console.log(error); // {error_type: 'NOT_FOUND', error_message: 'The resource user was not found. not found', error_data: {resource: 'user', reason: 'not found'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404}
 */
function Kainda404Template(params = {}) {
    let message = "The resource was not found.";
    if (params.resource && typeof params.resource === "string") {
        message = `The resource ${params.resource} was not found.`;
        if (params.reason && typeof params.reason === "string") {
            message += ` ${params.reason}`;
        }
    }
    return {
        error_type: params.error_type ?? "NOT_FOUND",
        error_message: params.error_message ?? message,
        error_data: params.error_data ?? { ...params }
    }
}

/**
 * Creates a new Kainda405Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=METHOD_NOT_ALLOWED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda405Template({reason: 'The requested method is not allowed.'});
 * console.log(error); // {error_type: 'METHOD_NOT_ALLOWED', error_message: 'The requested method is not allowed.', error_data: {reason: 'The requested method is not allowed.'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405}
 */
function Kainda405Template(params = {}) {
    return onlyReason(params, "The requested method is not allowed.", "METHOD_NOT_ALLOWED");
}

/**
 * Creates a new Kainda406Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NOT_ACCEPTABLE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda406Template({reason: 'The requested resource is not capable of generating content of the requested type.'});
 * console.log(error); // {error_type: 'NOT_ACCEPTABLE', error_message: 'The requested resource is not capable of generating content of the requested type.', error_data: {reason: 'The requested resource is not capable of generating content of the requested type.'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406}
 */
function Kainda406Template(params = {}) {
    return onlyReason(params, "The requested resource is not capable of generating content of the requested type.", "NOT_ACCEPTABLE");
}

/**
 * Creates a new Kainda407Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=PROXY_AUTHENTICATION_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda407Template({reason: 'The client must first authenticate itself with the proxy.'});
 * console.log(error); // {error_type: 'PROXY_AUTHENTICATION_REQUIRED', error_message: 'The client must first authenticate itself with the proxy.', error_data: {reason: 'The client must first authenticate itself with the proxy.'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407}
 */
function Kainda407Template(params = {}) {
    return onlyReason(params, "The client must first authenticate itself with the proxy.", "PROXY_AUTHENTICATION_REQUIRED");
}

/**
 * Creates a new Kainda408Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=REQUEST_TIMEOUT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda408Template({reason: 'client did not produce a request within the time that the server was prepared to wait'});
 * console.log(error); // {error_type: 'REQUEST_TIMEOUT', error_message: 'The request timed out.', error_data: {reason: 'client did not produce a request within the time that the server was prepared to wait'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408}
 */
function Kainda408Template(params = {}) {
    return onlyReason(params, "The request timed out.", "REQUEST_TIMEOUT");
}

/**
 * Creates a new Kainda409Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.resource] - The resource that caused the exception.
 * @param {string} [params.conflict] - The conflict that caused the exception.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=CONFLICT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda409Template({resource: 'user', conflict: 'email', reason: 'already exists'});
 * console.log(error); // {error_type: 'CONFLICT', error_message: 'The resource user is in conflict with email. already exists.', error_data: {resource: 'user', conflict: 'email', reason: 'already exists'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409}
 */
function Kainda409Template(params = {}) {
    let message = "The request is in conflict with the current state of the resource.";
    if (params.resource && typeof params.resource === "string") {
        message = `The resource ${params.resource} is in conflict`;
        if (params.conflict && typeof params.conflict === "string") {
            message += ` with ${params.conflict}`;
        }
        if (params.reason && typeof params.reason === "string") {
            message += `. ${params.reason}.`;
        }
    }
    return {
        error_type: params.error_type ?? "CONFLICT",
        error_message: params.error_message ?? message,
        error_data: params.error_data ?? { ...params }
    }
}

/**
 * Creates a new Kainda410Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=RESOURCE_GONE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda410Template({reason: 'the resource requested is no longer available'});
 * console.log(error); // {error_type: 'RESOURCE_GONE', error_message: 'The resource requested is no longer available.', error_data: {reason: 'the resource requested is no longer available'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410}
 */
function Kainda410Template(params = {}) {
    return onlyReason(params, "The resource requested is no longer available.", "RESOURCE_GONE");
}

/**
 * Creates a new Kainda411Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=LENGTH_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda411Template({reason: 'the server refuses to accept the request without a defined Content-Length'});
 * console.log(error); // {error_type: 'LENGTH_REQUIRED', error_message: 'The server requires a Content-Length header.', error_data: {reason: 'the server refuses to accept the request without a defined Content-Length'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411}
 */
function Kainda411Template(params = {}) {
    return onlyReason(params, "The server requires a Content-Length header.", "LENGTH_REQUIRED");
}

/**
 * Creates a new Kainda412Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=PRECONDITION_FAILED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda412Template({reason: 'precondition failed'});
 * console.log(error); // {error_type: 'PRECONDITION_FAILED', error_message: 'The request did not meet the preconditions.', error_data: {reason: 'precondition failed'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412}
 */
function Kainda412Template(params = {}) {
    return onlyReason(params, "The request did not meet the preconditions.", "PRECONDITION_FAILED");
}

/**
 * Creates a new Kainda413Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=REQUEST_ENTITY_TOO_LARGE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda413Template({reason: 'request entity too large'});
 * console.log(error); // {error_type: 'REQUEST_ENTITY_TOO_LARGE', error_message: 'The request entity is too large.', error_data: {reason: 'request entity too large'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413}
 */
function Kainda413Template(params = {}) {
    return onlyReason(params, "The request entity is too large.", "REQUEST_ENTITY_TOO_LARGE");
}

/**
 * Creates a new Kainda414Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=REQUEST_URI_TOO_LONG] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda414Template({reason: 'request uri too long'});
 * console.log(error); // {error_type: 'REQUEST_URI_TOO_LONG', error_message: 'The request URI is too long.', error_data: {reason: 'request uri too long'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414}
 */
function Kainda414Template(params = {}) {
    return onlyReason(params, "The request URI is too long.", "REQUEST_URI_TOO_LONG");
}

/**
 * Creates a new Kainda415Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=UNSUPPORTED_MEDIA_TYPE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda415Template({reason: 'unsupported media type'});
 * console.log(error); // {error_type: 'UNSUPPORTED_MEDIA_TYPE', error_message: 'The media type is not supported.', error_data: {reason: 'unsupported media type'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415}
 */
function Kainda415Template(params = {}) {
    return onlyReason(params, "The media type is not supported.", "UNSUPPORTED_MEDIA_TYPE");
}

/**
 * Creates a new Kainda416Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=RANGE_NOT_SATISFIABLE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda416Template({reason: 'requested range not satisfiable'});
 * console.log(error); // {error_type: 'RANGE_NOT_SATISFIABLE', error_message: 'The requested range is not satisfiable.', error_data: {reason: 'requested range not satisfiable'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416}
 */
function Kainda416Template(params = {}) {
    return onlyReason(params, "The requested range is not satisfiable.", "RANGE_NOT_SATISFIABLE");
}

/**
 * Creates a new Kainda417Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=EXPECTATION_FAILED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda417Template({reason: 'failed expectation'});
 * console.log(error); // {error_type: 'EXPECTATION_FAILED', error_message: 'The server could not meet the expectation(s) specified in the Expect header.', error_data: {reason: 'failed expectation'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417}
 */
function Kainda417Template(params = {}) {
    return onlyReason(params, "The server could not meet the expectation(s) specified in the Expect header.", "EXPECTATION_FAILED");
}

/**
 * Creates a new Kainda418Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=I_AM_A_TEAPOT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda418Template({reason: 'I am a teapot'});
 * console.log(error); // {error_type: 'I_AM_A_TEAPOT', error_message: 'I am a teapot', error_data: {reason: 'I am a teapot'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418}
 */
function Kainda418Template(params = {}) {
    return onlyReason(params, "I am a teapot", "I_AM_A_TEAPOT");
}

/**
 * Creates a new Kainda421Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=MISDIRECTED_REQUEST] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda421Template({reason: 'The request was directed at a server that is not able to produce a response'});
 * console.log(error); // {error_type: 'MISDIRECTED_REQUEST', error_message: 'The request was directed at a server that is not able to produce a response.', error_data: {reason: 'The request was directed at a server that is not able to produce a response'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421}
 */
function Kainda421Template(params = {}) {
    return onlyReason(params, "The request was directed at a server that is not able to produce a response.", "MISDIRECTED_REQUEST");
}


/**
 * Creates a new Kainda422Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=UNPROCESSABLE_ENTITY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda422Template({reason: 'Unprocessable Entity'});
 * console.log(error); // {error_type: 'UNPROCESSABLE_ENTITY', error_message: 'Unprocessable Entity', error_data: {reason: 'Unprocessable Entity'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422}
 */
function Kainda422Template(params = {}) {
    return onlyReason(params, "Unprocessable Entity", "UNPROCESSABLE_ENTITY");
}

/**
 * Creates a new Kainda423Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=LOCKED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda423Template({reason: 'The resource that is being accessed is locked'});
 * console.log(error); // {error_type: 'LOCKED', error_message: 'The resource that is being accessed is locked.', error_data: {reason: 'The resource that is being accessed is locked'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423}
 */
function Kainda423Template(params = {}) {
    return onlyReason(params, "The resource that is being accessed is locked.", "LOCKED");
}

/**
 * Creates a new Kainda424Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=FAILED_DEPENDENCY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda424Template({reason: 'The request failed because it depended on another request that failed'});
 * console.log(error); // {error_type: 'FAILED_DEPENDENCY', error_message: 'The request failed because it depended on another request that failed.', error_data: {reason: 'The request failed because it depended on another request that failed'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424}
 */
function Kainda424Template(params = {}) {
    return onlyReason(params, "The request failed because it depended on another request that failed.", "FAILED_DEPENDENCY");
}

/**
 * Creates a new Kainda425Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=TOO_EARLY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda425Template({reason: 'resource was accessed too early'});
 * console.log(error); // {error_type: 'TOO_EARLY', error_message: 'The resource was accessed too early.', error_data: {reason: 'resource was accessed too early'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/425}
 */
function Kainda425Template(params = {}) {
    return onlyReason(params, "The resource was accessed too early.", "TOO_EARLY");
}

/**
 * Creates a new Kainda426Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=UPGRADE_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda426Template({reason: 'upgrade required'});
 * console.log(error); // {error_type: 'UPGRADE_REQUIRED', error_message: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.', error_data: {reason: 'upgrade required'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426}
 */
function Kainda426Template(params = {}) {
    return onlyReason(params, "The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.", "UPGRADE_REQUIRED");
}

/**
 * Creates a new Kainda428Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=PRECONDITION_REQUIRED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda428Template({reason: 'precondition required'});
 * console.log(error); // {error_type: 'PRECONDITION_REQUIRED', error_message: 'The server requires the request to be conditional.', error_data: {reason: 'precondition required'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428}
 */
function Kainda428Template(params = {}) {
    return onlyReason(params, "The server requires the request to be conditional.", "PRECONDITION_REQUIRED");
}

/**
 * Creates a new Kainda429Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=TOO_MANY_REQUESTS] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda429Template({reason: 'too many requests'});
 * console.log(error); // {error_type: 'TOO_MANY_REQUESTS', error_message: 'The user has sent too many requests in a given amount of time.', error_data: {reason: 'too many requests'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429}
 */
function Kainda429Template(params = {}) {
    return onlyReason(params, "The user has sent too many requests in a given amount of time.", "TOO_MANY_REQUESTS");
}

/**
 * Creates a new Kainda431Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=REQUEST_HEADER_FIELDS_TOO_LARGE] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda431Template({reason: 'request header fields too large'});
 * console.log(error); // {error_type: 'REQUEST_HEADER_FIELDS_TOO_LARGE', error_message: 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.', error_data: {reason: 'request header fields too large'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431}
 */
function Kainda431Template(params = {}) {
    return onlyReason(params, "The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large.", "REQUEST_HEADER_FIELDS_TOO_LARGE");
}

/**
 * Creates a new Kainda451Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=UNAVAILABLE_FOR_LEGAL_REASONS] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda451Template({reason: 'unavailable for legal reasons'});
 * console.log(error); // {error_type: 'UNAVAILABLE_FOR_LEGAL_REASONS', error_message: 'The server is denying access to the resource as a consequence of a legal demand.', error_data: {reason: 'unavailable for legal reasons'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451}
 */
function Kainda451Template(params = {}) {
    return onlyReason(params, "The server is denying access to the resource as a consequence of a legal demand.", "UNAVAILABLE_FOR_LEGAL_REASONS");
}

module.exports = {
    Kainda400Template,
    Kainda401Template,
    Kainda402Template,
    Kainda403Template,
    Kainda404Template,
    Kainda405Template,
    Kainda406Template,
    Kainda407Template,
    Kainda408Template,
    Kainda409Template,
    Kainda410Template,
    Kainda411Template,
    Kainda412Template,
    Kainda413Template,
    Kainda414Template,
    Kainda415Template,
    Kainda416Template,
    Kainda417Template,
    Kainda418Template,
    Kainda421Template,
    Kainda422Template,
    Kainda423Template,
    Kainda424Template,
    Kainda425Template,
    Kainda426Template,
    Kainda428Template,
    Kainda429Template,
    Kainda431Template,
    Kainda451Template,
}