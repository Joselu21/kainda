/**
 * Check if the IP is blocked or not
 * @param {*} ip The IP to check
 * @param {*} options The options object
 * @returns {boolean} True if the IP is blocked, false otherwise
 * @example blockByIP('192.168.1.12', { blacklist: process.env.BLACKLIST_IPS.split(',') })
 * @example blockByIP('192.168.1.12', { whitelist: process.env.WHITELIST_IPS.split(',') })
 */
function blockByIP(ip, options) 
{
    let whitelist = options.whitelist ?? [];
    let blacklist = options.blacklist ?? [];

    for(let whitelist_ip of whitelist) 
    {
        if (whitelist_ip === ip) 
        {
            return true;
        }
    }

    for(let blacklist_ip of blacklist) 
    {
        if (blacklist_ip === ip) 
        {
            return false;
        }
    }

    return true;

}

const AuthFunctions = {
    blockByIP
};

module.exports = AuthFunctions;