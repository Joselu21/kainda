const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    delete : function (app) {

        const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;

        // Delete __KAINDA__MODEL__LOWERCASE__ by id
        app.delete(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id/", 
            [
                deactivateRoute,
                tokenValid,
                __KAINDA__MODEL__UPPERCASE__.Middlewares.canDeleteResource,
            ], 
            __KAINDA__MODEL__UPPERCASE__.Controller.delete__KAINDA__MODEL__UPPERCASE__
        );
    }

};