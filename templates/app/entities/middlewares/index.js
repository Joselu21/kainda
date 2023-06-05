const { exportFiles } = require("kainda");

const Middlewares = exportFiles(__dirname, "middleware.js");
module.exports = Middlewares;