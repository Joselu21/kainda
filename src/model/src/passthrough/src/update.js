const ModelType = require("../../modelType");

async function __updateOneSequelize(data, filter, options) {
    const instance = await this.subModel.findOne({
        where : filter,
    }, {
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
    return await instance.update(data, options);
}

async function __updateOneMongoose(data, filter, options) {
    return await this.subModel.updateOne(filter, data, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __updateManySequelize(data, options) {
    return await this.subModel.update(data, {
        ...options,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __updateManyMongoose(data, options) {
    return await this.subModel.updateMany({
        ...options.where
    }, data, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

function generateUpdatePassThrough(model) {
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

