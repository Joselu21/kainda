function extractArgument(indicator) 
{

    let index = process.argv.indexOf(indicator);
    if(index > -1 && process.argv[index + 1]) 
    {
        return process.argv[index + 1];
    }

    return null;

}

function argsContains(indicator) 
{
    return process.argv.indexOf(indicator) > -1;
}

module.exports = {
    extractArgument,
    argsContains
};