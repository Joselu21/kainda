const { ExceptionHandler } = require('kainda');
const LogService = require("@services/log.service");

async function getAll__KAINDA__MODEL__UPPERCASE__s(req, res) {
    try {
        const __KAINDA__MODEL__LOWERCASE__s = await Models.__KAINDA__MODEL__UPPERCASE__.Controller.__getAll__KAINDA__MODEL__UPPERCASE__s();
        return res.status(200).json(__KAINDA__MODEL__LOWERCASE__s.map(
            (__KAINDA__MODEL__LOWERCASE__) => __KAINDA__MODEL__LOWERCASE__.toJSON()
        ));
    } catch (error) {
        LogService.ErrorLogger.error(error);
        ExceptionHandler(error, res);
    }
}

async function get__KAINDA__MODEL__UPPERCASE__ById(req, res) {
    try {
        const __KAINDA__MODEL__LOWERCASE__ = await Models.__KAINDA__MODEL__UPPERCASE__.Controller.__get__KAINDA__MODEL__UPPERCASE__ById(req.params.__KAINDA__MODEL__LOWERCASE___id);
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