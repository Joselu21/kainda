const path = require('path');
const winston = require('winston');

class LogService {

    static #requestLogger;
    static #errorLogger;
    static #startLogger;

    static init(options) {
        LogService.#requestLogger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'REQUEST' },
            transports: [
                options.console ? new winston.transports.Console() : null,
                options.file ? new winston.transports.File({ filename: 'logs/combined.log' }) : null
            ]
        });
        LogService.#errorLogger = winston.createLogger({
            level: 'error',
            format: winston.format.json(),
            defaultMeta: { service: 'ERROR' },
            transports: [
                options.console ? new winston.transports.Console() : null,
                options.file ? new winston.transports.File({ filename: 'logs/error.log' }) : null
            ]
        });
        LogService.#startLogger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'START' },
            transports: [
                options.console ? new winston.transports.Console() : null,
                options.file ? new winston.transports.File({ filename: 'logs/starts.log' }) : null
            ]
        });
    }

    static get ErrorLogger () {
        return LogService.#errorLogger;
    }

    static get RequestLogger () {
        return LogService.#requestLogger;
    }

    static get StartLogger () {
        return LogService.#startLogger;
    }

}

module.exports = LogService;