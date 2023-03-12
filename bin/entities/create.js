const path = require('path');
const prompt = require('prompt');
const fs = require('fs');
const chalk = require('chalk');
const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');

const templatesPath = path.join(__dirname, '../../templates/');
const appPath = templatesPath + 'app/';
const entitiesPath = appPath + 'entities/';

function __auxiliarRecursiveCreateStructure(name, options, templatePath, destinationPath) {

    const files = fs.readdirSync(templatePath);

    for (const file of files) {
        // If it is a directory, create it
        const templateFilePath = templatePath + '/' + file;
        const destinationFilePath = destinationPath + '/' + file;
        if (fs.lstatSync(templateFilePath).isDirectory()) {
            mkdirSafe(destinationFilePath);
            __auxiliarRecursiveCreateStructure(name, options, templateFilePath, destinationFilePath);
        } else {
            copyTemplate(templateFilePath, destinationFilePath);
            hydrateFile(destinationFilePath, { entity_name: name });
        }
    }

}

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

        __auxiliarRecursiveCreateStructure(name, options, entitiesPath + structureName + '/src', './app/entities/' + name + '/' + structureName + '/src');

        if (structureName === 'test') {
            // Copy model.test.js to name.test.js
            copyTemplate(entitiesPath + structureName + '/model.test.js', './app/entities/' + name + '/' + structureName + '/src/' + urlName + '.test.js');
            hydrateFile('./app/entities/' + name + '/' + structureName + '/src/' + urlName + '.test.js', { entity_name: name });
        }

    }

}

function _createEntityStructure(name, options) {

    mkdirSafe('app/entities/' + name);
    copyTemplate(path.join(__dirname, '../../templates/app/entities/index.js'), './app/entities/' + name + '/index.js');
    hydrateFile('./app/entities/' + name + '/index.js', { entity_name: name });

    __genericCreateStructure(name, options);

}

async function createEntity(name, options = {}) {

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

    // Question the user if he wants to create a new sequelize or mongoose entity
    if (!options.sequelize && !options.mongoose) {
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
            options.sequelize = result.database_type === 'sequelize';
            options.mongoose = result.database_type === 'mongoose';
            if (!options.sequelize && !options.mongoose) {
                console.log(chalk.red('Database type must be sequelize or mongoose'));
            }
        }
    }

    if (options.sequelize) {
        _createEntityStructure(name, options);
    } else if (options.mongoose) {
        _createEntityStructure(name, options);
    } else {
        console.log('No entity type specified');
    }
}

module.exports = createEntity;