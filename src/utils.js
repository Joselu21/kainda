const fs = require("fs");
const path = require("path");

function _mkdir(name) {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    } else {
        throw new Error(`${name} directory already exists`);
    }
}

function _copyTemplate(from, to) {
    if (!fs.existsSync(from)) {
        throw new Error(`${from} does not exist`);
    }
    if (fs.existsSync(to)) {
        throw new Error(`${to} already exists`);
    }
    const template = fs.readFileSync(from, 'utf8');
    // Create new file
    fs.writeFileSync(to, template);

}

function _reformatFile(path, options = {}) {
    let file = fs.readFileSync(path, 'utf8');
    file = file.replaceAll("%%$MODEL_NAME_UPPERCASE$%%", options.entity_name.charAt(0).toUpperCase() + options.entity_name.slice(1));
    file = file.replaceAll("%%$MODEL_NAME_LOWERCASE$%%", options.entity_name.toLowerCase());
    file = file.replaceAll("%%$PROJECT_NAME$%%", options.project_name);
    fs.writeFileSync(path, file);
}

function getFiles(path = "./app/", extension = "model.js") {
    const entries = fs.readdirSync(path, { withFileTypes: true });

    const files = entries
        .filter((file) => !file.isDirectory() && file.name !== extension && file.name.includes(extension))
        .map((file) => ({ ...file, path: path + file.name }));

    const folders = entries.filter((folder) => folder.isDirectory());

    for (const folder of folders)
        files.push(...getFiles(`${path}${folder.name}/`));

    return files;
}

function __exportModels() {
    
    let models = {};
    let files = getFiles().map((file) => {
        file.path = file.path.replace(/\.js$/, "").substring(0, file.path.length);
        return file;
    });

    for (let i = 0; i < files.length; i++) {
        let model = files[i].name.substring(0, files[i].name.indexOf("."));
        models[model.charAt(0).toUpperCase() + model.slice(1)] = require(path.join(process.cwd(), files[i].path));
    }

    return models;
}

function getModels() {
    return __exportModels();
}

function getModel(model) {
    return __exportModels()[model];
}

function requireIfExists(path) {
    try {
        const module = require(path);
        return module;
    }
    catch (e) {
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
            console.log("Can't load module: " + path);
        else
            throw e;
    }
    return null;
}

const KaindaUtils = {
    _mkdir,
    _copyTemplate,
    _reformatFile,
    getFiles,
    getModels,
    getModel,
    requireIfExists
};

module.exports = KaindaUtils;