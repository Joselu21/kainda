function checkObjectHas(keys, container, exceptions = []) {

    let missingFields = [];
    if (!keys || !keys.length || keys.length === 0) {
        return false;
    }
    if (Array.isArray(keys) && keys.length > 0) {
        keys.forEach(element => {
            let aux = element.split(".");
            if (aux.length > 1) {
                if (aux.length > 1 && !container[aux[0]][aux[1]] && !exceptions.includes(element)) {
                    missingFields.push(element);
                }
            } else if (!container[element] && !exceptions.includes(element)) {
                missingFields.push(element);
            }
        });
    } else if (typeof keys === "string") {
        if (!container[keys] && !exceptions.includes(keys)) {
            missingFields.push(keys);
        }
    }

    if (missingFields.length && missingFields.length > 0) {
        return missingFields[0];
    }
    return true;
}

function missingFieldsResponse(arrayOfKeys, container, exceptions = []) {
    let response = {}
    for (let i = 0; i < arrayOfKeys.length; i++) {
        let missingFields = checkObjectHas(arrayOfKeys[i], container, exceptions);
        if (missingFields !== true) {
            if (JSON.stringify(response) === "{}") {
                response = {
                    error_type: "EMPTY_FIELD",
                    error_message: "Missing " + (Array.isArray(missingFields) ? missingFields[0] : missingFields) + " field",
                    error_data: {
                        error_code : "EMPTY_FIELD",
                        element : Array.isArray(missingFields) ? missingFields[0] : missingFields,
                        data : container
                    }
                }
            } else {
                if(!response.allAttributesMissing)
                    response.allAttributesMissing = [];
                response.allAttributesMissing.push(missingFields);
            }
        }
    }
    return response;
}

const KaindaMiddlewareUtils = {
    checkObjectHas,
    missingFieldsResponse
}

module.exports = KaindaMiddlewareUtils;
