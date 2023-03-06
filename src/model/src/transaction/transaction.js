class KaindaTransaction {

    static async #MongooseTransaction() {
        let transaction = await mongoose.startSession();
        transaction.startTransaction();
        return new KaindaTransaction(transaction, "mongoose");
    }

    static async #SequelizeTransaction() {
        let transaction = await sequelize.transaction();
        return new KaindaTransaction(transaction, "sequelize");
    }

    static async newTransaction(modelType) {
        if (modelType === "mongoose") {
            return await this.#MongooseTransaction();
        } else if (modelType === "sequelize") {
            return await this.#SequelizeTransaction();
        } else {
            throw new Error("Invalid Model Type");
        }
    }

    constructor (transaction, modelType) {
        this.isKaindaTransaction = true;
        this.transaction = transaction;
        this.modelType = modelType;
        this.state = "active";
        if (this.modelType === "mongoose") {
            this.commit = this.#commitMongoose;
            this.rollback = this.#rollbackMongoose;
        } else if (this.modelType === "sequelize") {
            this.commit = this.#commitSequelize;
            this.rollback = this.#rollbackSequelize;
        }
    }

    async #commitSequelize() {
        this.state = "commited";
        await this.transaction.commit();
    }

    async #commitMongoose() {
        this.state = "commited";
        await this.transaction.commitTransaction();
        this.transaction.endSession();
    }

    async #rollbackMongoose() {
        this.state = "rolledBack";
        await this.transaction.abortTransaction();
        this.transaction.endSession();
    }

    async #rollbackSequelize() {
        this.state = "rolledBack";
        await this.transaction.rollback();
    }

    get isActive () {
        return this.state === "active";
    }

    get isCommited () {
        return this.state === "commited";
    }

    get isRolledBack () {
        return this.state === "rolledBack";
    }

}

module.exports = KaindaTransaction;