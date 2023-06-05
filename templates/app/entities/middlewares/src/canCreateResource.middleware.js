
/**
 * Check if the user that makes the request can create the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canCreateResource(req, res, next) 
{

    console.warn("canCreateResource middleware is not implemented yet");
    next();

}

module.exports = canCreateResource;

