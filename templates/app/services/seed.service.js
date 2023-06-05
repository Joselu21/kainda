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

module.exports = SeedService;