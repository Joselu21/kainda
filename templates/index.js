const setup = require("./setup");

let app = null;

(async () => {
    app = await setup();
})();