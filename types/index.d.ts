import { KaindaModel } from "..";
import { KaindaTransaction } from "..";

export = KaindaModel;
declare class KaindaModel {
    static isSequelizeModel: any;
    static isMongooseModel: any;
    constructor(model: any);
    /**
     * The submodel and methods to access and control it
     * Submodel is the model that is being used by the KaindaModel (Sequelize or Mongoose)
     */
    subModel: any;
    modelType: string;
    isMongoose: boolean;
    isSequelize: boolean;
    transaction: () => Promise<any>;
    name: string;
    modelName: string;
    modelId: string;
    createOne: Promise<any>;
    insertOne: Promise<any>;
    createMany: Promise<any>;
    insertMany: Promise<any>;
    findOne: Promise<any>;
    getOne: Promise<any>;
    findAll: Promise<any>;
    findMany: Promise<any>;
    getAll: Promise<any>;
    getMany: Promise<any>;
    findById: Promise<any>;
    findByPk: Promise<any>;
    getById: Promise<any>;
    getByPk: Promise<any>;
    findAndCountAll: Promise<any>;
    getAndCountAll: Promise<any>;
    updateOne: Promise<any>;
    updateMany: Promise<any>;
    deleteOne: Promise<any>;
    deleteMany: Promise<any>;
    
    /**
     * The controller methods for the submodel
     * @param {Object} Controller
     */
    set Controller(arg: Object);
    
    /**
     * Controller getter
     * @returns {Object}
     */
    get Controller(): Object;
    
    /**
     * The exceptions for the model
     * @param {Object} newExceptions
     */
    set Exceptions(arg: Object);
    
    /**
     * Exceptions getter
     * @returns {Object}
     */
    get Exceptions(): Object;
    
    /**
     * Seed Options setter
     * @param {SeedOptions} newSeedOptions
     */
    set seed_options(arg: SeedOptions);
    
    /**
     * Seed Options getter
     * @returns {SeedOptions}
     */
    get seed_options(): SeedOptions;
    
    /**
     * Seed function setter
     * @param {Function} newSeedFunction
     */
    set seed(arg: Function);
    
    /**
     * Seed function getter
     * @returns {Function}
     * @see Seeders.seed
     */
    get seed(): Function;
    #private;
}

export = KaindaTransaction;
declare class KaindaTransaction {
    static "__#190@#MongooseTransaction"(): Promise<KaindaTransaction>;
    static "__#190@#SequelizeTransaction"(): Promise<KaindaTransaction>;
    static newTransaction(modelType: any): Promise<KaindaTransaction>;
    constructor(transaction: any, modelType: any);
    isKaindaTransaction: boolean;
    transaction: any;
    modelType: any;
    state: string;
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    get isActive(): boolean;
    get isCommited(): boolean;
    get isRolledBack(): boolean;
    #private;
}
