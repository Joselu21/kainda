const fs = require("fs");
const path = require("path");

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
    requireIfExists
};

module.exports = KaindaUtils;