const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

async function getFilesRecursively(directoryPath, fileExtension, fileList = []) {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const fileStat = await fs.promises.stat(filePath);

        if (fileStat.isDirectory()) {
            await getFilesRecursively(filePath, fileExtension, fileList);
        } else if (filePath.endsWith(fileExtension)) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

function getEntityType(entity) {
    const fileContent = fs.readFileSync(entity, 'utf-8');
    return fileContent.includes("mongoose") ? "mongoose" : "sequelize";
}

function getEntityRoutes(entity) {
    const routeDirPath = path.join(path.dirname(entity), '../../');
    const routes = getFilesRecursively(routeDirPath, 'routes.js');
    const entityRoutes = routes.filter(route => {

    });
}

async function listEntities() {
    const entities = await getFilesRecursively('./app/entities', 'model.js');
    const entityData = entities.map(entity => {
        const entityName = path.basename(entity, '.model.js');
        const entityType = getEntityType(entity);
        return { entity, entityName, entityType };
    });


    console.clear();

    console.log(chalk.bold("Entities"));
    console.log(chalk.bold("========"));
    console.table(entityData);
}

module.exports = listEntities;