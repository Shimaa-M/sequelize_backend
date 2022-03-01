'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class orderProduct extends sequelize_1.Model {
        static associate(models) {
            // define association here
        }
    }
    orderProduct.init({
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize,
        modelName: 'orderProduct',
    });
    return orderProduct;
};
