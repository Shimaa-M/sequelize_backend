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
    var orderProduct = /** @class */ (function (_super) {
        __extends(orderProduct, _super);
        function orderProduct() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        orderProduct.associate = function (models) {
            // define association here
        };
        return orderProduct;
    }(sequelize_1.Model));
    orderProduct.init({
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        OrderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }, {
        sequelize: sequelize,
        modelName: 'orderProduct'
    });
    return orderProduct;
};
