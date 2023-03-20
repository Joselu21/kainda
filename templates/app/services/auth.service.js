const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * Middleware to check if the token is present and valid.
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @returns {void} Nothing
 */
async function tokenValid(req, res, next) {
    let token = getTokenFromHeaders(req);
    if (!token) {
        return res.status(401).json({
            message: "No token provided!"
        });
    }
    const secret = config.get("jwt.secret");
    let decoded = await verifyToken(secret, token);
    if (!decoded) {
        return res.status(401).json({
            message: "Invalid token!"
        });
    }
    next();
}

/**
 * Middleware to check if the token is present and has the content specified in the conditions
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @param {Object} conditions The conditions to check
 * @returns {void} Nothing
 */
async function tokenHas(req, res, next, conditions) {
    try {
        const decoded = await __getAndVerifyToken(req);
        if (!decoded) {
            throw new Models.Admin.Exceptions.AdminInvalidTokenException();
        }
        for (const condition of conditions) {
            if(!decoded[condition.key] || (condition.value && decoded[condition.key] !== condition.value)) {
                throw new Models.Admin.Exceptions.AdminInvalidTokenException();
            }
        }
        next();
    } catch (error) {
        ExceptionHandler(error, res);
    }
}


/**
 * Middleware to check if a token is provided
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @returns {void} Nothing
 */
function tokenProvided(req, res, next) {
    let token = getTokenFromHeaders(req, res);
    if (!token) {
        return res.status(401).json({
            message: "No token provided!"
        });
    }
    next();
}

/**
 * Get the token from the headers of the request
 * @param {Object} req Request object
 * @returns {string} The extracted token
 */
function getTokenFromHeaders(req) {
    let token = req.headers["x-access-token"] ?? req.headers["authorization"];
    return token;
}

/**
 * Decode the token and return it
 * @param {string} token The token to decode
 * @returns {Object} The decoded token
 */
function decodeToken(token) {
    let decoded = jwt.decode(token);
    return decoded;
}

/**
 * Verify the token and return it decoded if it is valid
 * @param {string} token The token to verify
 * @returns {object} The decoded token
 * @example verifyToken(process.env.JWT_SECRET, "dsdfnMyTokendfdsf")
 */
async function verifyToken(secret, token) {

    if (!token || token === '') {
        return false;
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, secret);
    } catch (e) {
        return false;
    }
    return decoded;

}

module.exports = {
    tokenValid,
    tokenHas,
    tokenProvided,
    getTokenFromHeaders,
    decodeToken,
    verifyToken
};