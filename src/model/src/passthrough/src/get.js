const ModelType = require("../../modelType");

async function __findOneSequelize(conditions, options) {
    return await this.subModel.findOne(conditions, options);
}

async function __findOneMongoose(conditions, options) {
    return await this.subModel.findOne(conditions, null, {
        session : options?.transaction,
        ...options,
    });
}

async function __findManySequelize(conditions, options) {
    return await this.subModel.findAll(conditions, options);
}

async function __findManyMongoose(conditions, options) {
    return await this.subModel.find(conditions, null, {
        session : options?.transaction,
        ...options,
    });
}

async function __findAndCountAllSequelize(conditions, options) {
    return await this.subModel.findAndCountAll(conditions, options);
}

async function __findAndCountAllMongoose(conditions, options) {
    const rows = await this.subModel.find(conditions, null, {
        session : options?.transaction,
        ...options,
    });
    const count = rows.length;
    return {
        rows,
        count,
    };
}

async function __findByIdSequelize(id, options) {
    return await this.subModel.findByPk(id, options);
}

async function __findByIdMongoose(id, options) {
    return await this.subModel.findById(id, null, {
        session : options?.transaction,
        ...options,
    });
}

function generateGetPassThrough(model) {
    if(!model) {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    if(type === "sequelize") {
        return {
            findOne : __findOneSequelize,
            findMany : __findManySequelize,
            findAndCountAll : __findAndCountAllSequelize,
            findById : __findByIdSequelize,
        };
    } else if(type === "mongoose") {
        return {
            findOne : __findOneMongoose,
            findMany : __findManyMongoose,
            findAndCountAll : __findAndCountAllMongoose,
            findById : __findByIdMongoose,
        };
    }
}

module.exports = generateGetPassThrough;