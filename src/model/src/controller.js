const { GenericControllers } = require("../../generic.controllers");
const { ExceptionHandler } = require("../../exception.handler");

async function sta(modelName, modelType) {

    return async function (req, res) {
        try {
            const data = req.body;
            const model = await GenericControllers.create(modelName, data, modelType);
            res.status(200).json(model);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}