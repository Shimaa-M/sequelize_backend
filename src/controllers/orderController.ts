import "reflect-metadata";
import { where } from "sequelize/types";
import db from "../models";
const Order = db.Order;
import { orderType } from "../models/order";

export class orderStore{
    async index() : Promise<orderType[]|null > {
        try{
        const orders : orderType[]= await Order.findAll();
        return orders;
        }catch(err) {
         throw new Error(`Could not get Orders. Error: ${err}`);
    };
  }

  async show(id: number): Promise<orderType> {
    try{
        const order : orderType= await Order.findOne({where: {Id:id}});
        return order;
        }catch(err) {
        throw new Error(`Could not find Order ${id}. Error: ${err}`);
    };
  }

  async create(status:string,user_id:number): Promise<orderType> {
    try {  
        const order : orderType= await Order.create({status:status,user_id:user_id});
        return order;
        }catch(err) { 
        throw new Error(`Could not add new Order. Error: ${err}`);
    }
  }
  
  async edit(o: orderType): Promise<orderType> {
    try {  
        const order : orderType= await Order.update(o,{where :{Id:o.Id}}); 
        return Order;
        }catch(err) { 
        throw new Error(`Could not update the Order. Error: ${err}`);
    };
  }
  
  async delete(id: number): Promise<orderType> {
    try {  
        const order: orderType =await Order.destroy({where :{Id:id}});  
        return order
      }catch(err) { 
          throw new Error(`Could not delete Order ${id}. Error: ${err}`)
    };
  }
}

export default orderStore;