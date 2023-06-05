const { exportFiles } = require("kainda");

const Exceptions = exportFiles(__dirname, "exceptions.js");
module.exports = Exceptions;