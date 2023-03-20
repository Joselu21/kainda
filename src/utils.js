const fs = require("fs");

/**
 * Returns an array of file objects with the specified extension found in the given directory and its subdirectories.
 * @param {string} [searchPath="./app/"] - The directory to search in.
 * @param {string} [extension="model.js"] - The file extension to look for.
 * @returns {Array<Object>} An array of file objects with the name, size, and path properties.
 */
function getFiles(searchPath = "./app/", extension = "model.js") {

    if (!searchPath.endsWith("/")) searchPath += "/";

    const files = [];
    const entries = fs.readdirSync(searchPath, { withFileTypes: true });

    for (const entry of entries) {
        if (entry.isDirectory()) {
            files.push(...getFiles(`${searchPath}${entry.name}/`, extension));
        } else if (entry.name.endsWith(extension) && entry.name !== extension) {
            files.push({
                ...entry,
                path: `${searchPath}${entry.name}`
            });
        }
    }

    return files;
}

/**
 * Export files from a directory as an object.
 * @param {string} searchPath - The path to the directory to search in.
 * @param {string} extension - The file extension to look for.
 * @returns {object} - An object containing the exported modules.
 */
function exportFiles(searchPath, extension) {
    let files = getFiles(searchPath, extension);
    return files.reduce((exportable, file) => {
        let aux = requireIfExists(file.path);
        if (aux && Object.keys(aux).length > 0) {
            return { ...exportable, ...aux };
        } else if (aux && typeof aux === "function") {
            return {
                ...exportable,
                [file.name.substring(0, file.name.indexOf("."))]: aux
            };
        }
    }, {});
}

/**
 * Returns an object containing all the model classes found in the application.
 * @private
 * @returns {Object} An object containing all the model classes found in the application.
 */
function __exportModels() {

    let models = {};
    let files = getFiles().map((file) => {
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        file.path = file.path.substring(0, file.path.lastIndexOf("/"));
        return file;
    });

    for (const file of files) {
        const model = file.name.substring(0, file.name.indexOf("."));
        const pathPreModel = file.path.substring(0, file.path.lastIndexOf(`/${model}`));
        const requirePath = `${pathPreModel.substring(2)}/${model}`;
        const modelClass = require(`@/${requirePath}`);
        models[modelClass.modelName ?? model.charAt(0).toUpperCase() + model.slice(1)] = modelClass;
    }

    return models;
}

/**
 * Returns all exported models.
 * @returns {Object} Object containing all exported models.
 */
function getModels() {
    return __exportModels();
}

/**
 * Returns the specified model.
 * @param {string} model - The name of the model to retrieve.
 * @returns {*} The specified model.
 */
function getModel(model) {
    return __exportModels()[model];
}

/**
 * Tries to require a module and returns it if it exists.
 * @param {string} file_path - The path of the module to require.
 * @returns {*} - The required module, or null if it doesn't exist.
 * @throws {Error} - If an error other than "MODULE_NOT_FOUND" occurs.
 */
function requireIfExists(file_path) {
    try {
        return require(file_path);
    }
    catch (error) {
        if (error.code !== "MODULE_NOT_FOUND") {
            throw error;
        }
    }
    return null;
}

/**
 * Exports a route object. Calculates if the route is secure or not.
 * @param {Object} r - The route object to export.
 * @param {string} [secureMiddleware="tokenValid"] - The name of the middleware that checks if the request is secure.
 * @returns {Object} - The exported route object.
 */
function exportRoute(r, secureMiddleware = "tokenValid") {
    let exportable = {};
    if (r.route && r.route.path) {
        if (r.route.stack) {
            if (r.route.stack.length > 0) {
                for (let i = 0; i < r.route.stack.length; i++) {
                    if (r.route.stack[i].name === secureMiddleware) {
                        exportable.secure = true;
                    }
                }
            }
        }
        exportable.path = r.route.path;
        exportable.methods = Object.keys(r.route.methods);
    }
    return exportable === {} ? null : exportable;
}

const KaindaUtils = {
    getFiles,
    getModels,
    getModel,
    exportFiles,
    requireIfExists,
    exportRoute
};

module.exports = KaindaUtils;