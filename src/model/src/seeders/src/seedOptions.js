/**
 * @typedef {Object} SeedOptions
 * @property {boolean} seed - Whether or not to seed the data
 * @property {boolean} is_seeded - Whether or not the data has already been seeded
 * @property {string} oldRecords - The type of old records processing to perform
 * @property {Array<KaindaModel>} dependencies - An array of model names that this model depends on
 * @export SeedOptions
 */

const MinKeys = [
    "seed",
    "dependencies",
    "is_seeded",
    "oldRecords"
];

const OldRecords = [
    "deleteAll",
    "ignore",
    "dontSeedIfRecordsExists",
    "dontSeedIfAllExist",
    "dontSeedIfAnyExist"
];

function validate(seed_options) 
{
    if (!seed_options) 
    {
        throw new Error("Seed options are not defined.");
    }
    if (typeof seed_options !== "object") 
    {
        throw new Error("Seed options must be an object.");
    }
    if (Object.keys(seed_options).length < MinKeys.length) 
    {
        throw new Error("Seed options must have at least the following keys: " + MinKeys.join(", "));
    }
    for (let i = 0; i < MinKeys.length; i++) 
    {
        const key = MinKeys[i];
        if (Object.keys(seed_options).indexOf(key) === -1) 
        {
            throw new Error("Seed options must have the following key: " + key);
        }
    }
    if (seed_options.dependencies && !Array.isArray(seed_options.dependencies)) 
    {
        throw new Error("Seed options dependencies must be an array.");
    }
    if (seed_options.oldRecords && typeof seed_options.oldRecords !== "string") 
    {
        throw new Error("Seed options oldRecords must be a string.");
    }
    if (seed_options.oldRecords && !OldRecords.includes(seed_options.oldRecords)) 
    {
        throw new Error("Seed options oldRecords must be one of the following: " + OldRecords.join(", "));
    }
}

module.exports = {
    validate,
    MinKeys,
    OldRecords
};