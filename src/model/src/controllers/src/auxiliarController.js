const GenericControllers = require("../../../../generic.controllers");

function genericAuxiliarCreate(model) 
{
    return async function(data, options) 
    {
        return await GenericControllers.__genericCreate(model, data, options?.transaction, options);
    };
}

function genericAuxiliarGetAll(model) 
{
    return async function(options) 
    {
        return await GenericControllers.__genericGetAll(model, options?.transaction, options);
    };
}

function genericAuxiliarGetById(model) 
{
    return async function(id, options) 
    {
        return await GenericControllers.__genericGet(model, id, options?.transaction, options);
    };
}

function genericAuxiliarGetBy(model) 
{
    return async function(data, options) 
    {
        return await GenericControllers.__genericGetBy(model, data, options?.transaction, options);
    };
}

function genericAuxiliarUpdate(model) 
{
    return async function(data, options) 
    {
        return await GenericControllers.__genericUpdate(model, data, options?.transaction, options);
    };
}

function genericAuxiliarDelete(model) 
{
    return async function(id, options) 
    {
        return await GenericControllers.__genericDelete(model, id, options?.transaction, options);
    };
}

function generateGenericControllers(kaindaModel) 
{
    if(!kaindaModel) 
    {
        throw new Error("Invalid KaindaModel received in generateGenericControllers");
    }
    return {
        ["__create" + kaindaModel.name] :       genericAuxiliarCreate(kaindaModel),
        ["__get" + kaindaModel.name + "ById"] : genericAuxiliarGetById(kaindaModel),
        ["__getAll" + kaindaModel.name + "s"] : genericAuxiliarGetAll(kaindaModel),
        ["__get" + kaindaModel.name + "By"] :   genericAuxiliarGetBy(kaindaModel),
        ["__update" + kaindaModel.name] :       genericAuxiliarUpdate(kaindaModel),
        ["__delete" + kaindaModel.name] :       genericAuxiliarDelete(kaindaModel),
    };
}

module.exports = generateGenericControllers;