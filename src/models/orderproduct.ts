'use strict';
import {Model} from 'sequelize';
export type orderProductType = {
  ProductId: number,
  OrderId: number,
  quantity: number
  };
module.exports = (sequelize:any, DataTypes:any) => {
  class orderProduct extends Model<orderProductType> implements orderProductType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     ProductId!: number;
    OrderId!: number;
    quantity!: number;
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
    quantity: 
    {
      type: DataTypes.INTEGER,
      defaultValue : 1
    }
  }, {
    sequelize,
    modelName: 'orderProduct',
  });
  return orderProduct;
};