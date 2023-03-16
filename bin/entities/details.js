const listEntities = require('./list');
const { getFilesRecursively } = require('../utils/files.utils');
const path = require('path');
const fs = require('fs');
const prompt = require('prompt');
const chalk = require('chalk');

function extractModuleExports(file) {
    // Strip everything before module.exports
    return file.match(/module\.exports\s*=\s*{[\s\S]*/s)[0].match(/\{.*\}/s)[0];
}

function extractParameters(schema) {
    // This function iterates character by character counting the number of open (+1) and close brackets (-1) until it finds the first comma outside of brackets and returns the string before that comma and the rest of the string
    let brackets = 0;
    let schemaProcessed = '';
    for (let i = 0; i < schema.length; i++) {
        if (schema[i] === '{') {
            brackets++;
        } else if (schema[i] === '}') {
            brackets--;
        } else if (schema[i] === ',' && brackets === 0) {
            break;
        }
        schemaProcessed += schema[i];
    }
    const options = schema.substring(schema.length + 1, schema.lastIndexOf('}') + 1).trim();
    return { schemaProcessed, options };
}

function preParser(schema) {
    // This function iterates line by line, checking for keys or values and substituting them with the encapsulated value between quotes
    // Split by new line
    let lines = schema.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
        // Check if the line contains a key
        const key = lines[i].match(/\w+\s*:/)?.[0];
        if (key) {
            lines[i] = lines[i].replace(key, `"${key.substring(0, key.length - 1).trim()}":`);
            // Check if the line contains a value
            const value = lines[i].match(/:\s*[\w.]+/)?.[0];
            if (value && !value.includes('true') && !value.includes('false')) {
                lines[i] = lines[i].replace(value, `: "${value.substring(2).trim()}"`);
            }
        }
    }
    return lines.join('\r\n');
}

function extractModelSchemaMongoose(file) {
    // Strip everything before module.exports
    let mongooseSchema = file.match(/mongoose\.Schema\s*\(\s*{[\s\S]*/s)[0].match(/^[^;]*/gm)[0];
    mongooseSchema = mongooseSchema.substring(mongooseSchema.indexOf('{')).replace(/^\s*\/\/.*/gm, '');
    let { schemaProcessed, options } = extractParameters(mongooseSchema);
    schema = preParser(schemaProcessed);
    let shemaParsed;
    while(schema.length > 0) {
        try {
            shemaParsed = JSON.parse(schema);
            break;
        } catch (error) {
            // If the schema is not valid, it means that there is a comma inside a string, so we need to remove it
            const commaIndex = schema.lastIndexOf(',');
            schema = schema.substring(0, commaIndex) + schema.substring(commaIndex + 1);
        }
    }
    return JSON.parse(schema);
}

function extractModelSchemaSequelize(file) {
    // Strip everything before module.exports
    const name = entity.entityName[0].toUpperCase() + entity.entityName.substring(1)
    return file.match(`/${name}\.init\s*\(\s*{[\s\S]*/s`)[0].match(/\{.*\}/s)[0];
}

async function getEntitySchema(entity) {
    let file, schema;
    try {
        file = fs.readFileSync(entity.entity, 'utf8');
        if (entity.entityType === 'mongoose') {
            schema = extractModelSchemaMongoose(file);
        } else if (entity.entityType === 'sequelize') {
            schema = extractModelSchemaSequelize(file);
        }
        return schema;
    } catch (error) {
        console.log("Error parsing the file, it is probably due to a JSON incompatible comma in the defined schema");
        console.log(error);
    }
}


async function getControllers(entity) {
    const controllerDirPath = path.join(path.dirname(entity), '../../');
    const controllers = await getFilesRecursively(controllerDirPath, 'controller.js');
    // Iterate over the exported object
    const entityControllers = {}
    for (let controller of controllers) {
        let file;
        let returnable = [];
        try {
            // Read the file 
            file = fs.readFileSync(controller, 'utf8');
            // Strip everything before module.exports
            file = extractModuleExports(file).substring(1, file.match(/\{.*\}/s)[0].length - 2).trim();
            for (let controllerFunction of file.split(',')) {
                controllerFunction = controllerFunction.trim();
                if (['', '{', '}', ' '].includes(controllerFunction)) continue;
                const controllerName = controllerFunction.match(/[\w.]+/)?.[0];
                returnable.push(controllerName);
            }
        } catch (error) {
            console.log(error);
            returnable.push({ error: error.message, file: file });
        }
        entityControllers[path.basename(controller, '.controller.js')] = returnable.join(', ');
    }

    return entityControllers;
}

async function getEntityRoutes(entity) {
    const routeDirPath = path.join(path.dirname(entity), '../../');
    const routes = await getFilesRecursively(routeDirPath, 'routes.js');
    const entityRoutesRaw = routes.map(route => {
        let file;
        let returnable = [];
        try {
            // Read the file 
            file = fs.readFileSync(route, 'utf8');
            // Strip everything before module.exports
            file = extractModuleExports(file);
            const routes = file.matchAll(/app\.\w+\s*\([\s\S]*?\);/g);
            // Iterate over the exported object
            for (let route of routes) {
                route = route[0];
                const routeMethod = route.match(/app\.\w+/)[0]
                    .replace('app.', '')
                    .trim();
                const routeString = route.match(/"[\s\S]*?"/)[0]
                    .replace(/"/g, '');
                const middlewaresArray = route.match(/\[.*\]/s)[0]
                    .substring(1, route.match(/\[.*\]/s)[0].length - 1)
                    .split(',')
                    .map(middleware => middleware.trim())
                    .filter(middleware => middleware !== '')
                    .join(', ')
                    .replace(/Models\.[^.]*\.Middlewares\./g, '');
                const controllerName = route.match(/,[^,]*$/)[0]
                    .substring(1)
                    .substring(0, route.match(/,[^,]*$/)[0].length - 3)
                    .trim()
                    .replace(/Models\.[^.]*\.Controller\./, '');
                returnable.push({ routeMethod, routeString, middlewaresArray, controllerName });
            }
        } catch (error) {
            console.log(error);
            returnable.push({ error: error.message, route: route, file: file })
        }
        return returnable;
    });
    const entityRoutes = [];
    for (let i = 0; i < entityRoutesRaw.length; i++) {
        let current = entityRoutesRaw[i];
        if (Array.isArray(current)) {
            entityRoutes.push(...current);
        } else {
            entityRoutes.push(current);
        }
    }
    return entityRoutes.reduce(
        (acc, { routeString, routeMethod, ...rest }) => {
            const route = `[${routeMethod.toUpperCase()}: ${routeString}]`;
            rest.isSecured = rest.middlewaresArray.includes('tokenValid');
            if (!rest.isSecured) {
                rest.isSecured = (
                    rest.middlewaresArray.includes('secure')
                    || rest.middlewaresArray.includes('admin')
                    || rest.middlewaresArray.includes('token'))
                    ?
                    'Maybe'
                    :
                    'Probably not';
            }
            acc[route] = rest;
            return acc;
        },
        {}
    );
}

async function whichEntity() {
    const entityData = await listEntities();
    var schema = {
        properties: {
            option: {
                description: chalk.yellow('Option'),
                type: 'number',
                required: true,
                message: 'Please enter a valid option'
            }
        }
    };

    prompt.start();
    prompt.message = null;
    const choice = await prompt.get(schema);
    return entityData[choice.option];
}

async function entityDetails() {
    const entity = await whichEntity();
    console.log(chalk.bold('Entity Details'));
    console.log(chalk.blue('Name: ') + entity.entityName[0].toUpperCase() + entity.entityName.substring(1));
    console.log(chalk.blue('Path: ') + entity.entity);
    console.log(chalk.blue('Type: ') + entity.entityType);

    console.log(chalk.blue('Schema:'));
    const structure = await getEntitySchema(entity);
    if (structure) console.table(structure);

    console.log(chalk.blue('Controllers:'));
    const controllers = await getControllers(entity.entity);
    if (controllers) console.table(controllers);

    const routes = await getEntityRoutes(entity.entity);
    console.log(chalk.blue('Routes:'));
    if (routes) console.table(routes);
}

module.exports = entityDetails;