const { getFiles } = require("kainda");
const fs = require("fs");
const path = require("path");

/**
 * Generates the tags object.
 * @returns {void} Nothing.
 * @private
 */
function generatePaths() 
{

    const filePaths = getFiles(path.join(__dirname, "./../app/entities"), ".json").filter(filePath => 
    {
        return filePath.name.indexOf("routes.json") > -1;
    });
    let pregeneratedPaths = require("./src/paths.json");
    let paths = pregeneratedPaths.paths;
    for (let filePath of filePaths) 
    {
        const modelPaths = require(filePath.path);
        const processedPaths = {};
        for (let path in modelPaths.paths) 
        {
            // Exclude the path methods that are marked as private or deactivated
            const pathMethods = {};
            for (let method in modelPaths.paths[path]) 
            {
                if (!modelPaths.paths[path][method].private && !modelPaths.paths[path][method].deactivated) 
                {
                    pathMethods[method] = modelPaths.paths[path][method];
                }
            }
            processedPaths[path] = pathMethods;
        }
        paths = {
            ...paths,
            ...processedPaths
        };
    }

    if (!fs.existsSync(path.join(__dirname, "tmp"))) 
    {
        fs.mkdirSync(path.join(__dirname, "tmp"));
    }
    fs.writeFileSync(path.join(__dirname, "tmp/paths.json"), JSON.stringify({ paths }, null, 4));

}

/**
 * Generates the components object.
 * @returns {void} Nothing.
 * @private
 */
function generateComponents() 
{

    const filePaths = getFiles(path.join(__dirname, "./../app/entities"), ".json").filter(filePath => 
    {
        return filePath.name.indexOf("model.json") > -1;
    });
    let pregeneratedComponents = require("./src/components.json");
    let components = pregeneratedComponents.components;
    for (let filePath of filePaths) 
    {
        const modelComponents = require(filePath.path);
        components = {
            schemas: {
                ...components?.schemas,
                ...modelComponents?.components?.schemas
            },
            parameters: {
                ...components?.parameters,
                ...modelComponents?.components?.parameters
            },
            responses: {
                ...components?.responses,
                ...modelComponents?.components?.responses
            },
            securitySchemes: {
                ...components?.securitySchemes,
                ...modelComponents?.components?.securitySchemes
            },
            examples: {
                ...components?.examples,
                ...modelComponents?.components?.examples
            },
            requestBodies: {
                ...components?.requestBodies,
                ...modelComponents?.components?.requestBodies
            },
            headers: {
                ...components?.headers,
                ...modelComponents?.components?.headers
            },
            links: {
                ...components?.links,
                ...modelComponents?.components?.links
            },
            callbacks: {
                ...components?.callbacks,
                ...modelComponents?.components?.callbacks
            },
        };
    }

    if (!fs.existsSync(path.join(__dirname, "tmp"))) 
    {
        fs.mkdirSync(path.join(__dirname, "tmp"));
    }
    fs.writeFileSync(path.join(__dirname, "tmp/components.json"), JSON.stringify({ components }, null, 4));

}

/**
 * Generate the final OpenAPI3 documentation file
 * @returns {void}
 * @private
 */
function generateFinalFile() 
{

    const index = require("./src/index.json");
    const tags = require("./src/tags.json");
    const paths = require("./tmp/paths.json");
    const components = require("./tmp/components.json");

    const API = require("./openapi.json");

    const fileName = Object.keys(API).length !== 0 ? `./api-${Date.now().toString()}.json` : "./openapi.json";
    fs.writeFileSync(path.join(__dirname, fileName), JSON.stringify({
        ...index,
        ...tags,
        ...components,
        ...paths,
    }, null, 4));

    // Delete tmp folder and content
    fs.rmSync(path.join(__dirname, "tmp"), { recursive: true, force: true });

}

/**
 * Generate the OpenAPI3 documentation file
 * @param {object} options - Options to generate the documentation
 * @param {boolean} options.paths - Generate the paths
 * @param {boolean} options.components - Generate the components
 * @returns {void}
 */
function generateDoc(options = {}) 
{
    if (options.paths) 
    {
        generatePaths();
    }
    if (options.components) 
    {
        generateComponents();
    }
    generateFinalFile();
}

// If we are in the documentation environment, we generate the documentation.
// This is done by executing the script "npm run documentation" in the package.json file
if (process.env.NODE_ENV === "documentation") 
{
    generateDoc({
        paths: true,
        components: true
    });
}

module.exports = generateDoc;
