const { exportFiles } = require("kainda");

const Routes = exportFiles(__dirname, "routes.js");
module.exports = Routes;