'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    var Order = /** @class */ (function (_super) {
        __extends(Order, _super);
        function Order() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Order.associate = function (models) {
            // define association here
            Order.belongsToMany(models.Product, {
                through: 'orderProduct',
                foreignKey: "OrderId"
            });
            Order.belongsTo(models.User);
        };
        return Order;
    }(sequelize_1.Model));
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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
        sequelize: sequelize,
        modelName: 'Order'
    });
    return Order;
};
