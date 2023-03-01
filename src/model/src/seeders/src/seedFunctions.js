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
    return model.seed_options.seed === true && !model.seed_options.is_seeded;
}

async function seedDependencies(model, options = {}) {
    __validModel(model);
    if (model.seed_options.dependencies && model.seed_options.dependencies.length > 0) {
        for (let dependency of model.seed_options.dependencies) {
            if (shouldSeed(dependency)) {
                __validSeeder(model.seed_options[dependency]);
                await model.seed_options[dependency].Seeders.seed(options.transaction);
            }
        }
    }
}

async function __seed(model, data, options = {}) {
    __validModel(model);
    await model.insertMany(data, options);
    return model.seed_options.is_seeded = true;
}

async function seed(model, data, options = {}) {
    __validModel(model);
    if(!shouldSeed(model)) {
        return;
    }
    await seedDependencies(model, options);
    let need_to_seed = true;
    if (model.seed_options.oldRecords && model.seed_options.oldRecords !== "") {
        need_to_seed = await processOldRecords(model, data, options);
    }
    if (need_to_seed) {
        await __seed(model, data, options);
    }
}


async function processOldRecords(model, data, options = {}) {
    __validModel(model);
    if (!model.seed_options.oldRecords || model.seed_options.oldRecords === "") {
        return;
    }
    if (model.seed_options.oldRecords) {
        if(options.override && options.override[model.seed_options.oldRecords]) {
            await options.override[model.seed_options.oldRecords](model, data, options);
        } else {
            const option_name = model.seed_options.oldRecords.charAt(0).toUpperCase() + model.seed_options.oldRecords.slice(1);
            await ("__processOld" + option_name)(model, data, options);
        }                
    }
}

async function __processOldDeleteAll(model, data, options = {}) {
    __validModel(model);
    await model.deleteMany({}, options);
    return true;
}

async function __processOldOnlyOverwrite(model, options = {}) {
    __validModel(model);
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
    __validModel(model);
    await __processOldOnlyOverwrite(model, options);
    return true;
}

async function __processOldDontSeedIfRecordsExists(model, data, options = {}) {
    __validModel(model);
    const { count } = await model.findAndCountAll({ where: {}, transaction: options.transaction });
    return count === 0;    
}

async function __processOldDontSeedIfAllExists(model, data, options = {}) {
    __validModel(model);
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const record = model.findOne({ where: element, transaction: options.transaction });
        if (!record) {
            return true;
        }
    }
    return false;

}

module.exports = {
    shouldSeed,
    seed,
    seedDependencies,
    processOldRecords,
};

