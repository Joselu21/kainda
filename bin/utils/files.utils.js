const { extractArgument } = require('./args.utils');
const fs = require('fs');

let conflict_mode = extractArgument('--conflict_mode') ?? extractArgument('-c') ?? 'stop';

function conflict(path, overwrite_conflict_mode = null) {
    let mode = overwrite_conflict_mode ?? conflict_mode;
    switch (mode) {
        case 'stop':
            throw new Error(`${path} already exists`);
        case 'update':
            console.log(`Updating ${path}`);
            break;
        case 'overwrite':
            console.log(`Overwriting ${path}`);
            _backupFile(path);
            fs.rmSync(path);
            break;
        default:
            throw new Error('Invalid conflict mode: ' + mode);
    }
}

function _backupFile(path) {
    const backup_path = `${path}.backup`;
    if (fs.existsSync(backup_path)) {
        throw new Error(`Backup file already exists: ${backup_path}`);
    }
    fs.copyFileSync(path, backup_path);
}

function mkdirSafe(name, overwrite_conflict_mode = null) {
    if (fs.existsSync(name)) {
        conflict(name, conflict_mode ?? overwrite_conflict_mode);
    }
    fs.mkdirSync(name);
}

function copyTemplate(from, to, overwrite_conflict_mode = null) {
    console.log(`Creating ${to} with template ${from}, overwrite_conflict_mode: ${overwrite_conflict_mode}, conflict_mode: ${conflict_mode}`);
    if (!fs.existsSync(from)) {
        console.log(`Template ${from} does not exist`);
        throw new Error(`${from} does not exist`);
    }
    if (fs.existsSync(to)) {
        console.log(`${to} already exists`);
        conflict(to, conflict_mode ?? overwrite_conflict_mode);
    }
    const template = fs.readFileSync(from, 'utf8');
    fs.writeFileSync(to, template);
}

function hydrateFile(path, options = {}) {
    let file = fs.readFileSync(path, 'utf8');
    if (options.entity_name) {
        file = file.replaceAll("%%$MODEL_NAME_UPPERCASE$%%", options.entity_name.charAt(0).toUpperCase() + options.entity_name.slice(1));
        file = file.replaceAll("%%$MODEL_NAME_LOWERCASE$%%", options.entity_name.toLowerCase());
    } else if (options.project_name) {
        file = file.replaceAll("%%$PROJECT_NAME$%%", options.project_name);
    }
    fs.writeFileSync(path, file);
}

module.exports = {
    mkdirSafe,
    copyTemplate,
    hydrateFile,
    _backupFile,
    conflict,
    conflict_mode
};