const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Update __KAINDA__MODEL__LOWERCASE__
 * @async
 * @param {Express.Request} req 
 * @param {Express.Response} res
 * @returns {void}
 */
async function update__KAINDA__MODEL__UPPERCASE__(req, res) 
{
    const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;
    let transaction = await __KAINDA__MODEL__UPPERCASE__.transaction(DbService.get());
    try 
    {
        let container = { ...req.body, [__KAINDA__MODEL__UPPERCASE__.modelId]: req.params.__KAINDA__MODEL__LOWERCASE___id };
        const __KAINDA__MODEL__LOWERCASE__ = await __KAINDA__MODEL__UPPERCASE__.Controller.__update__KAINDA__MODEL__UPPERCASE__(container, { transaction });
        await transaction.commit();
        return res.status(200).json(__KAINDA__MODEL__LOWERCASE__.toJSON());
    }
    catch (error) 
    {
        LogService.ErrorLogger.error(error);
        if (transaction) 
        {
            await transaction.rollback();
        }
        ExceptionService.handle(error, res);
    }
}

module.exports = {
    update__KAINDA__MODEL__UPPERCASE__
};