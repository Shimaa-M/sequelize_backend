'use strict';

import {Model} from 'sequelize';
export type orderType = {
  Id: number,
  status: string,
  user_id: number
}
module.exports = (sequelize: any, DataTypes:any) => {
  class Order extends Model<orderType> implements orderType {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    Id!: number;
    status!: string;
    user_id!: number;
    static associate(models) {
      // define association here
      Order.belongsToMany(models.Product, {
        through : 'orderProduct',
      foreignKey:'OrderId'});
       Order.hasOne(models.User);
    }
  }
  Order.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
  },
  user_id :{
  type: DataTypes.INTEGER,
  allowNull: false,
  primaryKey: true,
  references: {
    model: 'Users',
    key: 'id'
  }
}
},
 {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};