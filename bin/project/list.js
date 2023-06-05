const fs = require("fs");
const chalk = require("chalk");
const path = require("path");

function __getInstalledModules(packageJson, packageLockJson) 
{
    const installedModules = {};
    for (let [moduleName, moduleVersion] of Object.entries(packageJson.dependencies)) 
    {
        installedModules[moduleName] = {
            expected: moduleVersion
        };
        const packageLockModule = packageLockJson.packages["node_modules/" + moduleName];
        installedModules[moduleName].actual = packageLockModule.version ?? "Not Found";
        installedModules[moduleName].minimumNodeVersion = packageLockModule.engines?.node ?? "Not Found";
    }
    return installedModules;
}

function countLinesAndChars(dirPath, exclude = ["node_modules"]) 
{
    let totalLines = 0;
    let totalChars = 0;

    const files = fs.readdirSync(dirPath).filter(file => !exclude.includes(file));

    for (const file of files) 
    {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) 
        {
            const { lines, chars } = countLinesAndChars(filePath);
            totalLines += lines;
            totalChars += chars;
        }
        else 
        {
            const content = fs.readFileSync(filePath, "utf-8");
            const lines = content.split("\n").length;
            const chars = content.length;
            totalLines += lines;
            totalChars += chars;
        }
    }

    return { lines: totalLines, chars: totalChars };
}



function listProjectInfo() 
{
    const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    const packageLockJson = JSON.parse(fs.readFileSync("./package-lock.json", "utf8"));

    // Verify that the package.json and package-lock.json exist
    if (!packageJson || !packageLockJson) 
    {
        console.error("package.json or package-lock.json not found");
        return;
    }

    console.clear();

    console.log(chalk.bold("Project Info"));
    console.log(chalk.bold("============"));
    console.log(chalk.blue("Name: ") + packageJson.name);
    console.log(chalk.blue("Version: ") + packageJson.version);
    console.log(chalk.blue("Description: ") + packageJson.description);
    console.log(chalk.blue("Author: ") + packageJson.author);
    console.log(chalk.blue("License: ") + packageJson.license);

    console.log();

    console.log(chalk.bold("Scripts"));
    console.table(packageJson.scripts);

    console.log();

    const installedModules = __getInstalledModules(packageJson, packageLockJson);
    console.log(chalk.bold("Installed Modules"));
    console.table(installedModules);

    console.log();

    const { lines, chars } = countLinesAndChars("./");
    const { lines: linesWithNodeModules, chars: charsWithNodeModules } = countLinesAndChars("./", []);
    console.log(chalk.bold("Code statistics"));
    console.log(chalk.blue("Lines: ") + lines);
    console.log(chalk.blue("Characters: ") + chars);
    console.log(chalk.blue("Lines counting also node_modules: ") + linesWithNodeModules);
    console.log(chalk.blue("Characters counting also node_modules: ") + charsWithNodeModules);

}

module.exports = listProjectInfo;