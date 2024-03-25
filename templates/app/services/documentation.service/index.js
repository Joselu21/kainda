const fs = require("fs");
const path = require("path");
const config = require("config");
const { chalk } = require("kainda");
const swaggerUi = require("swagger-ui-express");
const OpenAPI3Generator = require("./openApi3");

class DocumentationService
{
    static DEFAULT_FOLDER = config.get("documentation.folder") ?? "docs";
    static DEFAULT_EXPRESS_ROUTE = config.get("documentation.expressRoute") ?? "/doc";
    static DEFAULT_FILE_NAME = config.get("documentation.currentFile") ?? "current.json";

    /**
     * Generate the documentation file
     */
    static generateDocumentation ()
    {
        let docFile = process.argv.filter(arg => arg.startsWith("--docFile="))[ 0 ];
        const overwrite = process.argv.filter(arg => arg.startsWith("--overwrite"))[ 0 ];

        let content = OpenAPI3Generator.generateOpenAPI();

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
            console.log(chalk.red("The provided documentation file name must be a JSON file."));
            return;
        }

        const filePath = path.join(process.cwd(), DocumentationService.DEFAULT_FOLDER, docFile);
        if (fs.existsSync(filePath) && !overwrite)
        {
            docFile = docFile.replace(".json", `-${ (new Date()).toISOString().split("T")[ 0 ] }.json`);
        }

        fs.writeFileSync(path.join(process.cwd(), DocumentationService.DEFAULT_FOLDER, docFile), JSON.stringify(content, null, 4));
    }

    /**
     * Add an express route to serve the documentation
     * @param {Object} app
     */
    static addDocumentationRouteToExpress (app, expressRoute = DocumentationService.DEFAULT_EXPRESS_ROUTE, filePath = null)
    {
        let content = filePath ? require(filePath) : null;
        if (!content) 
        {
            this.generateOpenAPI(DocumentationService.DEFAULT_FILE_NAME, true);
            content = require(path.join(process.cwd(), DocumentationService.DEFAULT_FOLDER, DocumentationService.DEFAULT_FILE_NAME));
        }
        app.use(expressRoute, swaggerUi.serve, swaggerUi.setup(content));
    }

    /**
     * Generate the OpenAPI3 documentation file
     * @param {String} fileName The name of the file to generate
     * @param {Boolean} overwrite If the file exists, overwrite it
     * @returns {void}
     */
    static generateOpenAPI (fileName = DocumentationService.DEFAULT_FILE_NAME, overwrite = true) 
    {
        let content = OpenAPI3Generator.generateOpenAPI();
        content = JSON.stringify({ ...content }, null, 4);

        // If the folder does not exist, create it
        const basePath = path.join(process.cwd(), DocumentationService.DEFAULT_FOLDER);
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