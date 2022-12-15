const fs = require("fs");
const path = require("path");

function getFiles(searchPath = "./app/", extension = "model.js") {

    if (!searchPath.endsWith("/")) searchPath += "/";

    const entries = fs.readdirSync(searchPath, { withFileTypes: true });

    const files = entries
        .filter((file) => !file.isDirectory() && file.name !== extension && file.name.includes(extension))
        .map((file) => ({ ...file, path: searchPath + file.name }));

    const folders = entries.filter((folder) => folder.isDirectory());

    for (const folder of folders)
        files.push(...getFiles(`${searchPath}${folder.name}/`, extension));

    return files;
}

function exportFiles (searchPath, extension) {
    let files = getFiles(searchPath, extension);
    let exportable = {};
    for (let i = 0; i < files.length; i++) {
        let aux = requireIfExists(files[i].path);
        if (aux) {
            exportable = { ...exportable, ...aux };
        }
    }
    return exportable;
}

function __exportModels() {
    
    let models = {};
    let files = getFiles().map((file) => {
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        return file;
    });

    for (let i = 0; i < files.length; i++) {
        let model = files[i].name.substring(0, files[i].name.indexOf("."));
        let pathPreModel = files[i].path.substring(0, files[i].path.lastIndexOf("/" + model));
        let requirePath = pathPreModel.substring(2) + "/" + model;
        let modelClass = require("@/" + requirePath);
        models[modelClass.modelName ?? model.charAt(0).toUpperCase() + model.slice(1)] = modelClass;
    }

    return models;
}

function getModels() {
    return __exportModels();
}

function getModel(model) {
    return __exportModels()[model];
}

function requireIfExists(file_path) {
    try {
        const module = require(file_path);
        return module;
    }
    catch (e) {
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
            //console.log("Can't load module: " + file_path);
        } else {
            throw e;
        }
    }
    return null;
}

const KaindaUtils = {
    getFiles,
    getModels,
    getModel,
    exportFiles,
    requireIfExists
};

module.exports = KaindaUtils;