const ExceptionService = require("@services/exception.service");
const jwt = require("jsonwebtoken");
const config = require("config");
const kainda = require("kainda");

/**
 * Middleware to check if the token is present and valid.
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @returns {void} Nothing
 */
async function tokenValid(req, res, next) 
{
    try 
    {
        const token = getTokenFromHeaders(req);
        if (!token) 
        {
            throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate();
        }
        const secret = config.get("jwt.secret"),
            decoded = await verifyToken(
                secret,
                token
            );
        if (!decoded) 
        {
            throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate();
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }
}

/**
 * Middleware to check if the token is present and has the content specified in the conditions
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @param {Object} conditions The conditions to check
 * @returns {void} Nothing
 */
async function tokenHas(req, res, next, conditions) 
{
    try 
    {
        const token = getTokenFromHeaders(req);
        if (!token) 
        {
            throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate();
        }
        const secret = config.get("jwt.secret"),
            decoded = await verifyToken(
                secret,
                token
            );
        if (!decoded) 
        {
            throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate();
        }
        for (const condition of conditions) 
        {
            if (!decoded[condition.key] || condition.value && decoded[condition.key] !== condition.value) 
            {

                throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate();

            }
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }

}


/**
 * Middleware to check if a token is provided
 * @param {Object} req  Request object
 * @param {Object} res  Response object
 * @param {Function} next Next function
 * @returns {void} Nothing
 */
function tokenProvided(req, res, next) 
{
    try 
    {
        const token = getTokenFromHeaders(
            req,
            res
        );
        if (!token) 
        {
            throw kainda.GenericKaindaExceptions.Kainda401Exception.fromTemplate("Token not found");
        }
        next();
    }
    catch (error) 
    {
        ExceptionService.handle(error, res);
    }

}

/**
 * Get the token from the headers of the request
 * @param {Object} req Request object
 * @returns {string} The extracted token
 */
function getTokenFromHeaders(req) 
{
    let token = req.headers["x-access-token"] ?? req.headers.authorization;
    if (token && token.startsWith("Bearer ")) 
    {
        token = token.slice(
            7,
            token.length
        );
    }
    return token;
}

/**
 * Decode the token and return it
 * @param {string} token The token to decode
 * @returns {Object} The decoded token
 */
function decodeToken(token) 
{
    const decoded = jwt.decode(token);
    return decoded;
}

/**
 * Verify the token and return it decoded if it is valid
 * @param {string} token The token to verify
 * @returns {object} The decoded token
 * @example verifyToken(process.env.JWT_SECRET, "dsdfnMyTokendfdsf")
 */
async function verifyToken(secret, token) 
{
    if (!token || token === "") 
    {
        return false;
    }

    let decoded = null;
    try 
    {
        decoded = jwt.verify(
            token,
            secret
        );
    }
    catch (e) 
    {
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
