/**
 * The generic function that handles the creation of a new instance of a Sequelize model.
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
    if (options.required_keys)
        required_keys = options.required_keys;

    // Check if the required keys array is present in the model
    if (!required_keys || required_keys.length === 0) {
        throw new model.Exceptions[model.name + "NotCreatedException"]("No create_required_keys array was found in the model", 500);
    }

    // Check if the required keys are present in the data
    const missingFields = required_keys.filter(key => data[key] === undefined);

    // If there are missing fields, throw an exception
    if (missingFields.length > 0) {
        throw new model.Exceptions[model.name + "NotCreatedException"]("Missing fields: " + missingFields.join(", "), 400);
    }

    // Create the instance
    const instance = await model.create(data, { transaction: transaction });
    if (!instance || !(instance instanceof model))
        throw new model.Exceptions[model.name + "NotCreatedException"]("Error creating " + model.name, 500);

    // Return the instance
    return instance;
}

/**
 * The generic function that handles the retrieval of a list of all instances of a Sequelize model.
 * @param {*} model The model class to retrieve the instances of.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns An array of retrieved instances of the model.
 */
async function __genericGetAll(model, transaction = null) {

    // Retrieve all instances of the Sequelize model using sequelize's findAll function
    const instances = await model.findAll({ transaction: transaction });
    if (!instances)
        throw new model.Exceptions[model.name + "NotFoundException"]("There are no instances of " + model.name);

    // Return the instances
    return instances;

}

/**
 * The generic function that handles the retrieval of a single instance of a Sequelize model by primary key.
 * @param {*} model The model class to retrieve the instance of.
 * @param {*} id The primary key of the instance to retrieve.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The retrieved instance of the model.
 */
async function __genericGet(model, id, transaction = null) {

    // Retrieve the instance of the Sequelize model using sequelize's findByPk function
    const instance = await model.findByPk(id, { transaction: transaction });
    if (!instance)
        throw new model.Exceptions[model.name + "NotFoundException"]("Error finding " + model.name + " with id: " + id);

    // Return the instance
    return instance;

}

/**
 * The generic function that handles the update of a single instance of a Sequelize model by primary key.
 * @param {*} model The model class to update the instance of.
 * @param {*} data An object containing at least the required fields of the model.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The updated instance of the model.
 */
async function __genericUpdate(model, data, transaction = null) {

    // Extract the required keys from the model or update the required keys from the options
    const instance = await model.findByPk(data[model.name.toLowerCase() + "_id"], { transaction: transaction });
    if (!instance)
        throw new model.Exceptions[model.name + "NotFoundException"]("Error finding " + model.name + " with id: " + id);

    // Check if the updateable keys array is present in the model
    if (!model.updateable_keys || model.updateable_keys.length === 0) {
        throw new model.Exceptions[model.name + "NotUpdatedException"]("No updateable keys for " + model.name, 500);
    }

    // Iterate over the data and update the instance if the key is updateable
    for (let key in data) {
        if (model.updateable_keys.includes(key)) {
            instance[key] = data[key];
        }
    }

    // Save the instance
    await instance.save({ transaction: transaction });

    // Return the instance
    return instance;
}

/**
 * The generic function that handles the deletion of a single instance of a Sequelize model by primary key.
 * @param {*} model The model class to delete the instance of.
 * @param {*} id The primary key of the instance to delete.
 * @param {*} transaction The transaction to use for the operation. It can be null.
 * @returns The deleted instance of the model.
 */
async function __genericDelete(model, id, transaction = null) {

    // Retrieve the instance of the Sequelize model using sequelize's findByPk function
    const instance = await model.findByPk(id, { transaction: transaction });
    if (!instance)
        throw new model.Exceptions[model.name + "NotFoundException"]("Error finding " + model.name + " with id: " + id);

    // Delete the instance
    await instance.destroy({ transaction: transaction });

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