const { ExceptionHandler } = require('kainda');
const LogService = require("@services/log.service");

/**
 * Delete __KAINDA__MODEL__LOWERCASE__ by id
 * @async
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @returns {void}
 */
async function delete__KAINDA__MODEL__UPPERCASE__(req, res) {
    let transaction = await Models.__KAINDA__MODEL__UPPERCASE__.transaction();
    try {
        const __KAINDA__MODEL__LOWERCASE__ = await Models.__KAINDA__MODEL__UPPERCASE__.Controller.__delete__KAINDA__MODEL__UPPERCASE__(req.params.__KAINDA__MODEL__LOWERCASE___id ?? req.body.__KAINDA__MODEL__LOWERCASE___id, { transaction });
        await transaction.commit();
        return res.status(200).json(__KAINDA__MODEL__LOWERCASE__.toJSON());
    } catch (error) {
        const LogService = require("@services/log.service");
        if (transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

module.exports = {
    delete__KAINDA__MODEL__UPPERCASE__
};