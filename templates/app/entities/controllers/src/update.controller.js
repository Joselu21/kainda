async function update__KAINDA__MODEL__UPPERCASE__(req, res) {
    let transaction = await Models.__KAINDA__MODEL__UPPERCASE__.transaction();
    try {
        let container = { ...req.body, [Models.__KAINDA__MODEL__UPPERCASE__.modelId]: req.params.__KAINDA__MODEL__LOWERCASE___id };
        const __KAINDA__MODEL__LOWERCASE__ = await Models.__KAINDA__MODEL__UPPERCASE__.Controller.__update__KAINDA__MODEL__UPPERCASE__(container, {transaction});
        await transaction.commit();
        return res.status(200).json(__KAINDA__MODEL__LOWERCASE__.toJSON()); 
    } catch (error) {
        if(transaction) {
            await transaction.rollback();
        }
        ExceptionHandler(error, res);
    }
}

module.exports = {
    update__KAINDA__MODEL__UPPERCASE__
}