const CreatePassThrough = require('./src/create');
const GetPassThrough = require('./src/get');
const UpdatePassThrough = require('./src/update');
const DeletePassThrough = require('./src/delete');

module.exports = function generatePassthrough(model) {
    if(!model) {
        throw new Error("No model found for this submodel");
    }
    return {
        create : CreatePassThrough(model),
        get :    GetPassThrough(model),
        update : UpdatePassThrough(model),
        delete : DeletePassThrough(model),
    };
};