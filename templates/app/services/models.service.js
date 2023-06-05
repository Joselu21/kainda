const serveDocumentation = require("@/doc/doc-serve");
const kainda = require("kainda");
const path = require("path");

class ModelsService 
{

    static Models;

    static init(Models) 
    {
        ModelsService.Models = Models ?? kainda.getModels();
    }

    static setupRoutes(app) 
    {
        for (let model of Object.keys(ModelsService.Models)) 
        {
            for (let route of Object.keys(ModelsService.Models[model].Routes)) 
            {
                ModelsService.Models[model].Routes[route](app, ModelsService.Models[model]);
            }
        }

        // Export the routes 
        app.get("/routes", (req, res) => 
        {
            let routes = [];
            app._router.stack.forEach(function (r) 
            {
                if (r.route && r.route.path) 
                {
                    routes.push(kainda.exportRoute(r));
                }
                else if (r.name === "router" && r.handle.stack) 
                {
                    r.handle.stack.forEach(function (r) 
                    {
                        routes.push(kainda.exportRoute(r));
                    });
                }
            });
            res.status(200).json(routes);
        });

        // Serve the documentation
        serveDocumentation(app, "/doc", path.join(process.cwd(), "/doc/openapi.json"));
    }

}

module.exports = ModelsService;