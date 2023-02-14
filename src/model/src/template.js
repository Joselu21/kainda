const ModelType = require("./modelType");
const generatePassthrough = require("./passthrough");

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
        this.modelType = ModelType.getType(model);

        /**
         * The passthrough methods for the submodel
         * These methods are used to access the submodel's methods
         * @type {Object}
         */
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

    }

}

module.exports = KaindaModel;