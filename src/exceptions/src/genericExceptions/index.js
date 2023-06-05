const HTTP300Exceptions = require("./src/http3xxExceptions");
const HTTP400Exceptions = require("./src/http4xxExceptions");
const HTTP500Exceptions = require("./src/http5xxExceptions");

const GenericKaindaExceptions = {
    ...HTTP300Exceptions,
    ...HTTP400Exceptions,
    ...HTTP500Exceptions,
};

module.exports = GenericKaindaExceptions;