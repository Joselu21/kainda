const onlyReason = require("./onlyReasonTemplate");

/**
 * Creates a new Kainda300Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=MULTIPLE_CHOICES] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda300Template({reason: 'multiple choices'});
 * console.log(error); // {error_type: 'MULTIPLE_CHOICES', error_message: 'The request has multiple choices.', error_data: {reason: 'multiple choices'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300|MDN}
 */
function Kainda300Template(params = {}) {
    return onlyReason(params, "The request has multiple choices.", "MULTIPLE_CHOICES");
}

/**
 * Creates a new Kainda301Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=MOVED_PERMANENTLY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda301Template({reason: 'moved permanently'});
 * console.log(error); // {error_type: 'MOVED_PERMANENTLY', error_message: 'The requested resource has been permanently moved.', error_data: {reason: 'moved permanently'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301|MDN}
 */
function Kainda301Template(params = {}) {
    return onlyReason(params, "The requested resource has been permanently moved.", "MOVED_PERMANENTLY");
}

/**
 * Creates a new Kainda302Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=FOUND] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda302Template({reason: 'found'});
 * console.log(error); // {error_type: 'FOUND', error_message: 'The requested resource has been found.', error_data: {reason: 'found'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302|MDN}
 */
function Kainda302Template(params = {}) {
    return onlyReason(params, "The requested resource has been found.", "FOUND");
}

/**
 * Creates a new Kainda303Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=SEE_OTHER] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda303Template({reason: 'see other'});
 * console.log(error); // {error_type: 'SEE_OTHER', error_message: 'The requested resource is located at a different URI and should be accessed through a GET method to that URI.', error_data: {reason: 'see other'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303|MDN}
 */
function Kainda303Template(params = {}) {
    return onlyReason(params, "The requested resource is located at a different URI and should be accessed through a GET method to that URI.", "SEE_OTHER");
}

/**
 * Creates a new Kainda304Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=NOT_MODIFIED] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda304Template({reason: 'not modified'});
 * console.log(error); // {error_type: 'NOT_MODIFIED', error_message: 'The requested resource has not been modified since the last request.', error_data: {reason: 'not modified'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304|MDN}
 */
function Kainda304Template(params = {}) {
    return onlyReason(params, "The requested resource has not been modified since the last request.", "NOT_MODIFIED");
}

/**
 * Creates a new Kainda306Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=SWITCH_PROXY] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error
 * @example
 * const error = Kainda306Template({reason: 'switch proxy'});
 * console.log(error); // {error_type: 'SWITCH_PROXY', error_message: 'The requested resource must be accessed through a proxy on the specified proxy server.', error_data: {reason: 'switch proxy'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/306|MDN}
 */
function Kainda306Template(params = {}) {
    return onlyReason(params, "The requested resource must be accessed through a proxy on the specified proxy server.", "SWITCH_PROXY");
}

/**
 * Creates a new Kainda307Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=TEMPORARY_REDIRECT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda307Template({reason: 'temporary redirect'});
 * console.log(error); // {error_type: 'TEMPORARY_REDIRECT', error_message: 'The requested resource has been temporarily moved to a different URI.', error_data: {reason: 'temporary redirect'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307|MDN}
 */
function Kainda307Template(params = {}) {
    return onlyReason(params, "The requested resource has been temporarily moved to a different URI.", "TEMPORARY_REDIRECT");
}

/**
 * Creates a new Kainda308Template exception.
 * @param {Object} params - The parameters object.
 * @param {string} [params.reason] - The reason for the exception.
 * @param {string} [params.error_type=PERMANENT_REDIRECT] - The type of the error.
 * @param {string} [params.error_message] - The message of the error.
 * @param {Object} [params.error_data] - Additional data about the error.
 * @returns {Object} - The error object.
 * @example
 * const error = Kainda308Template({reason: 'permanent redirect'});
 * console.log(error); // {error_type: 'PERMANENT_REDIRECT', error_message: 'The requested resource has been permanently moved to a different URI.', error_data: {reason: 'permanent redirect'}}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308|MDN}
 */
function Kainda308Template(params = {}) {
    return onlyReason(params, "The requested resource has been permanently moved to a different URI.", "PERMANENT_REDIRECT");
}

module.exports = {
    Kainda300Template,
    Kainda301Template,
    Kainda302Template,
    Kainda303Template,
    Kainda304Template,
    Kainda306Template,
    Kainda307Template,
    Kainda308Template
};
