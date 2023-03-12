const { exportFiles } = require('kainda');

const Middlewares = exportFiles(__dirname, 'exceptions.js');
module.exports = Middlewares;