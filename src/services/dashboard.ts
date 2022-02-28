import { Model } from "sequelize/types";
import db from "../models";
const orderProduct = db.orderProduct;
const Order = db.Order;
const Product = db.Product;
import { orderProductType } from "../models/orderproduct";

export class DashboardQueries {
     async create(entry): Promise<orderProductType|null > {
       try{
       const res= await  orderProduct.create(entry);
        return res;
      } catch (err) {
        throw new Error(`unable get products and orders: ${err}`)
      } 
    }
   
//Get all products that have been included in orders
  async productsInOrders(): Promise<orderProductType[]|null> {
    try{ 
        const products_in_orders: orderProductType[] = await Order.findAll({
                  include :{ model: db.Product 
        }});
     return products_in_orders;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`)
    } 
  }
  async productsInOneOrder(id:number): Promise<orderProductType|null> {
    try{
        const products_in_orders: orderProductType = await Order.findAll({ attributes :
            ['id'],where :{id:id},
                  include :{
                      model: db.Product ,attributes: ['name','price'] 
                  }
    })
    return products_in_orders;
    } catch (Error) {
      return null;
    } 
  }
}

