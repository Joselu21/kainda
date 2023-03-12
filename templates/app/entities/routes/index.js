const { exportFiles } = require('kainda');

const Middlewares = exportFiles(__dirname, 'routes.js');
module.exports = Middlewares;