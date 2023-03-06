const { missingFieldsResponse } = require("./middlewares.utils");
const { GenericKaindaExceptions } = require("./exceptions");

/**
 * The generic function that handles the creation of a new instance of a model.
 * @param {*} model The model class to create the instance of.
 * @param {*} data An object containing at least the required fields of the model.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @param {*} options An object containing the options for the operation. In this case, the options are:
 * - required_keys: An array of strings containing the required keys for the operation. If not provided, the required keys will be extracted from the model.
 * - bypass_required_keys: A boolean that indicates if the required keys should be checked or not. If true, the required keys will not be checked.
 * @returns The recently created instance.
 */
async function __genericCreate(model, data, transaction = null, options = {}) {

    // Extract the required keys from the model or update the required keys from the options
    let required_keys = model.create_required_keys;
    if (options.required_keys) {
        required_keys = options.required_keys;
    }

    // Check if the required keys array is present in the model
    if (!required_keys || required_keys.length === 0 && !options.bypass_required_keys) {
        throw new GenericKaindaExceptions.Kainda500Exception({
            error_type: "BACKEND_ERROR",
            error_message: "No required keys found for " + model.name + ", change the model definition or provide the required keys in the options.",
            error_data: {
                model_name: model.name,
                data: data,
                transaction: !!transaction,
                options: {
                    ...options,
                    transaction: !!transaction,
                }
            }
        });
    }

    // Check if the required keys are present in the data
    const missing_fields = missingFieldsResponse(required_keys, data);

    // If there are missing fields, throw an exception
    if (Object.keys(missing_fields).length > 0 && missing_fields.error_type) {
        throw new GenericKaindaExceptions.Kainda400Exception(missing_fields);
    }

    // Create the instance
    const instance =await model.createOne(data, { transaction: transaction });
    if (!instance) {
        throw new GenericKaindaExceptions.Kainda500Exception({
            error_type: "NOT_CREATED",
            error_message: "Error creating " + model.name,
            error_data: {
                model_name: model.name,
                data: data,
                transaction: !!transaction,
                options: {
                    ...options,
                    transaction: !!transaction,
                },
                instance: instance,
            }
        });
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

    // Retrieve all instances of the model
    const instances = model.findMany({}, { transaction: transaction });
    if (!instances) {
        throw new GenericKaindaExceptions.Kainda500Exception({
            error_type: "NOT_FOUND",
            error_message: "Error finding all " + model.name,
            error_data: {
                model_name: model.name,
                transaction: !!transaction,
                instances: instances
            }
        });
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

    // Retrieve the instance of the model
    const instance = await model.findById(id, { transaction: transaction });
    if (!instance) {
        throw new GenericKaindaExceptions.Kainda404Exception({
            error_type: "NOT_FOUND",
            error_message: "Error finding " + model.name + " with id: " + id,
            error_data: {
                model_name: model.name,
                id: id,
                transaction: !!transaction,
                instance: instance
            }
        });
    }

    // Return the instance
    return instance;

}

async function __genericGetBy(model, data, transaction = null) {

    // Retrieve the instance of the model
    const instance = await model.findOne(data, { transaction: transaction })
    if (!instance) {
        throw new GenericKaindaExceptions.Kainda404Exception({
            error_type: "NOT_FOUND",
            error_message: "Error finding " + model.name + " with data: " + JSON.stringify(data),
            error_data: {
                model_name: model.name,
                data: data,
                transaction: !!transaction,
                instance: instance
            }
        });
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

    // Extract the updatable keys from the model or update the keys from the options
    let updateable_keys = options.updateable_keys ?? model.updateable_keys;

    // Check if the updateable keys array is present in the model
    if (!updateable_keys || updateable_keys.length === 0) {
        throw new GenericKaindaExceptions.Kainda500Exception({
            error_type: "BACKEND_ERROR",
            error_message: "No updateable keys found for " + model.name + ", change the model definition or provide the updateable keys in the options.",
            error_data: {
                model_name: model.name,
                data: data,
                transaction: !!transaction,
            }
        });
    }

    // Get the instance of the model
    const id = data[model.modelId];
    const instance = await __genericGet(model, id, transaction);

    // Iterate over the data and update the instance if the key is updateable
    for (let key in data) {
        let subKeys = key.split(".");
        if (subKeys.length === 1) {
            if (updateable_keys.includes(key)) {
                instance[key] = data[key];
            }
        } else {
            let updatable = false;
            for (let i = 0; i < subKeys.length - 1; i++) {
                if (updateable_keys.includes(subKeys[i])) {
                    updatable = true;
                    break;
                }
            }
            if (updatable) {
                let orginalData = instance[subKeys[0]];
                let newData = orginalData;
                for (let i = 0; i < subKeys.length - 1; i++) {
                    newData = {
                        ...newData,
                        [subKeys[i]]: orginalData[subKeys[i]]
                    }
                    if (subKeys.length - 2 === i) {
                        newData[subKeys[i + 1]] = data[key];
                    }
                }
                instance[subKeys[0]] = newData;
            }
        }
    }

    // Save the instance
    const nativeTransaction = (transaction?.isKaindaTransaction ? transaction.transaction : transaction);
    model.isSequelize ? await instance.save({ transaction: nativeTransaction }) : await instance.save({ session: nativeTransaction });

    // Return the instance
    return instance;
}

/**
 * The generic function that handles the deletion of a single instance of a model by its identifier.
 * @param {*} model The model class to delete the instance of.
 * @param {*} id The primary key of the instance to delete.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The deleted instance of the model.
 */
async function __genericDelete(model, id, transaction = null) {

    // Get the instance of the model
    const instance = await __genericGet(model, id, transaction);

    // Delete the instance
    const nativeTransaction = (transaction?.isKaindaTransaction ? transaction.transaction : transaction);
    model.isSequelize ? await instance.destroy({ transaction: nativeTransaction }) : await instance.deleteOne({ session: nativeTransaction });

    // Return the deleted instance
    return instance;

}

module.exports = {
    __genericCreate,
    __genericGet,
    __genericGetAll,
    __genericGetBy,
    __genericUpdate,
    __genericDelete,
}