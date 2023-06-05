const HTTP300Templates = require("./src/http3xxTemplates");
const HTTP400Templates = require("./src/http4xxTemplates");
const HTTP500Templates = require("./src/http5xxTemplates");

const GenericKaindaExceptionTemplates = {
    ...HTTP300Templates,
    ...HTTP400Templates,
    ...HTTP500Templates,
};

module.exports = GenericKaindaExceptionTemplates;