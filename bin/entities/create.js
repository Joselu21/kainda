const path = require('path');
const prompt = require('prompt');
const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');

function __createControllers(name, options) {
    mkdirSafe('app/entities/' + name + '/controllers');
    mkdirSafe('app/entities/' + name + '/controllers/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/controllers/index.js');
    hydrateFile('./app/entities/' + name + '/controllers/index.js', { name: 'controller' });
    if (options.sequelize) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/create.template.txt'), './app/entities/' + name + '/controllers/src/create.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/delete.template.txt'), './app/entities/' + name + '/controllers/src/delete.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/get.template.txt'), './app/entities/' + name + '/controllers/src/get.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/update.template.txt'), './app/entities/' + name + '/controllers/src/update.controller.js');
    } else if (options.mongoose) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller/create.template.txt'), './app/entities/' + name + '/controllers/src/create.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller/delete.template.txt'), './app/entities/' + name + '/controllers/src/delete.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller/get.template.txt'), './app/entities/' + name + '/controllers/src/get.controller.js');
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller/update.template.txt'), './app/entities/' + name + '/controllers/src/update.controller.js');
    }
    hydrateFile('./app/entities/' + name + '/controllers/src/create.controller.js', { name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/delete.controller.js', { name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/get.controller.js', { name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/update.controller.js', { name: name });
}

function __createMiddlewares (name, options) {
    mkdirSafe('app/entities/' + name + '/middlewares');
    mkdirSafe('app/entities/' + name + '/middlewares/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/middlewares/index.js');
    hydrateFile('./app/entities/' + name + '/controllers/index.js', { name: 'middlewares' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'), './app/entities/' + name + '/middlewares/src/checkRequiredKeys.middleware.js');
    hydrateFile('./app/entities/' + name + '/middlewares/src/checkRequiredKeys.middleware.js', { name: name });

}

function __createExceptions (name, options) {
    mkdirSafe('app/entities/' + name + '/exceptions');
    mkdirSafe('app/entities/' + name + '/exceptions/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/exceptions/index.js');
    hydrateFile('./app/entities/' + name + '/exceptions/index.js', { name: 'exceptions' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'), './app/entities/' + name + '/exceptions/src/all.exceptions.js');
    hydrateFile('./app/entities/' + name + '/exceptions/src/all.exceptions.js', { name: name });

}

function __createValidators (name, options) {
    mkdirSafe('app/entities/' + name + '/validators');
    mkdirSafe('app/entities/' + name + '/validators/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/validators/index.js');
    hydrateFile('./app/entities/' + name + '/validators/index.js', { name: 'validators' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'), './app/entities/' + name + '/validators/src/all.validators.js');
    hydrateFile('./app/entities/' + name + '/validators/src/all.validators.js', { name: name });

}

function __createRoutes (name, options) {

    mkdirSafe('app/entities/' + name + '/routes');
    mkdirSafe('app/entities/' + name + '/routes/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/routes/index.js');
    hydrateFile('./app/entities/' + name + '/routes/index.js', { name: 'routes' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/create.routes.txt'), './app/entities/' + name + '/routes/src/create.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/delete.routes.txt'), './app/entities/' + name + '/routes/src/delete.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/get.routes.txt'), './app/entities/' + name + '/routes/src/get.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/update.routes.txt'), './app/entities/' + name + '/routes/src/update.routes.js');
    
    hydrateFile('./app/entities/' + name + '/routes/src/create.routes.js', { name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/delete.routes.js', { name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/get.routes.js', { name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/update.routes.js', { name: name });

}

function __createSeeders (name, options) {

    mkdirSafe('app/entities/' + name + '/seeders');
    mkdirSafe('app/entities/' + name + '/seeders/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/seeders/index.js');
    hydrateFile('./app/entities/' + name + '/seeders/index.js', { name: 'seeders' });

    if (options.sequelize) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/seeders.template.txt'), './app/entities/' + name + '/seeders/src/all.seeders.js');
    } else if (options.mongoose) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/seeders.template.txt'),  './app/entities/' + name + '/seeders/src/all.seeders.js');
    }

    hydrateFile('./app/entities/' + name + '/seeders/src/all.seeders.js', { name: name });

}

function __createModel (name, options) {

    mkdirSafe('app/entities/' + name + '/seeders');
    mkdirSafe('app/entities/' + name + '/seeders/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/model/index.js');
    hydrateFile('./app/entities/' + name + '/model/index.js', { name: 'model' });

    if (options.sequelize) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model.template.txt'), './app/entities/' + name + '/model/' + name + '.model.js');
    } else if (options.mongoose) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/model.template.txt'),  './app/entities/' + name + '/model/' + name + '.model.js');
    }

    hydrateFile('./app/entities/' + name + '/model/index.js', { name: name });

}

function _createEntityStructure(name, options) {

    mkdirSafe('app/entities/' + name);
    copyTemplate(path.join(__dirname, '../../templates/app/entities/index.template.txt'), './app/entities/' + name + '/index.js');

    __createControllers(name, options);
    __createMiddlewares(name, options);
    __createExceptions(name, options);
    __createValidators(name, options);
    __createRoutes(name, options);
    __createSeeders(name, options);
    __createModel(name, options);

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

    mkdirSafe('app/entities/' + name);
    if (options.sequelize) {
        _createEntityStructure(name, options);
    } else if (options.mongoose) {
        _createEntityStructure(name, options);
    } else {
        console.log('No entity type specified');
        return;
    }

    hydrateFile('./app/entities/' + name + '/' + name + '.routes.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.model.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.exceptions.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.controller.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.middlewares.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.seeders.js', { entity_name: name, project_name: options.project_name });
    hydrateFile('./app/entities/' + name + '/' + name + '.validators.js', { entity_name: name, project_name: options.project_name });
}

module.exports = createEntity;