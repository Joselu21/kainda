const assert = require('assert');
const supertest = require('supertest');

module.exports = function () {

    describe ('Create endpoint', function () {
        it ('Create a __KAINDA__MODEL__UPPERCASE__ successfully (200)');

        it ('Create a __KAINDA__MODEL__UPPERCASE__ with invalid data (400)');

        it ('Create a __KAINDA__MODEL__UPPERCASE__ with invalid token (401)');

        it ('Create a __KAINDA__MODEL__UPPERCASE__ with no permission (403)');

        it ('Create a __KAINDA__MODEL__UPPERCASE__ with conflicting data (409)');
    });

};