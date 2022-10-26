function extractArgument(indicator) {

    let index = process.argv.indexOf(indicator);
    if(index > -1 && process.argv[index + 1]) {
        return process.argv[index + 1];
    }

    return null;

}

module.exports = {
    extractArgument
}