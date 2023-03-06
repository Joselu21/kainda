const ModelType = require("../../modelType");
const { KaindaException, GenericKaindaExceptions } = require("../../../../exceptions");

async function __findOneSequelize(conditions, options) {
    return await this.subModel.findOne({
        where : conditions,
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findOneMongoose(conditions, options) {
    return await this.subModel.findOne(conditions, null, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __findManySequelize(conditions, options) {
    return await this.subModel.findAll({
        where : conditions,
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findManyMongoose(conditions, options) {
    return await this.subModel.find(conditions, null, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __findAndCountAllSequelize(conditions, options) {
    return await this.subModel.findAndCountAll({
        where : conditions,
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findAndCountAllMongoose(conditions, options) {
    const rows = await this.subModel.find(conditions, null, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
    const count = rows.length;
    return {
        rows,
        count,
    };
}

async function __findByIdSequelize(id, options) {
    return await this.subModel.findByPk(id, {
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findByIdMongoose(id, options) {
    let mongoose_id;
    try {
        mongoose_id = new global.mongoose.Types.ObjectId(id);
    } catch (error) {
        throw new GenericKaindaExceptions.Kainda404Exception({
            error_type : "NOT_FOUND",
            error_message : "Error finding " + this.name + " with id: " + id,
            error_data : {
                model_name : this.name,
                id : id,
                options : {
                    ...options,
                    transaction : !!options?.transaction,
                },
                error : error,
            }
        })
    }
    return await this.subModel.findById(mongoose_id, null, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
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