const { exportFiles } = require("kainda");

const Controllers = exportFiles(__dirname, "controller.js");
module.exports = Controllers;