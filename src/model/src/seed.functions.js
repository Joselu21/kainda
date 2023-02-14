const { KaindaException } = require('../../exceptions');

function isSequelizeModel(model) {
    return model?.prototype?.constructor?.name === "Model";
}

function isMongooseModel(model) {
    return model?.prototype?.constructor?.name === "model";
}

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

async function processOldRecords(model, data, options = {}) {
    __validModel(model);
    if (!model.seed_options.oldRecords || model.seed_options.oldRecords === "") {
        return;
    }
    switch (model.seed_options.oldRecords) {
        case "deleteAll":
            if (options.override && options.override.deleteAll) {
                await options.override.deleteAll(model, options);
            } else {
                await __processOldDeleteAll(model, options);
            }
            break;
        case "onlyOverwrite":
            if (options.override && options.override.onlyOverwrite) {
                await options.override.onlyOverwrite(model, options);
            } else {
                await __processOldOnlyOverwrite(model, data, options);
            }
            break;
    }

}

async function __processOldDeleteAll(model, data, options = {}) {
    __validModel(model);
    if (isSequelizeModel(model)) {
        await model.destroy({ where: {}, transaction: options.transaction });
    } else if (isMongooseModel(model)) {
        await model.deleteMany({}, { session: options.transaction });
    }
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
    return model.seed_options.is_seeded = true;
}