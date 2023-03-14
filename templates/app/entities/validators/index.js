const { exportFiles } = require('kainda');

const Middlewares = exportFiles(__dirname, 'validators.js');
module.exports = Middlewares;