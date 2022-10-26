before(async () => {
    
    const app = await require("./../../setup")();
    const utils = require('./utils.test');

    // Make all utils globally available
    for (let util of Object.keys(utils)) {
        global[util] = utils[util];
    }

    global.app = app;

});