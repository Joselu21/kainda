const mongoose = require('mongoose');
const { KaindaModel } = require('kainda');

const __KAINDA__MODEL__LOWERCASE__Schema = new mongoose.Schema({
    // TODO: Fill the fields of the schema
}, {
    timestamps: true,

});

const tmpModel = mongoose.model('__KAINDA__MODEL__UPPERCASE__', __KAINDA__MODEL__LOWERCASE__Schema);
const __KAINDA__MODEL__UPPERCASE__ = new KaindaModel(tmpModel);
module.exports = __KAINDA__MODEL__UPPERCASE__;
