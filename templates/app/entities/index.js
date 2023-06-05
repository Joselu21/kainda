const __KAINDA__MODEL__UPPERCASE__ = require('@entities/__KAINDA__MODEL__URL__/model');

__KAINDA__MODEL__UPPERCASE__.Controller = require('@entities/__KAINDA__MODEL__URL__/controllers');
__KAINDA__MODEL__UPPERCASE__.Routes = require('@entities/__KAINDA__MODEL__URL__/routes');
__KAINDA__MODEL__UPPERCASE__.Exceptions = require('@entities/__KAINDA__MODEL__URL__/exceptions');
__KAINDA__MODEL__UPPERCASE__.Seeders = require('@entities/__KAINDA__MODEL__URL__/seeders');
__KAINDA__MODEL__UPPERCASE__.Middlewares = require('@entities/__KAINDA__MODEL__URL__/middlewares');
__KAINDA__MODEL__UPPERCASE__.Validators = require('@entities/__KAINDA__MODEL__URL__/validators');

/**
 * VARIABLES
*/
// TODO: Fill this
__KAINDA__MODEL__UPPERCASE__.create_required_keys = [

];

// TODO: Fill this
__KAINDA__MODEL__UPPERCASE__.updateable_keys = [

];

// TODO: Change this when not needed
__KAINDA__MODEL__UPPERCASE__.seed_options = {
    seed : false,
    dependencies: [
    ],
    is_seeded: false,
    oldRecords: "ignore",
    data: __KAINDA__MODEL__UPPERCASE__.Seeders.data
};

module.exports = __KAINDA__MODEL__UPPERCASE__;