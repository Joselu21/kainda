
/**
 * Check if the user that makes the request can update the resource specified in the request
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Function} next
 * @returns {void}
 */
async function canUpdateResource(req, res, next) 
{

    console.warn("canUpdateResource middleware is not implemented yet");
    next();

}

module.exports = canUpdateResource;

