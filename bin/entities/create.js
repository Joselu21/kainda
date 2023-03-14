const path = require('path');
const prompt = require('prompt');
const fs = require('fs');
const chalk = require('chalk');
const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');

const templatesPath = path.join(__dirname, '../../templates/');
const appPath = templatesPath + 'app/';
const entitiesPath = appPath + 'entities/';

/**
 * Creates the basic file structure for a new entity.
 * @param {string} name - The name of the entity to create.
 * @param {string} templatePath - The path to the template directory.
 * @param {string} destinationPath - The path to the destination directory.
 */
function __auxiliarRecursiveCreateStructure(name, templatePath, destinationPath) {

    const files = fs.readdirSync(templatePath);

    for (const file of files) {
        // If it is a directory, create it
        const templateFilePath = templatePath + '/' + file;
        const destinationFilePath = destinationPath + '/' + file;
        if (fs.lstatSync(templateFilePath).isDirectory()) {
            mkdirSafe(destinationFilePath);
            __auxiliarRecursiveCreateStructure(name, templateFilePath, destinationFilePath);
        } else {
            copyTemplate(templateFilePath, destinationFilePath);
            hydrateFile(destinationFilePath, { entity_name: name });
        }
    }

}

/**
 * Creates a new entity with the given name and options.
 * @param {string} name - The name of the entity to create.
 * @param {Object} options - Options object.
 * @param {boolean} options.sequelize - If true, creates a Sequelize entity.
 * @param {boolean} options.mongoose - If true, creates a Mongoose entity.
 */
function __genericCreateStructure(name, options) {

    const urlName = name.toLowerCase().substring(0, 1) + name.substring(1);

    const StructureNames = [
        'controllers',
        'exceptions',
        'middlewares',
        'model',
        'routes',
        'seeders',
        'test',
        'validators'
    ];

    for (const structureName of StructureNames) {
        mkdirSafe('app/entities/' + name + '/' + structureName);
        mkdirSafe('app/entities/' + name + '/' + structureName + '/src');
        copyTemplate(entitiesPath + structureName + '/index.js', './app/entities/' + name + '/' + structureName + '/index.js');
        hydrateFile('./app/entities/' + name + '/' + structureName + '/index.js', { entity_name: name });

        if (structureName === 'model') {
            if (options.sequelize) {
                copyTemplate(entitiesPath + structureName + '/src/model.sequelize.js', './app/entities/' + name + '/' + structureName + '/src/' + urlName + '.model.js');
            } else if (options.mongoose) {
                copyTemplate(entitiesPath + structureName + '/src/model.mongoose.js', './app/entities/' + name + '/' + structureName + '/src/' + urlName + '.model.js');
            }
            hydrateFile('./app/entities/' + name + '/' + structureName + '/src/' + urlName + '.model.js', { entity_name: name });
            continue;
        }

        __auxiliarRecursiveCreateStructure(name, entitiesPath + structureName + '/src', './app/entities/' + name + '/' + structureName + '/src');

        if (structureName === 'test') {
            // Copy model.test.js to name.test.js
            copyTemplate(entitiesPath + structureName + '/model.test.js', './app/entities/' + name + '/' + structureName + '/src/' + urlName + '.test.js');
            hydrateFile('./app/entities/' + name + '/' + structureName + '/src/' + urlName + '.test.js', { entity_name: name });
        }

    }

}

/**
 * Creates an entity structure.
 * @param {string} name - The entity name.
 * @param {Object} options - The options object.
 * @param {boolean} options.sequelize - Whether to use sequelize.
 * @param {boolean} options.mongoose - Whether to use mongoose.
 * @returns {void} Nothing.
 */
function _createEntityStructure(name, options) {
    mkdirSafe('app/entities/' + name);
    copyTemplate(path.join(__dirname, '../../templates/app/entities/index.js'), './app/entities/' + name + '/index.js');
    hydrateFile('./app/entities/' + name + '/index.js', { entity_name: name });
    __genericCreateStructure(name, options);
}

/**
 * Prompts the user to input an entity name until a valid one is provided.
 * @async
 * @private
 * @param {string} name[null] - The entity name to be validated.
 * @returns {Promise<string>} The obtained entity name.
 */
async function __obtainEntityName(name = null) {
    while (!name || name === '') {
        console.log("Please, choose a name for your entity");
        prompt.start();
        const schema = {
            properties: {
                entity_name: {
                    description: 'Entity name',
                    type: 'string',
                    required: true,
                    message: 'Entity name is required'
                }
            }
        };
        const result = await prompt.get(schema);
        name = result.entity_name;
    }
    name = name.substring(0, 1).toLowerCase() + name.substring(1);
    return name;
}

/**
 * Obtains options for creating an entity.
 * @async
 * @private
 * @param {Object} options - The options object.
 * @param {boolean} options.sequelize - Whether to use sequelize.
 * @param {boolean} options.mongoose - Whether to use mongoose.
 * @returns {Promise<Object>} A promise that resolves with the options object.
 */
async function __obtainOptions(options = {}) {
    while (!options.sequelize && !options.mongoose) {
        console.log("Please, choose a database type");
        prompt.start();
        const schema = {
            properties: {
                database_type: {
                    description: 'Database type (sequelize, mongoose)',
                    type: 'string',
                    required: true,
                    message: 'Database type is required'
                }
            }
        };
        const result = await prompt.get(schema);
        const databaseType = result.database_type.toLowerCase();
        options.sequelize = databaseType === 'sequelize';
        options.mongoose = databaseType === 'mongoose';
        if (!options.sequelize && !options.mongoose) {
            console.log(chalk.red('Database type must be sequelize or mongoose'));
        }
    }
    return options;
}

/**
 * Creates an entity with the given name and options.
 * @async
 * @param {string} name - The name of the entity to be created.
 * @param {Object} options - The options to be used when creating the entity.
 * @returns {void}
 */
async function createEntity(name, options = {}) {

    name = await __obtainEntityName(name);
    options = await __obtainOptions(options);
    _createEntityStructure(name, options);

}

module.exports = createEntity;