'use strict';
exports.__esModule = true;
exports.sequelize = void 0;
require("reflect-metadata");
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.js')[env];
//have to use any to define its methods
var db = {};
// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
exports.sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres'
});
//}
fs
    .readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
})
    .forEach(function (file) {
    var model = require(path.join(__dirname, file))(exports.sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = exports.sequelize;
db.Sequelize = Sequelize;
exports["default"] = db;
