const { tokenValid } = require("kainda");

module.exports = {
    
    delete : function (app) {
        // Delete __KAINDA__MODEL__LOWERCASE__ by id
        app.delete(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id", 
            [
                tokenValid,
                Models.__KAINDA__MODEL__UPPERCASE__.Middlewares.canDeleteResource,
            ], 
            Models.__KAINDA__MODEL__UPPERCASE__.Controller.delete__KAINDA__MODEL__UPPERCASE__
        );
    }

};