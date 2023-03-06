const ModelType = require("../../modelType");

async function __createOneSequelize(data, options) {
    return await this.subModel.create(data, {
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __createOneMongoose(data, options) {
    const result = await this.subModel.insertMany([data], {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
    return result[0];
}

async function __createManySequelize(data, options) {
    return await this.subModel.bulkCreate(data, {
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __createManyMongoose(data, options) {
    return await this.subModel.insertMany(data, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

function generateCreatePassThrough(model) {
    if(!model) {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    if(type === "sequelize") {
        return {
            createOne : __createOneSequelize,
            createMany : __createManySequelize,
        };
    } else if(type === "mongoose") {
        return {
            createOne : __createOneMongoose,
            createMany : __createManyMongoose,
        };
    }
}

module.exports = generateCreatePassThrough;