const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { getFilesRecursively } = require("../utils/files.utils");

function getEntityType(entity) 
{
    const fileContent = fs.readFileSync(entity, "utf-8");
    return fileContent.includes("mongoose") ? "mongoose" : "sequelize";
}

async function listEntities() 
{
    const entities = await getFilesRecursively("./app/entities", "model.js");
    const entityData = entities.map(entity => 
    {
        const entityName = path.basename(entity, ".model.js");
        const entityType = getEntityType(entity);
        return { entity, entityName, entityType };
    });


    console.clear();

    console.log(chalk.bold("Entities"));
    console.log(chalk.bold("========"));
    console.table(entityData);

    return entityData;
}

module.exports = listEntities;