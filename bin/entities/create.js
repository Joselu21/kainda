const path = require('path');
const prompt = require('prompt');
const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');

function __createControllers(name, options) {
    mkdirSafe('app/entities/' + name + '/controllers');
    mkdirSafe('app/entities/' + name + '/controllers/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/controllers/index.js');
    hydrateFile('./app/entities/' + name + '/controllers/index.js', { entity_name: 'controller' });
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/create.controller.txt'), './app/entities/' + name + '/controllers/src/create.controller.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/delete.controller.txt'), './app/entities/' + name + '/controllers/src/delete.controller.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/get.controller.txt'), './app/entities/' + name + '/controllers/src/get.controller.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller/update.controller.txt'), './app/entities/' + name + '/controllers/src/update.controller.js');
    hydrateFile('./app/entities/' + name + '/controllers/src/create.controller.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/delete.controller.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/get.controller.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/controllers/src/update.controller.js', { entity_name: name });
}

function __createMiddlewares(name, options) {
    mkdirSafe('app/entities/' + name + '/middlewares');
    mkdirSafe('app/entities/' + name + '/middlewares/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/middlewares/index.js');
    hydrateFile('./app/entities/' + name + '/middlewares/index.js', { entity_name: 'middlewares' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'), './app/entities/' + name + '/middlewares/src/checkRequiredKeys.middlewares.js');
    hydrateFile('./app/entities/' + name + '/middlewares/src/checkRequiredKeys.middlewares.js', { entity_name: name });

}

function __createExceptions(name, options) {
    mkdirSafe('app/entities/' + name + '/exceptions');
    mkdirSafe('app/entities/' + name + '/exceptions/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/exceptions/index.js');
    hydrateFile('./app/entities/' + name + '/exceptions/index.js', { entity_name: 'exceptions' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'), './app/entities/' + name + '/exceptions/src/all.exceptions.js');
    hydrateFile('./app/entities/' + name + '/exceptions/src/all.exceptions.js', { entity_name: name });

}

function __createValidators(name, options) {
    mkdirSafe('app/entities/' + name + '/validators');
    mkdirSafe('app/entities/' + name + '/validators/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/validators/index.js');
    hydrateFile('./app/entities/' + name + '/validators/index.js', { entity_name: 'validators' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'), './app/entities/' + name + '/validators/src/all.validators.js');
    hydrateFile('./app/entities/' + name + '/validators/src/all.validators.js', { entity_name: name });

}

function __createRoutes(name, options) {

    mkdirSafe('app/entities/' + name + '/routes');
    mkdirSafe('app/entities/' + name + '/routes/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/routes/index.js');
    hydrateFile('./app/entities/' + name + '/routes/index.js', { entity_name: 'routes' });

    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/create.routes.txt'), './app/entities/' + name + '/routes/src/create.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/delete.routes.txt'), './app/entities/' + name + '/routes/src/delete.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/get.routes.txt'), './app/entities/' + name + '/routes/src/get.routes.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes/update.routes.txt'), './app/entities/' + name + '/routes/src/update.routes.js');

    hydrateFile('./app/entities/' + name + '/routes/src/create.routes.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/delete.routes.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/get.routes.js', { entity_name: name });
    hydrateFile('./app/entities/' + name + '/routes/src/update.routes.js', { entity_name: name });

}

function __createSeeders(name, options) {

    mkdirSafe('app/entities/' + name + '/seeders');
    mkdirSafe('app/entities/' + name + '/seeders/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.template.txt'), './app/entities/' + name + '/seeders/index.js');
    hydrateFile('./app/entities/' + name + '/seeders/index.js', { entity_name: 'seeders' });
    copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/seeders.template.txt'), './app/entities/' + name + '/seeders/src/all.seeders.js');
    hydrateFile('./app/entities/' + name + '/seeders/src/all.seeders.js', { entity_name: name });

}

function __createModel(name, options) {

    mkdirSafe('app/entities/' + name + '/model');
    mkdirSafe('app/entities/' + name + '/model/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/subindex.model.template.txt'), './app/entities/' + name + '/model/index.js');
    hydrateFile('./app/entities/' + name + '/model/index.js', { entity_name: name });

    if (options.sequelize) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model.template.txt'), './app/entities/' + name + '/model/src/' + name + '.model.js');
    } else if (options.mongoose) {
        copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/model.template.txt'), './app/entities/' + name + '/model/src/' + name + '.model.js');
    }

    hydrateFile('./app/entities/' + name + '/model/src/' + name + '.model.js', {
        entity_name: name,
    });

}

function __createTest(name, options) {

    mkdirSafe('app/entities/' + name + '/test');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/entity.template.txt'), './app/entities/' + name + '/test/' + name + '.test.js');
    hydrateFile('./app/entities/' + name + '/test/' + name + '.test.js', { entity_name: name });

    mkdirSafe('app/entities/' + name + '/test/src');

    mkdirSafe('app/entities/' + name + '/test/src/endpoint');
    mkdirSafe('app/entities/' + name + '/test/src/endpoint/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/fragment.template.txt'), './app/entities/' + name + '/test/src/endpoint/index.js');
    hydrateFile('./app/entities/' + name + '/test/src/endpoint/index.js', { entity_name: name });
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/endpoint/create.template.txt'), './app/entities/' + name + '/test/src/endpoint/src/create.test.fragment.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/endpoint/get.template.txt'), './app/entities/' + name + '/test/src/endpoint/src/get.test.fragment.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/endpoint/update.template.txt'), './app/entities/' + name + '/test/src/endpoint/src/update.test.fragment.js');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/endpoint/delete.template.txt'), './app/entities/' + name + '/test/src/endpoint/src/delete.test.fragment.js');

    mkdirSafe('app/entities/' + name + '/test/src/unit');
    mkdirSafe('app/entities/' + name + '/test/src/unit/src');
    copyTemplate(path.join(__dirname, '../../templates/app/entities/test/fragment.template.txt'), './app/entities/' + name + '/test/src/unit/index.js');
    hydrateFile('./app/entities/' + name + '/test/src/unit/index.js', { entity_name: name });

}

function _createEntityStructure(name, options) {

    mkdirSafe('app/entities/' + name);
    copyTemplate(path.join(__dirname, '../../templates/app/entities/index.template.txt'), './app/entities/' + name + '/index.js');
    hydrateFile('./app/entities/' + name + '/index.js', { entity_name: name });

    __createControllers(name, options);
    __createMiddlewares(name, options);
    __createExceptions(name, options);
    __createValidators(name, options);
    __createRoutes(name, options);
    __createSeeders(name, options);
    __createModel(name, options);
    __createTest(name, options);

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