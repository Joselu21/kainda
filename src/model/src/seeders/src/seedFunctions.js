const { KaindaException } = require("../../../../exceptions");
const { validate } = require("./seedOptions");

/**
 * @typedef import {(./seedOptions.js)} SeedOptions;
 * @typedef import {(./../../../../exceptions.js)} KaindaException;
 */

/**
 * @typedef {Object} SeedFunctionsOptions
 * @property {boolean} ignoreDependencies - Whether or not to ignore this model's dependencies
 * @property {boolean} override - An object containing override functions
 * @property {Function} override.seedDependencies - The override function for seeding dependencies
 * @property {Function} override.seed - The override function for seeding the model
 * @property {Object} transaction - An object containing transaction options
 * @exports SeedFunctionsOptions
 */

/**
 * Checks whether the given model has seed options.
 *
 * @param {Object} model - The model to validate
 * @throws {KaindaException} if the model does not have seed options
 * @private
 */
function __validModel(model) 
{
    if (!model || !model.seed_options) 
    {
        throw new KaindaException({
            error_type: "INVALID_MODEL",
            error_message: "The model does not have seed options.",
            error_data: {
                model_name: model?.modelName ?? model?.name ?? "Unknown",
                model: model
            }
        }, 500);
    }
}

/**
 * Checks whether the given model has seeders.
 *
 * @param {Object} model - The model to validate
 * @throws {KaindaException} if the model does not have seeders
 * @private
 */
function __validSeeder(model) 
{
    __validModel(model);
    validate(model.seed_options);
}

/**
 * Checks whether this model should be seeded.
 *
 * @param {Object} model - The model to check
 * @throws {KaindaException} if the model does not have seed options
 * @returns {boolean} whether this model should be seeded
 */
function shouldSeed(model) 
{
    __validModel(model);
    return model.seed_options.seed === true && model.seed_options.is_seeded !== true;
}

/**
 * Seeds the dependencies of the given model.
 *
 * @param {Object} model - The model whose dependencies to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @throws {KaindaException} if the model does not have seed options or correctly defined seeders
 * @private
 */
async function seedDependencies(model, options = {}) 
{
    __validModel(model);
    if (model.seed_options.dependencies && model.seed_options.dependencies.length > 0) 
    {
        for (let dependency of model.seed_options.dependencies) 
        {
            if (shouldSeed(dependency)) 
            {
                __validSeeder(dependency);
                if (dependency.Seeders && dependency.Seeders.seed && typeof dependency.Seeders.seed === "function") 
                {
                    await dependency.Seeders.seed(null, options);
                }
                else if (dependency.seed && typeof dependency.seed === "function") 
                {
                    await dependency.seed(null, options);
                }
            }
        }
    }
}

/**
 * Seeds the given data in the given model.
 *
 * @param {Object} model - The model to seed
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the data was seeded successfully
 * @private
 */
async function __seed(model, data, options = {}) 
{
    __validModel(model);
    await model.insertMany(data, options);
    return model.seed_options.is_seeded = true;
}

/**
 * Seeds this model with the given data.
 *
 * @param {Array<Object>|null} data - The data to seed (defaults to the model's seed options data)
 * @param {SeedFunctionsOptions} options - The seed function options
 * @throws {KaindaException} if the model does not have seed options or correctly defined seeders or if there was an error seeding the data
 * @returns {Promise<void>}
 */
async function seed(data = null, options = {}) 
{
    __validModel(this);
    if (!shouldSeed(this)) 
    {
        return;
    }
    __validSeeder(this);
    if (this.seed_options.dependencies && this.seed_options.dependencies.length > 0 && !options.ignoreDependencies) 
    {
        if (options.override && options.override.seedDependencies) 
        {
            await options.override.seedDependencies(this, options);
        }
        else 
        {
            await seedDependencies(this, options);
        }
    }
    if (!data || data.length === 0) 
    {
        data = this.seed_options.data;
    }
    let need_to_seed = true;
    if (this.seed_options.oldRecords && this.seed_options.oldRecords !== "") 
    {
        need_to_seed = await processOldRecords(this, data, options);
    }
    if (need_to_seed) 
    {
        await __seed(this, data, options);
    }
}

/**
 * Processes old records in the given model.
 *
 * @param {Object} model - The model whose old records to process
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @throws {KaindaException} if the model does not have seed options or correctly defined seeders or if there was an error processing the old records
 * @returns {Promise<boolean>} whether the old records were processed successfully
 * @private
 */
async function processOldRecords(model, data, options = {}) 
{
    __validModel(model);
    if (!model.seed_options.oldRecords || model.seed_options.oldRecords === "") 
    {
        return;
    }
    if (model.seed_options.oldRecords) 
    {
        if (options.override && options.override[model.seed_options.oldRecords]) 
        {
            await options.override[model.seed_options.oldRecords](model, data, options);
        }
        else 
        {
            return await processOldFunctions[model.seed_options.oldRecords](model, data, options);
        }
    }
}


const processOldFunctions = {
    deleteAll: __processOldDeleteAll,
    ignore: __processOldIgnore,
    dontSeedIfRecordsExists: __processOldDontSeedIfRecordsExists,
    dontSeedIfAnyExist: __processOldDontSeedIfAnyExist,
    dontSeedIfAllExist: __processOldDontSeedIfAllExist,
};

/**
 * Deletes all old records in the given model.
 *
 * @param {Object} model - The model whose old records to delete
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the old records were deleted successfully
 * @private
 */
async function __processOldDeleteAll(model, data, options = {}) 
{
    await model.deleteMany({}, options);
    return true;
}

/**
 * Ignores the old records in the given model.
 * 
 * @param {Object} model - The model whose old records to ignore
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the old records were ignored successfully
 * @private
 */
async function __processOldIgnore() 
{
    return true;
}


/**
 * Seeds the given model only if there are no records in the database.
 * @param {Object} model - The model to seed
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the model was seeded successfully
 * @private
 */
async function __processOldDontSeedIfRecordsExists(model, data, options = {}) 
{
    const { count } = await model.findAndCountAll({}, { transaction: options.transaction });
    return count === 0;
}

/**
 * Seeds the given model unless at least one record in the given data is similar to a database one.
 * @param {Object} model - The model to seed
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the model was seeded successfully
 * @deprecated The behavior of this function may vary a lot depending on database structure and the given data, so it is not recommended to use it.
 * @private
 */
async function __processOldDontSeedIfAnyExist(model, data, options = {}) 
{
    let exists = false;
    for (let i = 0; i < data.length; i++) 
    {
        const element = data[i];
        const record = await model.findMany(element, options);
        if (record && record.length > 0) 
        {
            exists = true;
            break;
        }
    }
    return !exists;
}

/**
 * Seeds the given model unless all records in the given data are similar to database ones.
 * @param {Object} model - The model to seed
 * @param {Array<Object>} data - The data to seed
 * @param {SeedFunctionsOptions} options - The seed function options
 * @returns {Promise<boolean>} whether the model was seeded successfully
 * @deprecated The behavior of this function may vary a lot depending on database structure and the given data, so it is not recommended to use it.
 * @private
 */
async function __processOldDontSeedIfAllExist(model, data, options = {}) 
{
    for (let i = 0; i < data.length; i++) 
    {
        const element = data[i];
        const record = await model.findMany(element, options);
        if (!record || record.length > 0) 
        {
            return false;
        }
    }
    return true;
}

module.exports = {
    shouldSeed,
    seed,
    seedDependencies,
    processOldRecords,
};

