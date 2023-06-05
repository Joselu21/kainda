
/**
 * Checks if an object has the specified keys.
 * @param {string|string[]} keys - The key(s) to check for. Can be a string or an array of strings.
 * @param {object} container - The object to check against.
 * @param {string[]} [exceptions=[]] - An optional array of keys to exclude from the check.
 * @returns {(string|boolean)} Returns the first missing field or true if all fields are present.
 */
function checkObjectHas(keys, container, exceptions = []) 
{

    if (!keys || !keys.length || !container || typeof container !== "object") 
    {
        return false;
    }

    const missingFields = [];

    function deepCheckField(key) 
    {
        let value = container;
        for (let part of key.split(".")) 
        {
            if (!value[part]) 
            {
                if (!exceptions.includes(key)) 
                {
                    missingFields.push(key);
                }
                break;
            }
            value = value[part];
        }
    }

    if ((Array.isArray(keys) && keys.length > 0)) 
    {
        for (let key of keys) 
        {
            deepCheckField(key);
        }
    }
    else if (typeof keys === "string") 
    {
        deepCheckField(keys);
    }

    return missingFields.length ? missingFields[0] : true;
}

/**
 * Generates a response object indicating missing fields in a given container object.
 * @param {string[]} arrayOfKeys - An array of keys to check for in the container object.
 * @param {Object} container - The container object to check for missing fields.
 * @param {Array} [exceptions=[]] - An optional array of keys to exclude from the check.
 * @returns {Object} - A response object containing information about any missing fields.
 */
function missingFieldsResponse(arrayOfKeys, container, exceptions = []) 
{
    let response = {};
    for (let i = 0; i < arrayOfKeys.length; i++) 
    {
        let missingFields = checkObjectHas(arrayOfKeys[i], container, exceptions);
        if (missingFields === true) 
        {
            continue;
        }
        if (JSON.stringify(response) === "{}") 
        {
            response = {
                error_type: "EMPTY_FIELD",
                error_message: `Missing ${Array.isArray(missingFields) ? missingFields[0] : missingFields} field`,
                error_data: {
                    error_code: "EMPTY_FIELD",
                    element: Array.isArray(missingFields) ? missingFields[0] : missingFields,
                    data: container,
                },
            };
        }
        else if (!response.allAttributesMissing) 
        {
            response.allAttributesMissing = [];
        }
        else 
        {
            response.allAttributesMissing.push(missingFields);
        }
    }
    return response;
}

/**
 * A middleware function that deactivates a route.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function.
 * @returns {void}
 */
function deactivateRoute(req, res) 
{
    res.status(404).json({
        error_type: "ROUTE_DEACTIVATED",
        error_message: "This route has been deactivated",
        error_data: {
            error_code: "ROUTE_DEACTIVATED",
        },
    });
}

const KaindaMiddlewareUtils = {
    checkObjectHas,
    missingFieldsResponse,
};

const KaindaMiddlewares = {
    deactivateRoute,
};

module.exports = {
    KaindaMiddlewareUtils,
    KaindaMiddlewares,
};
