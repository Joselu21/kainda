const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = { 
    
    create : function (app) {

        const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;

        // Create new __KAINDA__MODEL__LOWERCASE__
        app.post(
            "/__KAINDA__MODEL__LOWERCASE__/",
            [
                deactivateRoute,
                tokenValid,
                __KAINDA__MODEL__UPPERCASE__.Middlewares.canCreateResource,
                __KAINDA__MODEL__UPPERCASE__.Middlewares.checkRequiredKeys
            ],
            __KAINDA__MODEL__UPPERCASE__.Controller.create__KAINDA__MODEL__UPPERCASE__
        );
    }

};