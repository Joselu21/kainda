const join = require('path').join;
const prompt = require('prompt');
const chalk = require('chalk');
const { _copyTemplate, _reformatFile, _mkdir } = require('../utils/files.utils');
const { extractArgument } = require('../utils/args.utils');

function createPackageJson(project_name) {

    _copyTemplate(join(__dirname, '../../templates/package-template.json'), './package.json');
    _reformatFile('./package.json', { project_name });

}

function createIndexJs(project_name, options = {}) {

    createPackageJson(project_name);

    if (options.sequelize) {
        _copyTemplate(join(__dirname, '../../templates/setup-template-sequelize.js'), './setup.js');
    } else if (options.mongoose) {
        _copyTemplate(join(__dirname, '../../templates/setup-template-mongoose.js'), './setup.js');
    }

    _copyTemplate(join(__dirname, '../../templates/index-template.js'), './index.js');

    _reformatFile('./setup.js', { project_name });

}


function initializeStructure(project_name) {

    try {
        createIndexJs(project_name);
        _mkdir('config', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/config/default-config-template.json'), './config/default.json', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/config/development-config-template.json'), './config/development.json', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/config/production-config-template.json'), './config/production.json', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/config/test-config-template.json'), './config/test.json', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/gitignore.template.txt'), './.gitignore', conflict_mode);
        _mkdir('app', conflict_mode);
        _mkdir('app/entities', conflict_mode);
        _mkdir('app/test', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/app/test/mocha.setup.test.js'), './app/test/mocha.setup.test.js', conflict_mode);
        _copyTemplate(join(__dirname, '../../templates/app/test/utils.test.js'), './app/test/utils.test.js', conflict_mode);
        _mkdir('app/test/endpoints', conflict_mode);
        _mkdir('app/test/unit', conflict_mode);
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
        extractArgument('create');
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
        if (project_name.match(/^[a-z_-]+$/)) {
            console.log(chalk.red('Project name must be lowercase and can only contain letters, dashes and underscores'));
            project_name = null;
        }
    }

    initializeStructure(project_name);

}

module.exports = createProject;