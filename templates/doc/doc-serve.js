const swaggerUi = require('swagger-ui-express');

/**
 * Serve the documentation
 * @param {Object} app 
 * @param {String} path 
 * @param {String} filePath 
 * @returns {void}
 */
function serveDocumentation(app, path = '/doc', filePath = './openapi.json') {
    // Serve the swagger UI
    const swaggerFile = require(filePath);
    app.use(path, swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

module.exports = serveDocumentation;