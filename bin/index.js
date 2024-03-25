#!/usr/bin/env node
const prompt = require("prompt");
const chalk = require("chalk");
const createEntity = require("./entities/create");
const listEntities = require("./entities/list");
const createProject = require("./project/init");
const listProjectInfo = require("./project/list");
const { extractArgument } = require("./utils/args.utils");
const entityDetails = require("./entities/details");

try
{
    loop();
} 
catch (error)
{
    console.log(chalk.green("Bye!"));
}

async function loop () 
{

    let exitCondition = false;
    let enterMode = process.argv[ 2 ];
    if (enterMode === "project") 
    {
        console.log("enterManageProjects");
        await manageProjects();
        throw new Error();
    }
    else if (enterMode === "entity") 
    {
        await manageEntities();
        throw new Error();
    }
    else if (enterMode) 
    {
        console.log(chalk.red("Invalid argument " + enterMode));
    }

    do 
    {
        //console.clear();
        console.log(chalk.green("Welcome to the Kainda CLI v" + require("../package.json").version));
        console.log(chalk.yellow("Please choose an option:"));
        console.log(chalk.blue("1. Manage projects"));
        console.log(chalk.blue("2. Manage entities"));
        console.log(chalk.blue("3. Exit"));

        var schema = {
            properties: {
                option: {
                    description: chalk.yellow("Option"),
                    type: "number",
                    required: true,
                    message: "Please enter a valid option"
                }
            }
        };

        prompt.start();
        prompt.message = null;
        const choice = await prompt.get(schema);

        switch (choice.option) 
        {
            case "1":
            case 1:
                await manageProjects();
                break;
            case "2":
            case 2:
                await manageEntities();
                break;
            case "3":
            case 3:
                console.log(chalk.green("Bye!"));
                exitCondition = true;
                break;
            default:
                console.log(chalk.red("Invalid option"));
                break;
        }

    } while (!exitCondition);
}

async function manageProjects (action = null) 
{

    action = action ?? extractArgument("project");
    if (action) 
    {
        switch (action) 
        {
            case "create":
            case "init":
                console.log("createProject");
                await createProject();
                break;
            default:
                console.log(chalk.red("Invalid project action: " + action));
                break;
        }
        throw new Error();
    }

    console.clear();
    console.log(chalk.green("Welcome to the Kainda CLI v" + require("../package.json").version));
    console.log(chalk.yellow("Please choose an option:"));
    console.log(chalk.blue("1. Create a new project"));
    console.log(chalk.blue("2. List project info"));
    console.log(chalk.blue("3. Update kainda version"));
    console.log(chalk.blue("4. Go back"));
    console.log(chalk.blue("5. Exit"));

    var schema = {
        properties: {
            option: {
                description: chalk.yellow("Option"),
                type: "number",
                required: true,
                message: "Please enter a valid option"
            }
        }
    };

    prompt.start();
    prompt.message = null;
    const choice = await prompt.get(schema);

    switch (choice.option) 
    {
        case "1":
        case 1:
            await createProject();
            break;
        case "2":
        case 2:
            await listProjectInfo();
            break;
        case "3":
        case 3:
            break;
        case "4":
        case 4:
            break;
        case "5":
        case 5:
            throw new Error();
        default:
            console.log(chalk.red("Invalid option"));
            break;
    }
}

async function manageEntities (action = null) 
{

    action = action ?? extractArgument("entity");
    let name = extractArgument("create");
    if (action) 
    {
        switch (action) 
        {
            case "create":
                await createEntity(name);
                break;
            default:
                console.log(chalk.red("Invalid entity action: " + action));
                break;
        }
        throw new Error();
    }

    console.clear();
    console.log(chalk.green("Welcome to the Kainda CLI v" + require("../package.json").version));
    console.log(chalk.yellow("Please choose an option:"));
    console.log(chalk.blue("1. Create a new entity"));
    console.log(chalk.blue("2. List entities"));
    console.log(chalk.blue("3. Entity details"));
    console.log(chalk.blue("4. Go back"));
    console.log(chalk.blue("5. Exit"));

    var schema = {
        properties: {
            option: {
                description: chalk.yellow("Option"),
                type: "number",
                required: true,
                message: "Please enter a valid option"
            }
        }
    };

    prompt.start();
    prompt.message = null;
    const choice = await prompt.get(schema);

    switch (choice.option) 
    {
        case "1":
        case 1:
            await createEntity();
            break;
        case "2":
        case 2:
            await listEntities();
            break;
        case "3":
        case 3:
            await entityDetails();
            break;
        case "4":
        case 4:
            break;
        case "5":
        case 5:
            throw new Error();
        default:
            console.log(chalk.red("Invalid option"));
            break;
    }
}

