const { tokenValid } = require("@services/auth.service");
const { deactivateRoute } = require("kainda");

module.exports = {
    
    update : function (app) {
        // Update __KAINDA__MODEL__LOWERCASE__
        app.put(
            "/__KAINDA__MODEL__LOWERCASE__/:__KAINDA__MODEL__LOWERCASE___id/", 
            [
                deactivateRoute,
                tokenValid
            ], 
            Models.__KAINDA__MODEL__UPPERCASE__.Controller.update__KAINDA__MODEL__UPPERCASE__
        );
    }

};