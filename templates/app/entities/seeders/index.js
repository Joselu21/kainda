const { exportFiles } = require("kainda");

const Seeders = exportFiles(__dirname, "seeders.js");
module.exports = Seeders;