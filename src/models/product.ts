'use strict';
import {Model} from 'sequelize';
export type productType = {
  id: number,
  name: string,
  price: number
}
 module.exports=(sequelize : any, DataTypes: any) => {
  class Product extends Model<productType> implements productType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!: number;
     name!: string;
     price!: number;
    
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, {
        through : 'orderProduct',
        foreignKey: "ProductId",})
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
    price:{
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};