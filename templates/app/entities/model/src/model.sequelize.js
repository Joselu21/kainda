const { DataTypes, Model } = require('sequelize');
const { KaindaModel } = require('kainda');

class __KAINDA__MODEL__UPPERCASE__ extends Model {}

__KAINDA__MODEL__UPPERCASE__.init({
    __KAINDA__MODEL__LOWERCASE___id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    }
    // TODO: Create more fields for the model
}, {
    sequelize,
    modelName: '__KAINDA__MODEL__UPPERCASE__',
    tableName: '__KAINDA__MODEL__LOWERCASE__s', // TODO: Check if the table name is correct
    timestamps: true,
    paranoid: false,
});

/**
 * RELATIONSHIPS
 */


/**
 * HOOKS
 */

const Kainda__KAINDA__MODEL__UPPERCASE__ = new KaindaModel(__KAINDA__MODEL__UPPERCASE__);
module.exports = Kainda__KAINDA__MODEL__UPPERCASE__;