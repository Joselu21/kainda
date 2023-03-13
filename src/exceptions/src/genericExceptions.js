const KaindaException = require('./KaindaException');
const GenericKaindaExceptionTemplates = require('./genericTemplates');

class Kainda400Exception extends KaindaException {
    name = "KaindaBadRequestException";
    response_code = 400;
    template = GenericKaindaExceptionTemplates.Kainda400Template
}

class Kainda401Exception extends KaindaException {
    name = "KaindaUnauthorizedException";
    response_code = 401;
    template = GenericKaindaExceptionTemplates.Kainda401Template;
}
class Kainda403Exception extends KaindaException {
    name = "KaindaForbiddenException";
    response_code = 403;
    template = GenericKaindaExceptionTemplates.Kainda403Template;
}
class Kainda404Exception extends KaindaException {
    name = "KaindaNotFoundException";
    response_code = 404;
    template = GenericKaindaExceptionTemplates.Kainda404Template;
}
class Kainda409Exception extends KaindaException {
    name = "KaindaConflictException";
    response_code = 409;
    template = GenericKaindaExceptionTemplates.Kainda409Template;
}
class Kainda418Exception extends KaindaException {
    name = "KaindaImATeapotException";
    response_code = 418;
    template = GenericKaindaExceptionTemplates.Kainda418Template;
}
class Kainda429Exception extends KaindaException {
    name = "KaindaTooManyRequestsException";
    response_code = 429;
    template = GenericKaindaExceptionTemplates.Kainda429Template;
}
class Kainda500Exception extends KaindaException {
    name = "KaindaInternalServerErrorException";
    response_code = 500;
    template = GenericKaindaExceptionTemplates.Kainda500Template;
}
class Kainda501Exception extends KaindaException {
    name = "KaindaNotImplementedException";
    response_code = 501;
    template = GenericKaindaExceptionTemplates.Kainda501Template;
}
class Kainda502Exception extends KaindaException {
    name = "KaindaBadGatewayException";
    response_code = 502;
    template = GenericKaindaExceptionTemplates.Kainda502Template;
}
class Kainda503Exception extends KaindaException {
    name = "KaindaServiceUnavailableException";
    response_code = 503;
    template = GenericKaindaExceptionTemplates.Kainda503Template;
}

const GenericKaindaExceptions = {
    Kainda400Exception,
    Kainda401Exception,
    Kainda403Exception,
    Kainda404Exception,
    Kainda409Exception,
    Kainda418Exception,
    Kainda429Exception,
    Kainda500Exception,
    Kainda501Exception,
    Kainda502Exception,
    Kainda503Exception,
};

module.exports = GenericKaindaExceptions;