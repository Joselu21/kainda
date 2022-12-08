const path = require('path');
const prompt = require('prompt');
const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');

function _createEntitySequelize(name, options = {}) {

    if(options.meta) {
        mkdirSafe('app/entities/' + name + '/meta');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/meta/model.template.txt'), './app/entities/' + name + '/meta/' + name + '.meta.model.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/meta/seeders.template.txt'), './app/entities/' + name + '/meta/' + name + '.meta.seeders.js');

        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model_with_metas.template.txt'), './app/entities/' + name + '/' + name + '.model.js');

    } else {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model.template.txt'), './app/entities/' + name + '/' + name + '.model.js');
    }
    
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes.template.txt'),       './app/entities/' + name + '/' + name + '.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'),   './app/entities/' + name + '/' + name + '.exceptions.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller.template.txt'),   './app/entities/' + name + '/' + name + '.controller.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'),  './app/entities/' + name + '/' + name + '.middlewares.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/seeders.template.txt'),      './app/entities/' + name + '/' + name + '.seeders.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'),   './app/entities/' + name + '/' + name + '.validators.js');
}

function _createEntityMongoose(name, options = {}) {
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes.template.txt'),       './app/entities/' + name + '/' + name + '.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/model.template.txt'),         './app/entities/' + name + '/' + name + '.model.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'),   './app/entities/' + name + '/' + name + '.exceptions.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller.template.txt'),    './app/entities/' + name + '/' + name + '.controller.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'),  './app/entities/' + name + '/' + name + '.middlewares.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/seeders.template.txt'),       './app/entities/' + name + '/' + name + '.seeders.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'),   './app/entities/' + name + '/' + name + '.validators.js');
}


async function createEntity(name, options = {}) {
    name = name.toLowerCase();

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

    mkdirSafe('app/entities/' + name);
    if (options.sequelize) {
        _createEntitySequelize(name, options);
    } else if (options.mongoose) {
        _createEntityMongoose(name, options);
    } else {
        console.log('No entity type specified');
        return;
    }
    
    hydrateFile('./app/entities/' + name + '/' + name + '.routes.js',      { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.model.js',       { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.exceptions.js',  { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.controller.js',  { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.middlewares.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.seeders.js',     { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.validators.js',  { entity_name: name, project_name: options.project_name });
}

module.exports = createEntity;