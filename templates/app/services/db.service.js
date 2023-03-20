const LogService = require('@services/log.service');
const kainda = require('kainda');

/**
 * @class SeedService
 * @description This class is used to seed the database
 * @static
 * @memberof DbService
 */
class SeedService {

    /**
     * @method seed
     * @description This method is used to seed the database
     * @param {Object} Models The models to seed
     * @static
     * @async
     * @memberof DbService.SeedService
     * @returns {Promise<void>}
     */
    static async seed(Models) {
        if (DbService.mongoose) {
            await SeedService.seedMongoose(Models);
        } else if (DbService.sequelize) {
            await SeedService.seedSequelize(Models);
        }
    }

    /**
     * @method seedMongoose
     * @description This method is used to seed the database using mongoose
     * @param {Object} Models The models to seed
     * @param {Object} externalTransaction The transaction to use if provided
     * @static
     * @async
     * @memberof DbService.SeedService
     * @returns {Promise<void>}
     * @private
     */
    static async seedMongoose(Models, externalTransaction) {
        let transaction = externalTransaction ?? await DbService.mongoose.startSession();
        try {
            transaction.startTransaction();
            LogService.ServerLogger.info('[SEED] Seeding database...');
            for (let model of Object.keys(Models)) {
                if (Models[model].Seeders.seed && typeof Models[model].Seeders.seed === 'function') {
                    await Models[model].Seeders.seed(transaction);
                } else if (Models[model].seed && typeof Models[model].seed === 'function') {
                    await Models[model].seed(null, { transaction });
                }
            }
            await transaction.commitTransaction();
            LogService.ServerLogger.verbose('[SEED] Database seeded successfully');
        } catch (error) {
            await transaction.abortTransaction();
            LogService.ServerLogger.error('[SEED] Error seeding database. Rolled back');
        }
    }

    /**
     * @method seedSequelize
     * @description This method is used to seed the database using sequelize
     * @param {Object} Models The models to seed
     * @param {Object} externalTransaction The transaction to use if provided
     * @static
     * @async
     * @memberof DbService.SeedService
     * @returns {Promise<void>}
     * @private
     */
    static async seedSequelize(Models, externalTransaction) {
        let transaction = externalTransaction ?? await DbService.sequelize.transaction();
        try {
            LogService.ServerLogger.info('[SEED] Seeding database...');
            for (let model of Object.keys(Models)) {
                if (Models[model].Seeders.seed && typeof Models[model].Seeders.seed === 'function') {
                    await Models[model].Seeders.seed(transaction);
                } else if (Models[model].seed && typeof Models[model].seed === 'function') {
                    await Models[model].seed(null, { transaction });
                }
            }
            await transaction.commit();
            LogService.ServerLogger.verbose(kainda.chalk.green('[SEED] Database seeded successfully'));
        } catch (error) {
            await transaction.rollback();
            LogService.ServerLogger.error('[SEED] Error seeding database. Rolled back');
        }
    }

}

/**
 * @class DbService
 * @description This class is used to initialize the database
 * @static
 * @memberof Services
 * @property {Object} mongoose The mongoose instance
 * @property {Object} sequelize The sequelize instance
 * @property {Function} seed The seed method
 */
class DbService {

    static mongoose;
    static sequelize;
    static seed = SeedService.seed;

    static get() {
        if (DbService.mongoose && DbService.sequelize) return { 
            mongoose: DbService.mongoose, 
            sequelize: DbService.sequelize
        };
        if(DbService.mongoose) return DbService.mongoose;
        if(DbService.sequelize) return DbService.sequelize;
    }

    /**
     * @method init
     * @description This method is used to initialize the database
     * @param {Object} critical The critical database configuration
     * @static
     * @async
     * @memberof DbService
     * @returns {Promise<Object>}
     */
    static async init(critical) {
        // Init the database
        if (critical.dialect.includes('mongo')) {
            await DbService.initMongoose(critical);
            return DbService.mongoose;
        } else if (critical.dialect.includes('sql') || critical.dialect.includes('postgre')) {
            await DbService.initSequelize(critical);
            return DbService.sequelize;
        } else {
            LogService.ServerLogger.error("[CONFIG] Your configuration file is incorrect, you must specify a valid database configuration");
            throw new Error('Invalid dialect');
        }
    }

    /**
     * @method initMongoose
     * @description This method is used to initialize the database using mongoose
     * @param {Object} critical The critical database configuration
     * @static
     * @async
     * @memberof DbService
     * @returns {Promise<void>}
     * @private
     */
    static async initMongoose(critical) {

        const mongoose = require('mongoose');

        if (!critical || (!critical.uri && (!critical.host || !critical.port || !critical.database_name))) {
            LogService.ServerLogger.error("[CONFIG] Your configuration file is incorrect, you must specify a critical database");
            process.exit(1);
        }

        const uri = critical.uri ?? `mongodb://${critical.username}:${encodeURIComponent(critical.password)}@${critical.host}:${critical.port}/${critical.database_name}`;
        const options = critical.options ?? {
            useNewUrlParser: true,
            compressors: ['zstd'],
            maxPoolSize: critical.pool?.max ?? 100,
            minPoolSize: critical.pool?.min ?? 10,
            serverSelectionTimeoutMS: critical.pool?.acquire ?? 5000,
            socketTimeoutMS: critical.pool?.idle ?? 30000,
        };

        await mongoose.connect(uri, options);
        DbService.mongoose = mongoose;
    }

    /**
     * @method initSequelize
     * @description This method is used to initialize the database using sequelize
     * @param {Object} critical The critical database configuration
     * @static
     * @async
     * @memberof DbService
     * @returns {Promise<void>}
     * @private
     * @todo Add support for sqlite3
     */
    static async initSequelize(critical) {

        const Sequelize = require('sequelize');

        // TODO: Add support for sqlite3
        if (!critical || !critical.host || !critical.port || !critical.database_name) {
            LogService.ServerLogger.error("[CONFIG] Your configuration file is incorrect, you must specify a critical database");
            process.exit(1);
        }

        // Create a sequelize instance with our configs
        const sequelize = new Sequelize(critical.database_name, critical.username, critical.password, {
            host: critical.host,
            port: critical.port,
            dialect: critical.dialect,
            pool: critical.pool,
            logging: critical.logging ? Logger.log : false,
        });

        // if env is not production, we run the migrations
        if (process.env.NODE_ENV !== 'production' && !process.argv.includes('--force')) {
            LogService.ServerLogger.info('[SYNC] Syncing models with database...');
            await sequelize.sync({ match: /-pruebas$/ });
        }

        // If it is executed with param '--force', we force the migrations
        if ((process.env.NODE_ENV !== 'production' && process.argv.includes('--force')) || process.env.NODE_ENV === 'test') {
            LogService.ServerLogger.info('[SYNC] Forced syncing models with database...');
            await sequelize.sync({ force: true, match: /-pruebas$/ });
        }

        DbService.sequelize = sequelize;
        return DbService.sequelize;

    }

}

module.exports = DbService;