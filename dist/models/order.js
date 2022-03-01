'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Order.belongsToMany(models.Product, {
                through: 'orderProduct',
                foreignKey: "OrderId",
            });
            Order.belongsTo(models.User);
        }
    }
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};
