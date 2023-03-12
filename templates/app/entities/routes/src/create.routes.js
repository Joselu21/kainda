const { tokenValid } = require("kainda");

module.exports = { 
    
    create : function (app) {
        // Create new __KAINDA__MODEL__LOWERCASE__
        app.post(
            "/__KAINDA__MODEL__LOWERCASE__",
            [
                tokenValid,
                Models.__KAINDA__MODEL__UPPERCASE__.Middlewares.canCreateResource,
                Models.__KAINDA__MODEL__UPPERCASE__.Middlewares.checkRequiredKeys
            ],
            Models.__KAINDA__MODEL__UPPERCASE__.Controller.create__KAINDA__MODEL__UPPERCASE__
        );
    }

};