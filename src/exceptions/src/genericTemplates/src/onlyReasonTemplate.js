/**
 * Helper function to create a generic error object.
 * @param {Object} params - An object containing the parameters to customize the error message.
 * @param {string} [params.reason] - The reason why the resource is invalid.
 * @param {string} [params.error_type] - The type of the error.
 * @param {string} [params.error_message] - The custom error message to display.
 * @param {Object} [params.error_data] - Additional data to include in the error object.
 * @returns {Object} An object representing the error.
 * @example
 * const error = onlyReason({reason: 'The name must be a string.'}, 'The request is invalid.', 'BAD_REQUEST');
 * console.log(error); // {error_type: 'BAD_REQUEST', error_message: 'The request is invalid. The name must be a string.', error_data: {reason: 'The name must be a string.'}}
 */
function onlyReason(params, message, httpStatus) {
    let newMessage = message;
    if (params.reason && typeof params.reason === "string") {
        newMessage += ` ${params.reason}`;
    }
    return {
        error_type: params.error_type ?? httpStatus,
        error_message: params.error_message ?? newMessage,
        error_data: params.error_data ?? { ...params },
    };
}

module.exports = onlyReason;
