const assert = require("assert");
const supertest = require("supertest");

module.exports = function () 
{

    describe("Get endpoint", function () 
    {

        describe("Get all __KAINDA__MODEL__UPPERCASE__s", function () 
        {

            it("Get all __KAINDA__MODEL__UPPERCASE__s successfully (200) with data");

            it("Get all __KAINDA__MODEL__UPPERCASE__s successfully (200) without data");

            it("Get all __KAINDA__MODEL__UPPERCASE__s with invalid token (401)");

            it("Get all __KAINDA__MODEL__UPPERCASE__s with no permission (403)");

        });

        describe("Get __KAINDA__MODEL__UPPERCASE__ by id", function () 
        {

            it("Get a __KAINDA__MODEL__UPPERCASE__ successfully (200)");

            it("Get a __KAINDA__MODEL__UPPERCASE__ with invalid token (401)");

            it("Get a __KAINDA__MODEL__UPPERCASE__ with no permission (403)");

            it("Get a __KAINDA__MODEL__UPPERCASE__ with invalid id (404)");

        });

    });

};