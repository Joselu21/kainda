const ModelType = require("../../modelType");

async function __updateOneSequelize(data, options) {
    const instance = await this.subModel.find(data, options);
    return await instance.update(data, options);
}

async function __updateOneMongoose(data, options) {
    return await this.subModel.updateOne(data, {
        session : options?.transaction,
        ...options,
    });
}

async function __updateManySequelize(data, options) {
    return await this.subModel.update(data, options);
}

async function __updateManyMongoose(data, options) {
    return await this.subModel.updateMany(data, {
        session : options?.transaction,
        ...options,
    });
}

async function generateUpdatePassThrough(model) {
    if(!model) {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    if(type === "sequelize") {
        return {
            updateOne : __updateOneSequelize,
            updateMany : __updateManySequelize,
        };
    } else if(type === "mongoose") {
        return {
            updateOne : __updateOneMongoose,
            updateMany : __updateManyMongoose,
        };
    }
}

module.exports = generateUpdatePassThrough;

