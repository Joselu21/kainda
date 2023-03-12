const { tokenValid } = require("kainda");

module.exports = {
    
    getAll : function (app) {
        // Get all __KAINDA__MODEL__LOWERCASE__s. // TODO: Secure this route, only admins should use it.
        app.get(
            "/__KAINDA__MODEL__LOWERCASE__/",
            [
                tokenValid,
            ],
            Models.__KAINDA__MODEL__UPPERCASE__.Controller.getAll__KAINDA__MODEL__UPPERCASE__s
        );
    },

    get : function (app) {
        // Get __KAINDA__MODEL__LOWERCASE__ by id
        app.get(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id",
            [
                tokenValid,
                Models.__KAINDA__MODEL__UPPERCASE__.Middlewares.canGetResource,
            ],
            Models.__KAINDA__MODEL__UPPERCASE__.Controller.get__KAINDA__MODEL__UPPERCASE__ById
        );
    },

}