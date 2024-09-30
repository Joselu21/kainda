const fs = require("fs");
const path = require("path");
const config = require("config");
const swaggerUi = require("swagger-ui-express");
const OpenAPI3Generator = require("./openApi3");
const LogService = require("@services/log.service");

class DocumentationService
{
    static DEFAULT_FOLDER = "docs";
    static DEFAULT_EXPRESS_ROUTE = "/doc";
    static DEFAULT_FILE_NAME = "current.json";

    static #hasDocs = config.has("documentation");
    static #currentFolder = DocumentationService.#hasDocs ? (config.get("documentation.folder") ?? "docs") : null;
    static #currentExpressRoute = DocumentationService.#hasDocs ? (config.get("documentation.expressRoute") ?? "/doc") : null;
    static #currentFileName = DocumentationService.#hasDocs ? (config.get("documentation.currentFile") ?? "current.json") : null;

    /**
     * Generate the documentation file
     */
    static generateDocumentation ()
    {
        let docFile = process.argv.filter(arg => arg.startsWith("--docFile="))[ 0 ];
        const overwrite = process.argv.filter(arg => arg.startsWith("--overwrite"))[ 0 ];

        const content = OpenAPI3Generator.generateOpenAPI();

        if (!docFile)
        {
            docFile = `${ content.info.title }-${ content.info.version }.json`;
        }
        else 
        {
            docFile = docFile.split("=")[ 1 ];
        }

        if (!docFile.endsWith(".json") && docFile.includes("."))
        {
            LogService.ServerLogger.error("The provided documentation file name must be a JSON file.");
            return;
        }

        const filePath = path.join(process.cwd(), DocumentationService.#currentFolder, docFile);
        if (fs.existsSync(filePath) && !overwrite)
        {
            docFile = docFile.replace(".json", `-${ (new Date()).toISOString().split("T")[ 0 ] }.json`);
        }

        fs.writeFileSync(path.join(process.cwd(), DocumentationService.#currentFolder, docFile), JSON.stringify(content, null, 4));
    }

    /**
     * Add an express route to serve the documentation
     * @param {Object} app
     */
    static addDocumentationRouteToExpress (app, expressRoute = DocumentationService.#currentExpressRoute, filePath = null)
    {
        let fullPath = path.join(process.cwd(), DocumentationService.#currentFolder, filePath ?? DocumentationService.#currentFileName); 
        if(!fs.existsSync(fullPath))
        {
            if(!config.has("documentation"))
            {
                return;
            }
            this.generateOpenAPI(DocumentationService.#currentFileName, true);
        }
        let content = require(fullPath);
        if (!content) 
        {
            this.generateOpenAPI(DocumentationService.#currentFileName, true);
            content = require(fullPath);
        }
        app.use(
            expressRoute,
            swaggerUi.serve,
        );
        app.get(
            expressRoute,
            swaggerUi.setup(content)
        );
    }

    /**
     * Generate the OpenAPI3 documentation file
     * @param {String} fileName The name of the file to generate
     * @param {Boolean} overwrite If the file exists, overwrite it
     * @returns {void}
     */
    static generateOpenAPI (fileName = DocumentationService.#currentFileName, overwrite = true) 
    {
        let content = OpenAPI3Generator.generateOpenAPI();
        content = JSON.stringify({ ...content }, null, 4);

        // If the folder does not exist, create it
        const basePath = path.join(process.cwd(), DocumentationService.#currentFolder);
        if (!fs.existsSync(basePath))
        {
            fs.mkdirSync(basePath);
        }

        // If the file exists and we do not want to overwrite it, create a new file
        if (fs.existsSync(basePath) && !overwrite)
        {
            fileName = `api-${ (new Date()).getTime() }.json`;
        }

        fs.writeFileSync(path.join(basePath, fileName), content);
    }

}


module.exports = DocumentationService;