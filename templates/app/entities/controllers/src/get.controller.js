const { ExceptionHandler } = require('kainda');
const LogService = require("@services/log.service");

/**
 * Get all __KAINDA__MODEL__LOWERCASE__s
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function getAll__KAINDA__MODEL__UPPERCASE__s(req, res) {
    try {
        const filtrableKeys = ['firstName'];
        const filterQuery = {};
        filtrableKeys.forEach(key => { if (req.query[key]) { filterQuery[key] = req.query[key]; } });
        const response = await Models.__KAINDA__MODEL__UPPERCASE__.findPaginated(filterQuery, req.query);
        return res.status(200).json({
            ...response,
            data: response.data.map(__KAINDA__MODEL__LOWERCASE__ => __KAINDA__MODEL__LOWERCASE__.toJSON()),
        });
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

/**
 * Get __KAINDA__MODEL__LOWERCASE__ by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function get__KAINDA__MODEL__UPPERCASE__ById(req, res) {
    try {
        const __KAINDA__MODEL__LOWERCASE__ = await Models.__KAINDA__MODEL__UPPERCASE__.findById(req.params.__KAINDA__MODEL__LOWERCASE___id);
        if (!__KAINDA__MODEL__LOWERCASE__) {
            throw new Models.__KAINDA__MODEL__UPPERCASE__.Exceptions.__KAINDA__MODEL__UPPERCASE__NotFoundException({
                error_type: "NOT_FOUND",
                error_message: req.params.__KAINDA__MODEL__LOWERCASE___id + " not found",
                error_data: {
                    req: req.body
                }
            })
        }
        return res.status(200).json(__KAINDA__MODEL__LOWERCASE__.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

module.exports = {
    getAll__KAINDA__MODEL__UPPERCASE__s,
    get__KAINDA__MODEL__UPPERCASE__ById,
};