class KaindaTransaction 
{

    static async #MongooseTransaction(mongoose, options) 
    {
        let transaction = await mongoose.startSession();
        transaction.startTransaction();
        return new KaindaTransaction(transaction, "mongoose", options);
    }

    static async #SequelizeTransaction(sequelize, options) 
    {
        let transaction = await sequelize.transaction();
        return new KaindaTransaction(transaction, "sequelize", options);
    }

    static async newTransaction(modelType, instance, options) 
    {
        if (modelType === "mongoose") 
        {
            return await this.#MongooseTransaction(instance, options);
        }
        else if (modelType === "sequelize") 
        {
            return await this.#SequelizeTransaction(instance, options);
        }
        else 
        {
            throw new Error("Invalid Model Type");
        }
    }

    constructor(transaction, modelType, options = {}) 
    {
        this.isKaindaTransaction = true;
        this.transaction = transaction;
        this.modelType = modelType;
        this.state = "active";
        this.options = options;
        if (this.modelType === "mongoose") 
        {
            this.commit = this.#commitMongoose;
            this.rollback = this.#rollbackMongoose;
        }
        else if (this.modelType === "sequelize") 
        {
            this.commit = this.#commitSequelize;
            this.rollback = this.#rollbackSequelize;
        }
    }

    async #commitSequelize() 
    {
        if (this.options.throwOnBadState && !this.isActive()) 
        {
            throw new Error("Transaction is not active");
        }
        if (!this.options.throwOnBadState && this.isActive()) 
        {
            this.state = "commited";
            await this.transaction.commit();
            return true;
        }
        return false;
    }

    async #commitMongoose() 
    {
        if (this.options.throwOnBadState && !this.isActive()) 
        {
            throw new Error("Transaction is not active");
        }
        if (!this.options.throwOnBadState && this.isActive()) 
        {
            this.state = "commited";
            await this.transaction.commitTransaction();
            this.transaction.endSession();
            return true;
        }
        return false;
    }

    async #rollbackMongoose() 
    {
        if (this.options.throwOnBadState && !this.isActive()) 
        {
            throw new Error("Transaction is not active");
        }
        if (!this.options.throwOnBadState && this.isActive()) 
        {
            this.state = "rolledBack";
            await this.transaction.abortTransaction();
            this.transaction.endSession();
            return true;
        }
        return false;
    }

    async #rollbackSequelize() 
    {
        if (this.options.throwOnBadState && !this.isActive()) 
        {
            throw new Error("Transaction is not active");
        }
        if (!this.options.throwOnBadState && this.isActive()) 
        {
            this.state = "rolledBack";
            await this.transaction.rollback();
            return true;
        }
        return false;
    }

    get isActive() 
    {
        return this.state === "active";
    }

    get isCommited() 
    {
        return this.state === "commited";
    }

    get isRolledBack() 
    {
        return this.state === "rolledBack";
    }

}

module.exports = KaindaTransaction;