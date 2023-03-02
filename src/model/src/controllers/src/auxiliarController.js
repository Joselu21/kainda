const GenericControllers = require("../../../../generic.controllers");
const ModelType = require("../../modelType");

function genericAuxiliarCreate(model) {
    return async function(data, options) {
        return await GenericControllers.__genericCreate(model, data, options?.transaction, options);
    };
}

function genericAuxiliarGetAll(model) {
    return async function(options) {
        return await GenericControllers.__genericGetAll(model, options?.transaction, options);
    };
}

function genericAuxiliarGetById(model) {
    return async function(id, options) {
        return await GenericControllers.__genericGet(model, id, options?.transaction, options);
    };
}

function genericAuxiliarGetBy(model) {
    return async function(data, options) {
        return await GenericControllers.__genericGetBy(model, data, options?.transaction, options);
    };
}

function genericAuxiliarUpdate(model) {
    return async function(data, options) {
        return await GenericControllers.__genericUpdate(model, data, options?.transaction, options);
    };
}

function genericAuxiliarDelete(model) {
    return async function(id, options) {
        return await GenericControllers.__genericDelete(model, id, options?.transaction, options);
    };
}

function generateGenericControllers(model) {
    if(!model) {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    let name = type === "sequelize" ? model.name : model.modelName;
    let plural = name + "s";
    return {
        ["__create" + name] :       genericAuxiliarCreate(model),
        ["__get" + name + "ById"] : genericAuxiliarGetById(model),
        ["__getAll" + plural] :     genericAuxiliarGetAll(model),
        ["__get" + name + "By"] :   genericAuxiliarGetBy(model),
        ["__update" + name] :       genericAuxiliarUpdate(model),
        ["__delete" + name] :       genericAuxiliarDelete(model),
    };
}

module.exports = generateGenericControllers;