const { exportFiles } = require("kainda");

const Validators = exportFiles(__dirname, "validators.js");
module.exports = Validators;