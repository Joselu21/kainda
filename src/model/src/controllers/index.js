const generateAuxiliarController = require("./src/auxiliarController.js");

module.exports = function generateControllers(model) 
{
    if(!model) 
    {
        throw new Error("No model found for this submodel");
    }
    return generateAuxiliarController(model);
};