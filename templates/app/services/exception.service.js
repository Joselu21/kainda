const { KaindaException, GenericKaindaExceptionHandler } = require("kainda");
const ModelsService = require("@services/models.service");
const DbService = require("@services/db.service");

class ExceptionService 
{
    /**
     * Function that handles all exception types that are thrown by the application.
     * The exception must have a code and a message property. It is recommended to use the kainda standard.
     * @param {Error|KaindaException} error The error object that is thrown by the application, it can be thrown by the application or by Sequelize/Mongoose.
     * @param {object} res The response object. Used to send the response to the client based on the error.
     * @returns {void} Returns nothing.
     * @example
     * const { GenericKaindaExceptions } = require("kainda");
     * try {
     *  throw new GenericKaindaExceptions.Kainda400Exception();
     * } catch (error) {
     *  ExceptionService.handle(error, res);
     * }
     */
    static handle(error, res) 
    {
        // If error is an array, extract the first element, it can happen on validation errors from Sequelize
        if (Array.isArray(error)) 
        {
            error = error[0];
        }

        // If the error is a user-defined exception or a kainda generated exception
        const { Models } = ModelsService;
        if (error instanceof KaindaException) 
        {
            if (Models) 
            {
                const keys = Object.keys(Models);
                for (const key in keys) 
                {
                    if (Models[keys[key]] && Models[keys[key]].Exceptions[error.name] && error instanceof Models[keys[key]].Exceptions[error.name]) 
                    {
                        return Models[keys[key]].Exceptions[`${keys[key]}ExceptionHandler`](error, res);
                    }
                }
            }
            return GenericKaindaExceptionHandler(error, res);
        }

        if (DbService.mongoose && error instanceof DbService.mongoose.Error) 
        {
            return ExceptionService.mongooseHandler(error, res);
        }

        if (DbService.sequelize && error instanceof DbService.sequelize.BaseError) 
        {
            return ExceptionService.sequelizeHandler(error, res);
        }

        return ExceptionService.returnGenericException(error, res);

    }

    static returnGenericException(error, res) 
    {
        return ExceptionService.response({
            error_type: "GENERIC_ERROR",
            error_message: "An unknown error has occurred",
            error_code: 500,
            error_data: error
        }, res);
    }

    static response(json, res) 
    {
        return res.status(json.error_code).json(json);
    }

    static mongooseHandler(error, res) 
    {
        const data = {
            error_type: error.name ?? "MONGOOSE_ERROR",
            error_message: error.message ?? error.msg ?? "Mongoose error",
            error_code: 500,
            error_data: error
        };

        return ExceptionService.response(data, res);

    }

    static sequelizeHandler(error, res) 
    {
        const data = {
            error_type: error.name ?? error.type ?? error.message ?? "SEQUELIZE_ERROR",
            error_message: error.message ?? error.msg ?? "Sequelize error",
            error_code: 500,
            error_data: error
        };

        return ExceptionService.response(data, res);

    }

}

module.exports = ExceptionService;
