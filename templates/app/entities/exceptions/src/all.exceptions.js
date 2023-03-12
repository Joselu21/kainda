const { 
    KaindaException, 
    GenericKaindaExceptionHandler, 
    GenericKaindaExceptions 
} = require("kainda");

module.exports = {
    __KAINDA__MODEL__UPPERCASE__Exception : KaindaException,
    __KAINDA__MODEL__UPPERCASE__BadRequestException : GenericKaindaExceptions.Kainda400Exception,
    __KAINDA__MODEL__UPPERCASE__NotFoundException : GenericKaindaExceptions.Kainda404Exception,
    __KAINDA__MODEL__UPPERCASE__AlreadyExistsException : GenericKaindaExceptions.Kainda409Exception,
    __KAINDA__MODEL__UPPERCASE__NotCreatedException : GenericKaindaExceptions.Kainda500Exception,
    __KAINDA__MODEL__UPPERCASE__NotUpdatedException : GenericKaindaExceptions.Kainda500Exception,
    __KAINDA__MODEL__UPPERCASE__NotDeletedException : GenericKaindaExceptions.Kainda500Exception,
    __KAINDA__MODEL__UPPERCASE__ExceptionHandler: GenericKaindaExceptionHandler
}