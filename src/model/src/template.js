const ModelType = require("./modelType");
const generatePassthrough = require("./passthrough");
const generateControllers = require("./controllers");
const { SeedFunctions, SeedOptions } = require("./seeders");
const { KaindaException, GenericKaindaExceptions } = require("./../../exceptions");

/**
 * @typedef import("./seeders/seedOptions")} SeedOptions;
 */

/**
 * KaindaModel is a wrapper for Sequelize and Mongoose models.
 * @class KaindaModel
 * @constructor
 * @public
 */
class KaindaModel {

    static isSequelizeModel = ModelType.isSequelizeModel;
    static isMongooseModel = ModelType.isMongooseModel;

    constructor(model) {

        if (!model) {
            throw new Error("The model is not defined.");
        }

        /**
         * The submodel and methods to access and control it
         * Submodel is the model that is being used by the KaindaModel (Sequelize or Mongoose)
         */
        this.subModel = model;
        this.modelType = ModelType.getTypeExternal(model);
        this.isMongoose = this.modelType === "mongoose";
        this.isSequelize = this.modelType === "sequelize";

        /**
         * The passthrough methods for the submodel
         * These methods are used to access the submodel's methods
         */
        this.#__initPassthrough(model);

        /**
         * The controller methods for the submodel
         * These methods are the functions called by the routes
         */
        this.#_Controller = generateControllers(this.subModel);

        /**
         * Seeder Options
         */
        this.#_seed_options = {
            seed: false,
            dependencies: [
            ],
            is_seeded: false,
            oldRecords: "deleteAll",
            data: []
        };

        /**
         * Seeder Function
         */
        this.#_seed = SeedFunctions.seed;

    }

    #__initPassthrough(model) {
        const passthrough = generatePassthrough(model);
        this.createOne = passthrough.create.createOne;
        this.insertOne = passthrough.create.createOne;
        this.createMany = passthrough.create.createMany;
        this.insertMany = passthrough.create.createMany;

        this.findOne = passthrough.get.findOne;
        this.getOne = passthrough.get.findOne;
        this.findAll = passthrough.get.findMany;
        this.findMany = passthrough.get.findMany;
        this.getAll = passthrough.get.findMany;
        this.getMany = passthrough.get.findMany;
        this.findById = passthrough.get.findById;
        this.findByPk = passthrough.get.findById;
        this.getById = passthrough.get.findById;
        this.getByPk = passthrough.get.findById;
        this.findAndCountAll = passthrough.get.findAndCountAll;
        this.getAndCountAll = passthrough.get.findAndCountAll;

        this.updateOne = passthrough.update.updateOne;
        this.updateMany = passthrough.update.updateMany;

        this.deleteOne = passthrough.delete.deleteOne;
        this.deleteMany = passthrough.delete.deleteMany;

    };
    
    // -------------------- //
    // ---- CONTROLLER ---- //
    //  #region CONTROLLER  //
    // -------------------- //
    #_Controller = {};

    /**
     * The controller methods for the submodel
     * @param {Object} Controller
     */
    set Controller(newController) {
        this.#_Controller = {
            ...generateControllers(this.subModel),
            ...newController,
        };
    }

    /**
     * Controller getter
     * @returns {Object}
     */
    get Controller() {
        return this.#_Controller;
    }

    // #endregion //

    // ------------------- //
    // --- EXCEPTIONS ---  //
    // #region EXCEPTIONS  //
    // ------------------- //
    #_exceptions = {};

    /**
     * The exceptions for the model
     * @param {Object} newExceptions
     */
    set Exceptions(newExceptions) {
        this.#_exceptions = {
            ...GenericKaindaExceptions,
            ...newExceptions,
        };
    }

    /**
     * Exceptions getter
     * @returns {Object}
     */
    get Exceptions() {
        return this.#_exceptions;
    }

    // #endregion //

    // ------------------- //
    // ----- SEEDERS ----- //
    //   #region SEEDERS   //
    // ------------------- //

    /**
     * Seed Options
     * @type {SeedOptions}
     * @property {Boolean} seed - Whether or not to seed the model on startup
     * @property {Array} dependencies - The dependencies of the model that they must be seeded before this model
     * @property {Boolean} is_seeded - Whether or not the model has been seeded already
     * @property {String} oldRecords - The options for what to do with old records.
     */
    #_seed_options = {};
    #_seed = () => {};

    /**
     * Seed Options setter
     * @param {SeedOptions} newSeedOptions
     */
    set seed_options(newSeedOptions) {
        SeedOptions.validate(newSeedOptions);
        this.#_seed_options = {
            ...this.#_seed_options,
            ...newSeedOptions,
        };
    }

    /**
     * Seed Options getter
     * @returns {SeedOptions}
     */
    get seed_options() {
        return this.#_seed_options;
    }

    /**
     * Seed function setter
     * @param {Function} newSeedFunction
     */
    set seed(newSeedFunction) {
        throw new KaindaException("Seed function cannot be set directly because it can break other seeders functionality when there are dependencies. You can override the seed function by setting the Seeders.seed function in the model.");
    }

    /**
     * Seed function getter
     * @returns {Function}
     * @see Seeders.seed
     */
    get seed() {
        return this.#_seed;
    }

    // #endregion //

}

module.exports = KaindaModel;