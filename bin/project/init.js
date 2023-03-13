const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');
const { extractArgument, argsContains } = require('../utils/args.utils');
const join = require('path').join;
const prompt = require('prompt');
const chalk = require('chalk');

function createPackageJson(project_name, options = {}) {

    console.log(chalk.yellow('Creating project with name: ' + project_name));
    console.log(chalk.blue('Creating package.json... with options: ' + JSON.stringify(options)));
    if(options.sequelize) {
        copyTemplate(join(__dirname, '../../templates/package.sequelize.json'), './package.json');
    } else if (options.mongoose) {
        copyTemplate(join(__dirname, '../../templates/package.mongoose.json'), './package.json');
    }
    hydrateFile('./package.json', { project_name });
    console.log(chalk.green('package.json created'));

}

function createIndexJs(project_name, options = {}) {

    createPackageJson(project_name, options);

    console.log(chalk.blue('Creating index.js and setup.js...'));
    if (options.sequelize) {
        console.log(chalk.blue('Creating sequelize files...'));
        copyTemplate(join(__dirname, '../../templates/setup.sequelize.js'), './setup.js');
    } else if (options.mongoose) {
        console.log(chalk.blue('Creating mongoose files...'));
        copyTemplate(join(__dirname, '../../templates/setup.mongoose.js'), './setup.js');
    }

    copyTemplate(join(__dirname, '../../templates/index.js'), './index.js');

    hydrateFile('./setup.js', { project_name });

    console.log(chalk.green('index.js and setup.js created'));

}

function initializeStructure(project_name, options = {}) {

    try {
        createIndexJs(project_name, options);
        mkdirSafe('config');
        copyTemplate(join(__dirname, '../../templates/config/default.json'), './config/default.json');
        copyTemplate(join(__dirname, '../../templates/config/development.json'), './config/development.json');
        copyTemplate(join(__dirname, '../../templates/config/production.json'), './config/production.json');
        copyTemplate(join(__dirname, '../../templates/config/test.json'), './config/test.json');
        copyTemplate(join(__dirname, '../../templates/gitignore'), './.gitignore');
        mkdirSafe('app');
        mkdirSafe('app/entities');
        mkdirSafe('app/test');
        copyTemplate(join(__dirname, '../../templates/app/test/mocha.setup.js'), './app/test/mocha.setup.js');
        copyTemplate(join(__dirname, '../../templates/app/test/utils.setup.js'), './app/test/utils.setup.js');
        mkdirSafe('app/services');
        copyTemplate(join(__dirname, '../../templates/app/services/auth.service.js'), './app/services/auth.service.js');
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