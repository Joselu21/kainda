
function isSequelizeModel(model) {
    return model?.subModel?.prototype?.constructor?.name === "Model";
}

function isMongooseModel(model) {
    return model?.subModel?.prototype?.constructor?.name === "model";
}

function isMongoose() {
    return isMongooseModel(this);
}

function isSequelize() {
    return isSequelizeModel(this);
}

function getTypeExternal(model) {
    const modelAux = {
        subModel: model
    }
    return getType(modelAux);
}

function getType(model) {
    if (isSequelizeModel(model)) {
        return "sequelize";
    } else if (isMongooseModel(model)) {
        return "mongoose";
    } else {
        throw new Error("The model is not a valid model.");
    }
}

module.exports = {
    isSequelizeModel,
    isMongooseModel,
    isMongoose,
    isSequelize,
    getType,
    getTypeExternal
};
