/**
 * The generic function that handles the creation of a new instance of a model.
 * @param {*} model The model class to create the instance of.
 * @param {*} data An object containing at least the required fields of the model.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @param {*} options An object containing the options for the operation. In this case, the options are:
 * - required_keys: An array of strings containing the required keys for the operation. If not provided, the required keys will be extracted from the model.
 * @returns The recently created instance.
 */
async function __genericCreate(model, data, transaction = null, options = {}) {

    // Extract the required keys from the model or update the required keys from the options
    let required_keys = model.create_required_keys;
    if (options.required_keys) {
        required_keys = options.required_keys;
    }

    // Check if the required keys array is present in the model
    if (!required_keys || required_keys.length === 0) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotCreatedException"]({
            error_type: "BACKEND_ERROR",
            error_message: "No required keys found for " + (model.modelName ?? model.name) + ", change the model definition or provide the required keys in the options.",
            error_data: {
                model_name: (model.modelName ?? model.name),
                data: data,
                transaction: transaction?.id,
                options: options
            }
        }, 500);
    }

    // Check if the required keys are present in the data
    const missing_fields = required_keys.filter(key => data[key] === undefined);

    // If there are missing fields, throw an exception
    if (missing_fields.length > 0) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotCreatedException"]({
            error_type: "ATTRIBUTE_MISSING",
            error_message: "Missing fields: " + missing_fields.join(", "),
            error_data: {
                model_name: (model.modelName ?? model.name),
                data: data,
                transaction: transaction?.id,
                options: options,
                missing_fields: missing_fields
            }
        }, 400);
    }

    // Create the instance
    const instance = model.sequelize ? await model.create(data, { transaction: transaction }) : await model.create([data], { session: transaction });
    if (!instance) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotCreatedException"]({
            error_type: "NOT_CREATED",
            error_message: "Error creating " + (model.modelName ?? model.name),
            error_data: {
                model_name: (model.modelName ?? model.name),
                data: data,
                transaction: transaction?.id,
                options: options,
                instance: instance,
            }
        }, 500);
    }

    // Return the instance
    return instance.length > 0 ? instance[0] : instance;
}

/**
 * The generic function that handles the retrieval of a list of all instances of a model.
 * @param {*} model The model class to retrieve the instances of.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns An array of retrieved instances of the model.
 */
async function __genericGetAll(model, transaction = null) {

    // Retrieve all instances of the model using sequelize's findAll function or mongoose's find function
    const instances = model.sequelize ? await model.findAll({ transaction: transaction }) : await model.find({}).session(transaction).exec();
    if (!instances) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotFoundException"]({
            error_type: "NOT_FOUND",
            error_message: "Error finding all " + (model.modelName ?? model.name),
            error_data: {
                model_name: (model.modelName ?? model.name),
                transaction: transaction?.id,
                instances: instances
            }
        }, 404);
    }

    // Return the instances
    return instances;

}

/**
 * The generic function that handles the retrieval of a single instance of a model by primary key.
 * @param {*} model The model class to retrieve the instance of.
 * @param {*} id The primary key of the instance to retrieve.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The retrieved instance of the model.
 */
async function __genericGet(model, id, transaction = null) {

    // Retrieve the instance of the model using sequelize's findByPk function or mongoose's findById function
    const instance = model.sequelize ? await model.findByPk(id, { transaction: transaction }) : await model.findById(id).session(transaction).exec();
    if (!instance) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotFoundException"]({
            error_type: "NOT_FOUND",
            error_message: "Error finding " + (model.modelName ?? model.name) + " with id: " + id,
            error_data: {
                model_name: (model.modelName ?? model.name),
                id: id,
                transaction: transaction?.id,
                instance: instance
            }
        }, 404);
    }

    // Return the instance
    return instance;

}

/**
 * The generic function that handles the update of a single instance of a model by primary key.
 * @param {*} model The model class to update the instance of.
 * @param {*} data An object containing at least the required fields of the model.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The updated instance of the model.
 */
async function __genericUpdate(model, data, transaction = null, options = {}) {

    let updateable_keys = options.updateable_keys ?? model.updateable_keys;

    // Check if the updateable keys array is present in the model
    if (!updateable_keys || updateable_keys.length === 0) {
        throw new model.Exceptions[(model.modelName ?? model.name) + "NotUpdatedException"]({
            error_type: "BACKEND_ERROR",
            error_message: "No updateable keys found for " + (model.modelName ?? model.name) + ", change the model definition or provide the updateable keys in the options.",
            error_data: {
                model_name: (model.modelName ?? model.name),
                data: data,
                transaction: transaction?.id,
            }
        });
    }

    // Extract the required keys from the model or update the required keys from the options
    const id = data[(model.modelName ?? model.name).toLowerCase() + "_id"];
    const instance = await __genericGet(model, id, transaction);

    // Iterate over the data and update the instance if the key is updateable
    for (let key in data) {
        if (updateable_keys.includes(key)) {
            instance[key] = data[key];
        }
    }

    // Save the instance
    model.sequelize ? await instance.save({ transaction: transaction }) : await instance.save({ session: transaction });

    // Return the instance
    return instance;
}

/**
 * The generic function that handles the deletion of a single instance of a model by primary key.
 * @param {*} model The model class to delete the instance of.
 * @param {*} id The primary key of the instance to delete.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The deleted instance of the model.
 */
async function __genericDelete(model, id, transaction = null) {

    // Retrieve the instance of the model using kainda's generic get function
    const instance = await __genericGet(model, id, transaction);

    // Delete the instance
    model.sequelize ? await instance.destroy({ transaction: transaction }) : await instance.remove({ session: transaction });

    // Return the instance
    return instance;

}

module.exports = {
    __genericCreate,
    __genericGet,
    __genericGetAll,
    __genericUpdate,
    __genericDelete,
}