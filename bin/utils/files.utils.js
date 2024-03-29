const { extractArgument } = require("./args.utils");
const fs = require("fs");
const path = require("path");

let conflict_mode = extractArgument("--conflict_mode") ?? extractArgument("-c") ?? "stop";

function conflict(path, overwrite_conflict_mode = null) 
{
    let mode = overwrite_conflict_mode ?? conflict_mode;
    switch (mode) 
    {
    case "stop":
        throw new Error(`${path} already exists`);
    case "update":
        console.log(`Updating ${path}`);
        break;
    case "overwrite":
        console.log(`Overwriting ${path}`);
        _backupFile(path);
        fs.rmSync(path);
        break;
    default:
        throw new Error("Invalid conflict mode: " + mode);
    }
}

function _backupFile(path) 
{
    const backup_path = `${path}.backup`;
    if (fs.existsSync(backup_path)) 
    {
        throw new Error(`Backup file already exists: ${backup_path}`);
    }
    fs.copyFileSync(path, backup_path);
}

function mkdirSafe(name, overwrite_conflict_mode = null) 
{
    if (fs.existsSync(name)) 
    {
        conflict(name, conflict_mode ?? overwrite_conflict_mode);
    }
    fs.mkdirSync(name);
}

function copyTemplate(from, to, overwrite_conflict_mode = null) 
{
    if (!fs.existsSync(from)) 
    {
        console.log(`Template ${from} does not exist`);
        throw new Error(`${from} does not exist`);
    }
    if (fs.existsSync(to)) 
    {
        console.log(`${to} already exists`);
        conflict(to, conflict_mode ?? overwrite_conflict_mode);
    }
    const template = fs.readFileSync(from, "utf8");
    fs.writeFileSync(to, template);
}

function hydrateFile(path, options = {}) 
{
    let file = fs.readFileSync(path, "utf8");
    if (options.entity_name) 
    {
        file = file.replaceAll("__KAINDA__MODEL__UPPERCASE__", options.entity_name.charAt(0).toUpperCase() + options.entity_name.slice(1));
        file = file.replaceAll("__KAINDA__MODEL__LOWERCASE__", options.entity_name.toLowerCase());
        file = file.replaceAll("__KAINDA__MODEL__URL__", options.entity_name.toLowerCase().substring(0, 1) + options.entity_name.substring(1));
    }
    else if (options.project_name) 
    {
        file = file.replaceAll("__KAINDA__PROJECT__NAME__", options.project_name);
    }
    fs.writeFileSync(path, file);
}

async function getFilesRecursively(directoryPath, fileExtension, fileList = []) 
{
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) 
    {
        const filePath = path.join(directoryPath, file);
        const fileStat = await fs.promises.stat(filePath);

        if (fileStat.isDirectory()) 
        {
            await getFilesRecursively(filePath, fileExtension, fileList);
        }
        else if (filePath.endsWith(fileExtension)) 
        {
            fileList.push(filePath);
        }
    }

    return fileList;
}

module.exports = {
    mkdirSafe,
    copyTemplate,
    hydrateFile,
    _backupFile,
    conflict,
    getFilesRecursively,
    conflict_mode
};