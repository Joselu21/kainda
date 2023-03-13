function onlyReason(params, message) {
    let newMessage = message;
    if (params.reason && typeof params.reason === "string") {
        newMessage += ` ${params.reason}`;
    }
    return {
        error_type: params.error_type ?? "INTERNAL_SERVER_ERROR",
        error_message: params.error_message ?? newMessage,
        error_data: params.error_data ?? { ...params },
    };
}


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

function Kainda500Template(params = {}) {
    return onlyReason(params, "The request could not be completed due to an internal server error.");
}

function Kainda503Template(params = {}) {
    return onlyReason(params, "The server is currently unavailable.");
}

function Kainda504Template(params = {}) {
    return onlyReason(params, "The proxy server timed out.");
}

const GenericKaindaExceptionTemplates = {
    Kainda400Template,
    Kainda401Template,
    Kainda403Template,
    Kainda404Template,
    Kainda409Template,
    Kainda500Template,
    Kainda503Template,
    Kainda504Template,
};

module.exports = GenericKaindaExceptionTemplates;