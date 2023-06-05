
/**
 * Check if the user that makes the request can read the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canReadResource(req, res, next) 
{

    console.warn("canReadResource middleware is not implemented yet");
    next();

}

module.exports = canReadResource;

