const ModelType = require("./modelType");
const generatePassthrough = require("./passthrough");
const generateControllers = require("./controllers");
const { SeedFunctions, SeedOptions } = require("./seeders");

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
        this.isMongoose = ModelType.isMongoose;
        this.isSequelize = ModelType.isSequelize;
        this.modelType = ModelType.getTypeExternal(model);

        /**
         * The passthrough methods for the submodel
         * These methods are used to access the submodel's methods
         */
        this.#__initPassthrough(model);

        /**
         * Seed Options
         * @type {Object}
         * @property {Boolean} seed - Whether or not to seed the model on startup
         * @property {Array} dependencies - The dependencies of the model that they must be seeded before this model
         * @property {Boolean} is_seeded - Whether or not the model has been seeded already
         * @property {String} oldRecords - The options for what to do with old records, valid options are:
         */
        this.seed_options = {
            seed : false,
            dependencies: [
            ],
            is_seeded: false,
            oldRecords: "deleteAll"
        };

    }

    async seed (...args) {
        if(Array.isArray(args[0])) {
            return await SeedFunctions.seed(this, args[0], args[1]);
        } else {
            return await SeedFunctions.seed(this, this.Seeders?.records ?? [], args[0]);
        }
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

    /**
     * The controller methods for the submodel
     * @param {Object} controller
     */
    set Controller (controller) {
        this.controller = {
            ...generateControllers(this.subModel),
            ...controller,
        };
    }

    /**
     * @param {Object} seed_options
     */
    set seed_options (seed_options) {
        SeedOptions.validate(seed_options);
        this._seed_options = seed_options;
    }


}

module.exports = KaindaModel;