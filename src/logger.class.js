class Logger {

    constructor(type, options) {
        this.type = type;
        switch (this.type) {
            case 'mongodb':
                const { MongoClient } = require('mongodb');
                this.client = new MongoClient(options.uri, options.options);
                this.db_name = options.database_name;
                break;
            case 'sqlite':
            case 'sqlite3':
                const sqlite3 = require('sqlite3').verbose();
                this.client = new sqlite3.Database(options.path, (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        if (options.scripts) {
                            options.scripts.forEach(script => {
                                this.client.run(script);
                            });
                        }
                    }
                });
                break;
            case 'postgres':
            case 'postgresql':
                const { Client } = require('pg');
                this.client = new Client(options.uri);
                break;
            case 'mysql':
            case 'mariadb':
                const mysql = require('mysql');
                this.client = mysql.createConnection(options);
                break;
            case 'file':
            case 'fs':
                this.client = require('fs');
                this.path = options.full_path ?? options.path ?? './logs/';
                if (!this.path.endsWith('/') || !this.path.endsWith('\\')) {
                    this.path += '/';
                }
                break;
            default:
                this.client = console;
                break;
        }
        this.subLoggers = options.loggers ?? [];
    }

    async _logMongo(collection_name, data, options) {
        if(options.ignoreMongoDB || options.ignoreDB) return;
        try {
            if(!this.db) {
                await this.client.connect();
                this.db = this.client.db(this.db_name);
            }
            await this.db.collection(collection_name).insertOne(data);
        } catch (error) {
            console.error(error);
        }
    }

    async _logSQLite(collection_name, data, options) {
        if(options.ignoreSQLite || options.ignoreDB) return;

        try {
            if (!this.client.open) {
                await this.client.open();
            }
            await this.client.run(`INSERT INTO ${collection_name} VALUES (?)`, [JSON.stringify(data)]);
        } catch (error) {
            console.error(error);
        }
    }

    async _logPostgreSQL(collection_name, data, options) {
        if(options.ignorePostgreSQL || options.ignoreDB) return;
        try {
            if (!this.client._connected) {
                await this.client.connect();
            }
            await this.client.query(`INSERT INTO ${collection_name} VALUES ($1)`, [JSON.stringify(data)]);
        } catch (error) {
            console.error(error);
        }
    }

    async _logMySQL(collection_name, data, options) {
        if(options.ignoreMySQL || options.ignoreDB) return;
        try {
            if (!this.client._connectCalled) {
                await this.client.connect();
            }
            await this.client.query(`INSERT INTO ${collection_name} VALUES (?)`, [JSON.stringify(data)]);
        } catch (error) {
            console.error(error);
        }
    }

    async _logFile(collection_name, data, options) {
        if(options.ignoreFile) return;

        try {
            if (!this.client.existsSync(this.path)) {
                this.client.mkdirSync(this.path);
            }

            this.client.appendFileSync(`${this.path}${collection_name}.log`, JSON.stringify(data));
            this.client.appendFileSync(`${this.path}${collection_name}.log`, '\n');

        } catch (error) {
            console.error(error);
        }
    }

    async _logConsole(collection_name, data, options) {
        if(options.ignoreConsole) return;
        console.log(`[${collection_name}] ${JSON.stringify(data)}`);
    }

    async log(collection_name, data, options = {}) {
        if (typeof data === 'string') {
            data = { message: data };
        }
        data.mode = process.env.NODE_ENV;
        data.utc_timestamp = new Date().getTime();
        switch (this.type) {
            case 'mongodb':
                await this._logMongo(collection_name, data, options);
                break;
            case 'sqlite':
            case 'sqlite3':
                await this._logSQLite(collection_name, data, options);
                break;
            case 'postgres':
            case 'postgresql':
                await this._logPostgreSQL(collection_name, data, options);
                break;
            case 'mysql':
            case 'mariadb':
                await this._logMySQL(collection_name, data, options);
                break;
            case 'file':
            case 'fs':
                await this._logFile(collection_name, data, options);
                break;
            default:
                await this._logConsole(collection_name, data, options);
                break;
        }
        this.subLoggers.forEach(logger => {
            logger.log(collection_name, data, options);
        });
    }

}

module.exports = Logger;