const ModelType = require("../../modelType");

async function __findOneSequelize(conditions, options) 
{
    return await this.subModel.findOne({
        where: conditions,
        ...options,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findOneMongoose(conditions, options) 
{
    return await this.subModel.findOne(conditions, null, {
        session: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __findManySequelize(conditions, options) 
{
    return await this.subModel.findAll({
        where: conditions,
        ...options,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findManyMongoose(conditions, options) 
{
    return await this.subModel.find(conditions, null, {
        session: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __findAndCountAllSequelize(conditions, options) 
{
    return await this.subModel.findAndCountAll({
        where: conditions,
        ...options,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findAndCountAllMongoose(conditions, options) 
{
    const rows = await this.subModel.find(conditions, null, {
        session: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
    const count = rows.length;
    return {
        rows,
        count,
    };
}

async function __findByIdSequelize(id, options) 
{
    return await this.subModel.findByPk(id, {
        ...options,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });
}

async function __findByIdMongoose(id, options) 
{
    let mongoose_id = id;
    return await this.subModel.findById(mongoose_id, null, {
        session: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        ...options,
    });
}

async function __findPaginatedSequelize(conditions, options) 
{
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    let offset = options.offset ?? (page - 1) * limit;
    offset = offset < 0 ? 0 : offset;
    // Set the default sort column and direction
    let order = [["createdAt", "DESC"]];

    // Update the sort column and direction if provided
    if (options?.sort) 
    {
        order = [];
        for (const key in options.sort) 
        {
            let element = options.sort[key];
            if (element === 1) 
            {
                element = "ASC";
            }
            else if (element === -1) 
            {
                element = "DESC";
            }
            order.push([key, element]);
        }
    }
    const { rows, count } = await this.subModel.findAndCountAll({
        where: conditions,
        ...options,
        offset,
        limit,
        order,
        transaction: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
    });

    return {
        data: rows,
        total : count,
        count: rows.length,
        offset,
        page,
        limit,
    };
}

async function __findPaginatedMongoose(conditions, options) 
{
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    let offset = options.offset ?? (page - 1) * limit;
    offset = offset < 0 ? 0 : offset;
    const query = {};
    
    // Convert the conditions to a query
    for (const key in conditions) 
    {
        const element = conditions[key];
        let splitted = [];
        if(typeof element === "string") 
        {
            splitted = element.split(",");
        }
        if (splitted.length > 1) 
        {
            query[key] = {
                $in: splitted,
            };
        }
        else 
        {
            query[key] = element;
        }
    }

    // Set the default sort column and direction
    let sortOrder = options.sort ?? { createdAt: -1 }; // Default to descending order

    const rows = await this.subModel.find(query, null, {
        session: (options?.transaction?.isKaindaTransaction ? options.transaction.transaction : options?.transaction),
        sort: sortOrder,
        skip: offset,
        limit,
    });
    const count = rows.length;
    const total = await this.subModel.countDocuments(query);
    return {
        data: rows,
        count,
        total,
        offset,
        page,
        limit,
    };
}

function generateGetPassThrough(model) 
{
    if (!model) 
    {
        throw new Error("No model found for this submodel");
    }
    const type = ModelType.getTypeExternal(model);
    if (type === "sequelize") 
    {
        return {
            findOne: __findOneSequelize,
            findMany: __findManySequelize,
            findAndCountAll: __findAndCountAllSequelize,
            findById: __findByIdSequelize,
            findPaginated: __findPaginatedSequelize,
        };
    }
    else if (type === "mongoose") 
    {
        return {
            findOne: __findOneMongoose,
            findMany: __findManyMongoose,
            findAndCountAll: __findAndCountAllMongoose,
            findById: __findByIdMongoose,
            findPaginated: __findPaginatedMongoose,
        };
    }
}

module.exports = generateGetPassThrough;