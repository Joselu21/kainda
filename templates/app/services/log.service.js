const { chalk } = require('kainda');
const winston = require('winston');

class LogService {

    static #requestLogger;
    static #errorLogger;
    static #startLogger;
    static #serverLogger;

    static init(options) {
        LogService.#requestLogger = winston.createLogger({
            level: 'info',
            transports: [
                options.console ? new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(info => consoleColorizer('REQUEST', info))
                    ),
                }) : null,
                options.file ? new winston.transports.File({ filename: 'logs/request.log' }) : null
            ]
        });
        LogService.#errorLogger = winston.createLogger({
            level: 'error',
            transports: [
                options.console ? new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(info => consoleColorizer('ERROR', info))
                    ),
                }) : null,
                options.file ? new winston.transports.File({ filename: 'logs/error.log' }) : null
            ]
        });
        LogService.#startLogger = winston.createLogger({
            level: 'info',
            transports: [
                options.console ? new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(info => consoleColorizer('START', info))
                    )
                }) : null,
                options.file ? new winston.transports.File({ filename: 'logs/starts.log' }) : null
            ]
        });
        LogService.#serverLogger = winston.createLogger({
            level: 'info',
            transports: [
                options.console ? new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.printf(info => consoleColorizer('SERVER', info))
                    )
                }) : null,
                options.file ? new winston.transports.File({ filename: 'logs/server.log' }) : null
            ]
        });
    }

    static get ErrorLogger() {
        return LogService.#errorLogger;
    }

    static get RequestLogger() {
        return LogService.#requestLogger;
    }

    static get StartLogger() {
        return LogService.#startLogger;
    }

    static get ServerLogger() {
        return LogService.#serverLogger;
    }

}

function consoleColorizer(prefix, info) {
    let color = chalk.red;
    switch (info.level) {
        case 'error':
            color = chalk.red;
            break;
        case 'warn':
            color = chalk.yellow;
            break;
        case 'info':
            color = chalk.blue;
            break;
        case 'verbose':
            color = chalk.green;
            break;
        case 'debug':
            color = chalk.magenta;
            break;
        case 'silly':
            color = chalk.cyan;
            break;
        default:
            color = chalk.white;
            break;
    }
    return color(`[${prefix}] [${info.level.toUpperCase()}] [${info.timestamp}]: ${info.message}`);
}

module.exports = LogService;