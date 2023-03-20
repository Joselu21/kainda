const { ExceptionHandler } = require('kainda');
const LogService = require("@services/log.service");

async function create__KAINDA__MODEL__UPPERCASE__(req, res) {
    let transaction = await Models.__KAINDA__MODEL__UPPERCASE__.transaction();
    try {
        const __KAINDA__MODEL__LOWERCASE__ = await Models.__KAINDA__MODEL__UPPERCASE__.Controller.__create__KAINDA__MODEL__UPPERCASE__(req.body, { transaction });
        await transaction.commit();
        return res.status(201).json(__KAINDA__MODEL__LOWERCASE__.toJSON());
    } catch (error) {
        LogService.ErrorLogger.error(error);
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

module.exports = {
    create__KAINDA__MODEL__UPPERCASE__,
};