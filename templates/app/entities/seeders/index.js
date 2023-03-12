const { exportFiles } = require('kainda');

const Middlewares = exportFiles(__dirname, 'seeders.js');
module.exports = Middlewares;