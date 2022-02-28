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
    var Product = /** @class */ (function (_super) {
        __extends(Product, _super);
        function Product() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Product.associate = function (models) {
            // define association here
            Product.belongsToMany(models.Order, {
                through: 'orderProduct',
                foreignKey: "ProductId"
            });
        };
        return Product;
    }(sequelize_1.Model));
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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
        sequelize: sequelize,
        modelName: 'Product'
    });
    return Product;
};
