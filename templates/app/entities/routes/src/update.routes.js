const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) {

        const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;

        // Update __KAINDA__MODEL__LOWERCASE__
        app.put(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id/", 
            [
                deactivateRoute,
                tokenValid,
                __KAINDA__MODEL__UPPERCASE__.Middlewares.canUpdateResource,
            ], 
            __KAINDA__MODEL__UPPERCASE__.Controller.update__KAINDA__MODEL__UPPERCASE__
        );
    }

};