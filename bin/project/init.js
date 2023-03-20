const { copyTemplate, hydrateFile, mkdirSafe } = require('../utils/files.utils');
const { extractArgument, argsContains } = require('../utils/args.utils');
const join = require('path').join;
const prompt = require('prompt');
const chalk = require('chalk');
const fs = require('fs');

/**
 *  Creates a package.json file for a new project with the given name and options.
 *  @param {string} project_name - The name of the project.
 *  @param {Object} options - Optional configuration options.
 *  @param {boolean} [options.sequelize=false] - If true, generates a package.json file for a Sequelize project (mutually exclusive with mongoose).
 *  @param {boolean} [options.mongoose=false] - If true, generates a package.json file for a Mongoose project (mutually exclusive with sequelize).
 */
function createPackageJson(project_name, options = {}) {
    console.log(chalk.yellow('Creating project with name: ' + project_name));
    console.log(chalk.blue('Creating package.json... with options: ' + JSON.stringify(options)));
    if (options.sequelize || options.mongoose) {
        const template = options.sequelize
            ? join(__dirname, '../../templates/package.sequelize.json')
            : join(__dirname, '../../templates/package.mongoose.json');
        copyTemplate(template, './package.json');
        hydrateFile('./package.json', { project_name });
    }
    console.log(chalk.green('package.json created'));
}

/**
 * Creates a package.json file and index.js for a given project name and options.
 * @param {string} project_name - The name of the project to create.
 * @param {Object} options - Options object.
 * @param {boolean} options.sequelize - If true, creates a package.json and index.js for Sequelize.
 * @param {boolean} options.mongoose - If true, creates a package.json and index.js for Mongoose.
 */
function createIndexJs(project_name, options = {}) {
    createPackageJson(project_name, options);
    console.log(chalk.blue('Creating index.js and setup.js...'));
    const template = options.sequelize
        ? join(__dirname, '../../templates/setup.sequelize.js')
        : join(__dirname, '../../templates/setup.mongoose.js');
    copyTemplate(template, './setup.js');
    hydrateFile('./setup.js', { project_name });
    copyTemplate(join(__dirname, '../../templates/index.js'), './index.js');
    console.log(chalk.green('index.js and setup.js created'));
}

/**
 * Creates the basic file structure for a new project.
 * @param {string} project_name - The name of the project.
 * @param {object} [options={}] - Additional options for project setup.
 * @param {boolean} [options.sequelize=false] - Whether to set up the project with Sequelize ORM.
 * @param {boolean} [options.mongoose=false] - Whether to set up the project with Mongoose ORM.
 */
function initializeStructure(project_name, options = {}) {

    try {
        createIndexJs(project_name, options);

        // Array of source-destination pairs for copying files and creating directories
        const dirsAndFiles = [
            ['app', ''],
            ['app/entities', ''],
            ['app/services', ''],
            ['app/services', 'auth.service.js'],
            ['app/services', 'log.service.js'],
            ['app/test', ''],
            ['app/test', 'mocha.setup.js'],
            ['app/test', 'utils.setup.js'],
            ['config', ''],
            ['config', 'default.json'],
            ['config', 'development.json'],
            ['config', 'production.json'],
            ['config', 'test.json'],
            ['doc', ''],
            ['doc', 'openapi.json'],
            ['doc', 'doc-serve.js'],
            ['doc', 'generate-docs.js'],
            ['doc/src', ''],
            ['doc/src', 'components.json'],
            ['doc/src', 'index.json'],
            ['doc/src', 'paths.json'],
            ['doc/src', 'tags.json'],
        ];

        for (const [source, destination] of dirsAndFiles) {
            const sourcePath = join(__dirname, '../../templates', source, destination);
            const destPath = join('.', source, destination);
            if (fs.existsSync(sourcePath)) {
                if (fs.lstatSync(sourcePath).isDirectory()) {
                    mkdirSafe(destPath);
                } else {
                    copyTemplate(sourcePath, destPath);
                    hydrateFile(destPath, { project_name });
                }
            }
        }

        // Gitignore
        copyTemplate(join(__dirname, '../../templates/gitignore'), './.gitignore');

    } catch (error) {
        console.log(error.message);
        return;
    }

}

/**
 * Obtain project name.
 * @async
 * @param {string} [name=null] - The name of the project.
 * @returns {Promise<string>} - The project name promise.
 */
async function __obtainProjectName(name = null) {
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

    return project_name;
}

/**
 * Async function to obtain options from the user about database type
 * @async
 * @returns {Promise} Returns a promise that resolves with an object containing Sequelize and Mongoose options.
*/
async function __obtainOptions() {
    const options = {
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
    }

    return options;
}

/**
 * Asynchronously creates a new project with the given name and options.
 * @async
 * @function createProject
 * @param {string} [name=null] - The name of the project to create. If not provided, will try to obtain it through various channels.
 * @returns {Promise} A Promise that resolves when the project has been successfully created.
*/
async function createProject(name = null) {

    const project_name = await __obtainProjectName(name);
    const options = await __obtainOptions();
    initializeStructure(project_name, options);

}

module.exports = createProject;