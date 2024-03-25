const path = require("path");
const { getFiles } = require("kainda");

class OpenAPI3Generator
{
    static PREGENERATED = {
        index: "./json/index.json",
        tags: "./json/tags.json",
        components: "./json/components.json",
        paths: "./json/paths.json"
    };

    /**
     * Generate the OpenAPI3 documentation file
     * @returns {Object} The OpenAPI3 documentation file content.
     */
    static generateOpenAPI () 
    {
        const index = this.#generateIndex(OpenAPI3Generator.PREGENERATED.index);
        const tags = this.#generateTags(OpenAPI3Generator.PREGENERATED.tags);
        const paths = this.#generatePaths(OpenAPI3Generator.PREGENERATED.paths);
        const components = this.#generateComponents(OpenAPI3Generator.PREGENERATED.components);

        const content = {
            ...index,
            ...tags,
            components,
            paths,
        };

        return content;
    }


    /**
     * Generates the index object.
     * @param {String} filePath The file with the pregenerated index content.
     * @returns {Object} The index object to write to file.
     * @private
     */
    static #generateIndex (filePath = OpenAPI3Generator.PREGENERATED.index)
    {
        let index = require(filePath);
        const packageJson = require(path.join(process.cwd(), "package.json"));

        index.info.version = packageJson.version;
        index.info.title = packageJson.name;
        index.info.description = packageJson.description;

        return index;
    }

    /**
     * Generates the tags object.
     * @param {String} filePath The file with the pregenerated tags content.
     * @returns {Object} The tags object to write to file.
     * @private
     */
    static #generateTags (filePath = OpenAPI3Generator.PREGENERATED.tags)
    {
        return require(filePath);
    }

    /**
     * Generates the tags object.
     * @param {String} filePath The file with the pregenerated tags content.
     * @returns {Object} The tags object to write to file.
     * @private
     */
    static #generatePaths (filePath = OpenAPI3Generator.PREGENERATED.paths)
    {
        const filePaths = getFiles(path.join(process.cwd(), "/app/entities/"), ".json").filter(filePath => 
        {
            return filePath.name.indexOf("routes.json") > -1;
        });
        let pregeneratedPaths = require(filePath);
        let paths = pregeneratedPaths.paths;
        for (let filePath of filePaths) 
        {
            const modelPaths = require(filePath.path);
            const processedPaths = {};
            for (let path in modelPaths.paths) 
            {
                // Exclude the path methods that are marked as private or deactivated
                const pathMethods = {};
                for (let method in modelPaths.paths[ path ]) 
                {
                    if (!modelPaths.paths[ path ][ method ].private && !modelPaths.paths[ path ][ method ].deactivated) 
                    {
                        pathMethods[ method ] = modelPaths.paths[ path ][ method ];
                    }
                }
                processedPaths[ path ] = pathMethods;
            }
            paths = {
                ...paths,
                ...processedPaths
            };
        }

        return paths;
    }

    /**
     * Generates the components object.
     * @param {String} filePath The file with the pregenerated components content.
     * @returns {Object} The components object to write to file.
     * @private
     */
    static #generateComponents (filePath = OpenAPI3Generator.PREGENERATED.components)
    {
        const filePaths = getFiles(path.join(process.cwd(), "/app/entities/"), ".json").filter(filePath => 
        {
            return filePath.name.indexOf("model.json") > -1;
        });
        let pregeneratedComponents = require(filePath);
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

        return components;

    }
}

module.exports = OpenAPI3Generator;