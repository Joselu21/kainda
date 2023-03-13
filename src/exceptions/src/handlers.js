const KaindaException = require("./KaindaException")

/**
 * Function that handles all exception types that are thrown by the application.
 * The exception must have a code and a message property. It is recommended to use the kainda standard.
 * @param {Error|KaindaException} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
 * @param {*} res The response object. Used to send the response to the client based on the error.
 * @returns {void} Returns nothing.
 */
function ExceptionHandler(error, res) {

    // If the logs are active, log the error to the console
    if (config.get("logging")) {
        if (Logger) {
            Logger.log("exceptions", error);
        } else {
            console.log(error);
        }
    }

    // If error is an array, extract the first element, it can happen on validation errors from Sequelize
    if (Array.isArray(error))
        error = error[0];

    // If the error is a user-defined exception or a kainda generated exception
    if (error instanceof KaindaException) {
        if (Models) {
            let keys = Object.keys(Models);
            for (let key in keys) {
                if (Models[keys[key]] && Models[keys[key]].Exceptions[error.name] && error instanceof Models[keys[key]].Exceptions[error.name]) {
                    return Models[keys[key]].Exceptions[keys[key] + "ExceptionHandler"](error, res);
                }
            }
        }
        return res.status(error.response_code).json(error.body);
    }

    let error_type = "GENERIC_ERROR";
    let error_message = "An unknown error has occurred";
    let error_code = 418;
    let error_data = error;

    try {

        const SequelizeClass = Object.getPrototypeOf(global.sequelize)?.Sequelize;

        // If the error is a Sequelize error
        if ((SequelizeClass && SequelizeClass.Error && error instanceof SequelizeClass.Error) || (error?.name && error.name.startsWith("Sequelize"))) {

            error_type = "SEQUELIZE_ERROR";
            error_message = error.errors[0]?.message ?? "Sequelize error";
            error_code = 500;
            error_data = error.errors[0];

            if (error instanceof SequelizeClass.ValidationError) {

                error_type = "SEQUELIZE_VALIDATION_ERROR";
                error_message = "Validation error";
                error_code = 400;

                if (error.errors[0]?.validatorKey === "not_unique") {

                    error_type = "SEQUELIZE_DUPLICATE_KEY_ERROR";
                    error_message = "Duplicate key error";
                    error_code = 409;

                }

            } else if (error instanceof SequelizeClass.UniqueConstraintError) {

                error_type = "SEQUELIZE_UNIQUE_CONSTRAINT_ERROR";
                error_message = "Unique constraint error";
                error_code = 409;

            } else if (error instanceof SequelizeClass.ForeignKeyConstraintError) {

                error_type = "SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR";
                error_message = "Foreign key constraint error";
                error_code = 409;

            } else if (error instanceof SequelizeClass.ExclusionConstraintError) {

                error_type = "SEQUELIZE_EXCLUSION_CONSTRAINT_ERROR";
                error_message = "Exclusion constraint error";
                error_code = 409;

            } else if (error instanceof SequelizeClass.EmptyResultError) {

                error_type = "SEQUELIZE_EMPTY_RESULT_ERROR";
                error_message = "Empty result error";
                error_code = 404;

            }

            // Mongoose error
        } else if ((global.mongoose && global.mongoose.Error && error instanceof global.mongoose.Error) || (error?.name && error.name.startsWith("Mongoose"))) {

            error_type = "MONGOOSE_ERROR";
            error_message = error.message ?? "Mongoose error";
            error_code = 500;

            // MongoDB native driver error
        } else if (error?.name && error.name.startsWith("Mongo")) {

            error_type = "MONGOOSE_ERROR";
            error_message = error.message ?? "Mongoose error";
            error_code = 500;

            if (error.code === 11000) {

                error_type = "MONGOOSE_DUPLICATE_KEY_ERROR";
                error_message = "Duplicate key error";
                error_code = 409;

            } else if (error.code === 121) {

                error_type = "MONGOOSE_TRANSACTION_ERROR";
                error_message = "Transaction error";
                error_code = 500;

            }
        }

    } catch (error) {

        console.log(error);

    }

    return res.status(error_code).json({
        error_type,
        error_message,
        error_data
    });

}

/**
 * Handles KaindaException objects by returning a JSON error response with the exception details.
 * @param {object} error - The KaindaException object to handle.
 * @param {object} res - The Express response object to send the error response to.
 */
function GenericKaindaExceptionHandler(error, res) {

    if (error instanceof KaindaException) {
        res.status(error?.response_code ?? error?.code ?? 500).json(error?.body ?? {
            error_type: error?.name,
            error_message: error?.message,
        });
    }

}

module.exports = {
    ExceptionHandler,
    GenericKaindaExceptionHandler
};