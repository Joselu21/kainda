const { exportFiles } = require("kainda");

const Fragments = exportFiles(__dirname, "test.fragment.js");
module.exports = Fragments;