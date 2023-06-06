const ExceptionService = require("@services/exception.service");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");

/**
 * Delete __KAINDA__MODEL__LOWERCASE__ by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function delete__KAINDA__MODEL__UPPERCASE__(req, res) 
{
    const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;
    let transaction = await __KAINDA__MODEL__UPPERCASE__.transaction(DbService.get());
    try 
    {
        const __KAINDA__MODEL__LOWERCASE__ = await __KAINDA__MODEL__UPPERCASE__.Controller.__delete__KAINDA__MODEL__UPPERCASE__(req.params.__KAINDA__MODEL__LOWERCASE___id ?? req.body.__KAINDA__MODEL__LOWERCASE___id, { transaction });
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
    delete__KAINDA__MODEL__UPPERCASE__
};