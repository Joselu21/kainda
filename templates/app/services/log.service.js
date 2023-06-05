const { chalk } = require('kainda');
const winston = require('winston');

class LogService {

    static #requestLogger;
    static #errorLogger;
    static #startLogger;
    static #serverLogger;
    static #uncaughtExceptionLogger;

    static init(options) {
        LogService.initRequestLogger(options);
        LogService.initErrorLogger(options);
        LogService.initStartLogger(options);
        LogService.initServerLogger(options);
        LogService.initUncaughtExceptionLogger(options);
    }

    static initRequestLogger(options) {
        const transports = [];
        if (options.console !== false) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(requestConsoleFormatter)
                ),
            }));
        }
        if (options.file !== false) {
            transports.push(new winston.transports.File({ filename: 'logs/request.log' }));
        }
        LogService.#requestLogger = winston.createLogger({ level: 'info', transports });
    }

    static initErrorLogger(options) {
        const transports = [];
        if (options.console !== false) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(info => consoleColorizer('ERROR', info))
                ),
            }));
        }
        if (options.file !== false) {
            transports.push(new winston.transports.File({ filename: 'logs/error.log' }));
        }
        LogService.#errorLogger = winston.createLogger({ level: 'error', transports });
    }

    static initStartLogger(options) {
        const transports = [];
        if (options.console !== false) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(info => consoleColorizer('START', info))
                )
            }));
        }
        if (options.file !== false) {
            transports.push(new winston.transports.File({ filename: 'logs/starts.log' }));
        }
        LogService.#startLogger = winston.createLogger({ level: 'info', transports });
    }

    static initServerLogger(options) {
        const transports = [];
        if (options.console !== false) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(info => consoleColorizer('SERVER', info))
                )
            }));
        }
        if (options.file !== false) {
            transports.push(new winston.transports.File({ filename: 'logs/server.log' }));
        }
        LogService.#serverLogger = winston.createLogger({ level: 'info', transports });
    }

    static initUncaughtExceptionLogger(options) {
        const transports = [];
        if (options.console !== false) {
            transports.push(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(info => consoleColorizer('UNCAUGHT', info))
                )
            }));
        }
        if (options.file !== false) {
            transports.push(new winston.transports.File({ filename: 'logs/uncaughtException.log' }));
        }
        LogService.#uncaughtExceptionLogger = winston.createLogger({
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json()
            ),
            transports
        });

        // Report and log unhandled exceptions
        process.on("uncaughtExceptionMonitor", (err, origin) => {
            LogService.#uncaughtExceptionLogger.error(err);
        });

        // Avoid the process to exit when an unhandled exception occurs
        if (options.stopOnUncaughtException !== true) {
            process.on("uncaughtException", () => { });
        }
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

function requestConsoleFormatter(info) {
    let message = `[REQUEST] [${info.message.req.method}] [${info.message.req.originalUrl}] [${info.message.res.statusCode}]`;
    let color = chalk.blue;
    if (info.message.res.statusCode >= 200 && info.message.res.statusCode < 300) {
        color = chalk.green;
    } else if (info.message.res.statusCode >= 300 && info.message.res.statusCode < 400) {
        color = chalk.blue;
    } else if (info.message.res.statusCode >= 400 && info.message.res.statusCode < 500) {
        color = chalk.yellow;
    } else if (info.message.res.statusCode >= 500 && info.message.res.statusCode < 600) {
        color = chalk.red;
    }
    // Whenever the status code is 4xx or 5xx, we log the request body
    if (info.message.req.body && (color === chalk.red || color === chalk.yellow)) {
        message += `\n${JSON.stringify(info.message.req.body, null, 4)}`;
    }
    return color(message);
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
    let message = info.message ?? info._message ?? {};
    message = (typeof message === "object" || Object.keys(message).length > 0) ? JSON.stringify(message, null, 4) : message;
    return color(`[${prefix}] [${info.level.toUpperCase()}] [${info.timestamp}]: ${message}`);
}

module.exports = LogService;