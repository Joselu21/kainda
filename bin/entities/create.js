const path = require('path');
const { _copyTemplate, _reformatFile, _mkdir } = require('../utils/files.utils');

function _createEntitySequelize(name, options = {}) {

    if(options.meta) {
        _mkdir('app/entities/' + name + '/meta');
        _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/meta/model.template.txt'), './app/entities/' + name + '/meta/' + name + '.meta.model.js');
        _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/meta/seeders.template.txt'), './app/entities/' + name + '/meta/' + name + '.meta.seeders.js');

        _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model_with_metas.template.txt'), './app/entities/' + name + '/' + name + '.model.js');

    } else {
        _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/model.template.txt'), './app/entities/' + name + '/' + name + '.model.js');
    }
    
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes.template.txt'),       './app/entities/' + name + '/' + name + '.routes.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'),   './app/entities/' + name + '/' + name + '.exceptions.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/controller.template.txt'),   './app/entities/' + name + '/' + name + '.controller.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'),  './app/entities/' + name + '/' + name + '.middlewares.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/seeders.template.txt'),      './app/entities/' + name + '/' + name + '.seeders.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'),   './app/entities/' + name + '/' + name + '.validators.js');
}

function _createEntityMongoose(name, options = {}) {
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/routes.template.txt'),       './app/entities/' + name + '/' + name + '.routes.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/model.template.txt'),        './app/entities/' + name + '/' + name + '.model.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/exceptions.template.txt'),   './app/entities/' + name + '/' + name + '.exceptions.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/controller.template.txt'),   './app/entities/' + name + '/' + name + '.controller.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/middlewares.template.txt'),  './app/entities/' + name + '/' + name + '.middlewares.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/mongoose/seeders.template.txt'),      './app/entities/' + name + '/' + name + '.seeders.js');
    _copyTemplate(path.join(__dirname, '../../templates/app/entities/sequelize/validators.template.txt'),   './app/entities/' + name + '/' + name + '.validators.js');
}


function createEntity(name, options = {}) {
    name = name.toLowerCase();
    // Extract if the entity is a sequelize or mongoose entity
    if(!options.sequelize || !options.mongoose) {
        let packageJson = require(path.join(process.cwd(), 'package.json'));
        if(!packageJson || !packageJson.dependencies) {
            console.log('Error: package.json not found or not valid');
            return;
        }
        let orm = packageJson.dependencies['sequelize'] ? 'sequelize' : 
                  packageJson.dependencies['mongoose'] ? 'mongoose' : null;
        if(orm === null) {
            console.log('No ORM/ODM found in package.json');
            return;
        }
        options[orm] = true;
    }

    _mkdir('app/entities/' + name);
    if (options.sequelize) {
        _createEntitySequelize(name, options);
    } else if (options.mongoose) {
        _createEntityMongoose(name, options);
    } else {
        console.log('No entity type specified');
        return;
    }
    _reformatFile('./app/entities/' + name + '/' + name + '.routes.js',      { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.model.js',       { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.exceptions.js',  { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.controller.js',  { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.middlewares.js', { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.seeders.js',     { entity_name: name, project_name: options.project_name });
    _reformatFile('./app/entities/' + name + '/' + name + '.validators.js',  { entity_name: name, project_name: options.project_name });
}

module.exports = createEntity;