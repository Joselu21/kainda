const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Delete endpoint', function () {
        it ('Delete a __KAINDA__MODEL__UPPERCASE__ successfully (200)');

        it ('Delete a __KAINDA__MODEL__UPPERCASE__ with invalid token (401)');

        it ('Delete a __KAINDA__MODEL__UPPERCASE__ with no permission (403)');

        it ('Delete a __KAINDA__MODEL__UPPERCASE__ with invalid id (404)');
    });

};