const { tokenValid } = require("kainda");

// TODO: Add your own logic here
// All routes by default execute a middleware called tokenValid exported by this service.
// This middleware checks if the token is valid only.
// If you want to check if the user has permissions to access the route or a specific resource
// check the canCreateResource, canReadResource, canUpdateResource and canDeleteResource middlewares of every entity.

module.exports = {
    tokenValid
};