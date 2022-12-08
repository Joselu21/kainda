const { _copyTemplate, _reformatFile, _mkdir } = require('../utils/files.utils');
const { extractArgument, argsContains } = require('../utils/args.utils');
const join = require('path').join;
const prompt = require('prompt');
const chalk = require('chalk');

function createPackageJson(project_name, options = {}) {

    console.log(chalk.yellow('Creating project with name: ' + project_name));
    console.log(chalk.blue('Creating package.json... with options: ' + JSON.stringify(options)));
    if(options.sequelize) {
        _copyTemplate(join(__dirname, '../../templates/package-template-sequelize.json'), './package.json');
    } else if (options.mongoose) {
        _copyTemplate(join(__dirname, '../../templates/package-template-mongoose.json'), './package.json');
    }
    _reformatFile('./package.json', { project_name });
    console.log(chalk.green('package.json created'));

}

function createIndexJs(project_name, options = {}) {

    createPackageJson(project_name, options);

    console.log(chalk.blue('Creating index.js and setup.js...'));
    if (options.sequelize) {
        console.log(chalk.blue('Creating sequelize files...'));
        _copyTemplate(join(__dirname, '../../templates/setup-template-sequelize.js'), './setup.js');
    } else if (options.mongoose) {
        console.log(chalk.blue('Creating mongoose files...'));
        _copyTemplate(join(__dirname, '../../templates/setup-template-mongoose.js'), './setup.js');
    }

    _copyTemplate(join(__dirname, '../../templates/index-template.js'), './index.js');

    _reformatFile('./setup.js', { project_name });

    console.log(chalk.green('index.js and setup.js created'));

}

function initializeStructure(project_name, options = {}) {

    try {
        createIndexJs(project_name, options);
        _mkdir('config');
        _copyTemplate(join(__dirname, '../../templates/config/default-config-template.json'), './config/default.json');
        _copyTemplate(join(__dirname, '../../templates/config/development-config-template.json'), './config/development.json');
        _copyTemplate(join(__dirname, '../../templates/config/production-config-template.json'), './config/production.json');
        _copyTemplate(join(__dirname, '../../templates/config/test-config-template.json'), './config/test.json');
        _copyTemplate(join(__dirname, '../../templates/gitignore.template.txt'), './.gitignore');
        _mkdir('app');
        _mkdir('app/entities');
        _mkdir('app/test');
        _copyTemplate(join(__dirname, '../../templates/app/test/mocha.setup.test.js'), './app/test/mocha.setup.test.js');
        _copyTemplate(join(__dirname, '../../templates/app/test/utils.test.js'), './app/test/utils.test.js');
        _mkdir('app/test/endpoints');
        _mkdir('app/test/unit');
    } catch (error) {
        console.log(error.message);
        return;
    }

}

async function createProject(name = null) {

    let project_name =
        name ??
        extractArgument('--project_name') ??
        extractArgument('-p') ??
        extractArgument('create') ??
        extractArgument('init');
    while (!project_name) {
        console.log("Please, introduce a project name");
        prompt.start();
        const schema = {
            properties: {
                project_name: {
                    description: 'Project name',
                    type: 'string',
                    required: true,
                    message: 'Project name is required'
                }
            }
        };
        const result = await prompt.get(schema);
        project_name = result.project_name;
        if (!project_name.match(/^[a-z_-]+$/)) {
            console.log(chalk.red('Project name must be lowercase and can only contain letters, dashes and underscores'));
            project_name = null;
        }
    }

    options = {
        sequelize: argsContains('--sequelize') || argsContains('--relational') || argsContains('-sql') || argsContains('--sql'),
        mongoose: argsContains('--mongoose') || argsContains('--non-relational') || argsContains('-nosql') || argsContains('--nosql'),
    }

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

    initializeStructure(project_name, options);

}

module.exports = createProject;