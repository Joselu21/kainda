const { KaindaException } = require('../../../../exceptions');

function __validModel(model) {
    if (!model || !model.seed_options) {
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

function __validSeeder(model) {
    __validModel(model);
    if (!model.Seeders || !model.Seeders.seed) {
        throw new KaindaException({
            error_type: "INVALID_MODEL",
            error_message: "The model does not have seeders.",
            error_data: {
                model_name: model?.modelName ?? model?.name ?? "Unknown",
                model: model
            }
        }, 500);
    }
}

function shouldSeed(model) {
    __validModel(model);
    return model.seed_options.seed === true && model.seed_options.is_seeded !== true;
}

async function seedDependencies(model, options = {}) {
    __validModel(model);
    if (model.seed_options.dependencies && model.seed_options.dependencies.length > 0) {
        for (let dependency of model.seed_options.dependencies) {
            if (shouldSeed(dependency)) {
                __validSeeder(model.seed_options[dependency]);
                if (model.seed_options[dependency].Seeders && model.seed_options[dependency].Seeders.seed && typeof model.seed_options[dependency].Seeders.seed === "function"){
                    // TODO: For user-defined seed functions we pass the full options object to ensure that the user can easily override this command. 2 dependencies???
                    await model.seed_options[dependency].Seeders.seed(options);
                } else if (model.seed_options[dependency].seed && typeof model.seed_options[dependency].seed === "function"){
                    await model.seed_options[dependency].seed(null, options);
                }
            }
        }
    }
}

async function __seed(model, data, options = {}) {
    __validModel(model);
    await model.insertMany(data, options);
    return model.seed_options.is_seeded = true;
}

async function seed(data = null, options = {}) {
    __validModel(this);
    if (!shouldSeed(this)) {
        return;
    }
    await seedDependencies(this, options);
    if (!data || data.length === 0) {
        data = this.seed_options.data;
    }
    let need_to_seed = true;
    if (this.seed_options.oldRecords && this.seed_options.oldRecords !== "") {
        need_to_seed = await processOldRecords(this, data, options);
    }
    if (need_to_seed) {
        await __seed(this, data, options);
    }
}

async function processOldRecords(model, data, options = {}) {
    __validModel(model);
    if (!model.seed_options.oldRecords || model.seed_options.oldRecords === "") {
        return;
    }
    if (model.seed_options.oldRecords) {
        if (options.override && options.override[model.seed_options.oldRecords]) {
            await options.override[model.seed_options.oldRecords](model, data, options);
        } else {
            return await processOldFunctions[model.seed_options.oldRecords](model, data, options);
        }
    }
}

const processOldFunctions = {
    deleteAll: __processOldDeleteAll,
    onlyOverwrite: __processOldOnlyOverwrite,
    overwriteAndSeed: __processOldOverwriteAndSeed,
    dontSeedIfRecordsExists: __processOldDontSeedIfRecordsExists,
    dontSeedIfAnyExists: __processOldDontSeedIfAnyExists,
    dontSeedIfAllExists: __processOldDontSeedIfAllExists,
};

async function __processOldDeleteAll(model, data, options = {}) {
    await model.deleteMany({}, options);
    return true;
}

// TODO: Fix this SHIT
async function __processOldOnlyOverwrite(model, options = {}) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const record = isSequelizeModel
        if (record) {
            await model.updateOne({ admin_id: element.admin_id }, element, { session: t });
        }
    }
    return !(model.seed_options.is_seeded = true);
}

async function __processOldOverwriteAndSeed(model, data, options = {}) {
    await __processOldOnlyOverwrite(model, options);
    return true;
}

async function __processOldDontSeedIfRecordsExists(model, data, options = {}) {
    const { count } = await model.findAndCountAll({}, { transaction: options.transaction });
    return count === 0;
}

async function __processOldDontSeedIfAnyExists(model, data, options = {}) {
    let exists = false;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const record = await model.findMany(element, options);
        if (record && record.length > 0) {
            exists = true;
            break;
        }
    }
    return !exists;
}

async function __processOldDontSeedIfAllExists(model, data, options = {}) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const record = await model.findMany(element, options);
        if (!record || record.length > 0) {
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

