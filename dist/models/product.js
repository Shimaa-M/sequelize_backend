'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Product.belongsToMany(models.Order, {
                through: 'orderProduct',
                foreignKey: "ProductId",
            });
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
