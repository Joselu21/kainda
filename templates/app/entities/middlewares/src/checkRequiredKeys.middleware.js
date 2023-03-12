const { missingFieldsResponse } = require("kainda");

async function checkRequiredKeys(req, res, next, required_keys = Models.__KAINDA__MODEL__UPPERCASE__.create_required_keys) {
    if(required_keys.length === 0) {
        return next();
    }
    let arrayOfKeys = [
        required_keys
    ];
    let response = missingFieldsResponse(arrayOfKeys, req.body);
    if(Object.keys(response).length > 0){
        return res.status(400).json(response);
    }
    next();
}

module.exports = checkRequiredKeys;