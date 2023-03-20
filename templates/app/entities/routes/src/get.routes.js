const ModelsService = require("@services/models.service");
const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    getAll : function (app) {

        const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;

        // Get all __KAINDA__MODEL__LOWERCASE__s. // TODO: Secure this route, only admins should use it.
        app.get(
            "/__KAINDA__MODEL__LOWERCASE__/",
            [
                deactivateRoute,
                tokenValid,
            ],
            __KAINDA__MODEL__UPPERCASE__.Controller.getAll__KAINDA__MODEL__UPPERCASE__s
        );
    },

    get : function (app) {

        const __KAINDA__MODEL__UPPERCASE__ = ModelsService.Models.__KAINDA__MODEL__UPPERCASE__;

        // Get __KAINDA__MODEL__LOWERCASE__ by id
        app.get(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id/",
            [
                deactivateRoute,
                tokenValid,
                __KAINDA__MODEL__UPPERCASE__.Middlewares.canReadResource,
            ],
            __KAINDA__MODEL__UPPERCASE__.Controller.get__KAINDA__MODEL__UPPERCASE__ById
        );
    }

};