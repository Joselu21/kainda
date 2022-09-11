const jwt = require("jsonwebtoken");

/**
 * Middleware to check if a token is provided
 * @param {*} req  Request object
 * @param {*} res  Response object
 * @param {*} next Next function
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
 * Middleware to check if the token is present and valid.
 * @param {*} req  Request object
 * @param {*} res  Response object
 * @param {*} next Next function
 * @returns {void} Nothing
 */
 async function tokenValid(req, res, next) {
    let token = getTokenFromHeaders(req);
    if (!token) {
        return res.status(401).json({
            message: "No token provided!"
        });
    }
    let decoded = await verifyToken(token);
    if (!decoded) {
        return res.status(401).json({
            message: "Invalid token!"
        });
    }
    next();
}

/**
 * Get the token from the headers of the request
 * @param {*} req Request object
 * @param {*} res Response object
 * @returns {string} The token
 */
function getTokenFromHeaders(req) {
    let token = req.headers["x-access-token"] ?? req.headers["authorization"];
    return token;
}

/**
 * Decode the token and return it
 * @param {*} token The token to decode
 * @returns {object} The decoded token
 */
function decodeToken(token) {
    let decoded = jwt.decode(token);
    return decoded;
}

/**
 * Verify the token and return it decoded if it is valid
 * @param {*} token The token to verify
 * @returns {object} The decoded token
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

function blockByIP(ip, options) {
    let whitelist = options.whitelist ?? [];
    let blacklist = options.blacklist ?? [];

    for(let whitelist_ip of whitelist) {
        if (whitelist_ip === ip) {
            return true;
        }
    }

    for(let blacklist_ip of blacklist) {
        if (blacklist_ip === ip) {
            return false;
        }
    }

    return true;

}

const AuthFunctions = {
    tokenProvided,
    tokenValid,
    getTokenFromHeaders,
    decodeToken,
    verifyToken,
    blockByIP
};

module.exports = AuthFunctions;