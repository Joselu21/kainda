const ModelType = require("../../modelType");

async function __deleteOneSequelize(data, options) 
{
    const result = await this.subModel.findOne({
        where : data,
    }, {
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
    if(result) 
    {
        return await result.destroy(options);
    }
    return null;
}

async function __deleteOneMongoose(data, options) 
{
    return await this.subModel.deleteOne(data, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __deleteManySequelize(data, options) 
{
    return await this.subModel.destroy({
        where : data,
        ...options,
        transaction : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __deleteManyMongoose(data, options) 
{
    return await this.subModel.deleteMany(data, {
        session : (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

function generateDeletePassThrough(model) 
{
    if(!model) 
    {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    if(type === "sequelize") 
    {
        return {
            deleteOne : __deleteOneSequelize,
            deleteMany : __deleteManySequelize,
        };
    }
    else if(type === "mongoose") 
    {
        return {
            deleteOne : __deleteOneMongoose,
            deleteMany : __deleteManyMongoose,
        };
    }
}

module.exports = generateDeletePassThrough;