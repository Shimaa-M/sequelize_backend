import "reflect-metadata";
import { where } from "sequelize/types";
import db from "../models";
const Product = db.Product;
import { productType } from "../models/product";


export class productStore{
    async index() : Promise<productType[]|null > {
        try{
        const products : productType[]= await Product.findAll();
        return products;
        }catch(err) {
         throw new Error(`Could not get products. Error: ${err}`);
    };
  }

  async show(id: number): Promise<productType|null> {
    try{
        const product : productType= await Product.findOne({where: {id:id}});
        return product;
        }catch(err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`);
    };
  }

  async create(p:string,price:number): Promise<productType> {
    try {  
        const product : productType= await Product.create({name:p,price:price});
        return product;
        }catch(err) { 
        throw new Error(`Could not add new product. Error: ${err}`);
    }
  }
  
  async edit(p: productType): Promise<productType> {
    try {  
        const product : productType= await Product.update(p,{where :{id:p.id}});
        return product;
        }catch(err) { 
        throw new Error(`Could not update the product. Error: ${err}`);
    };
  }
  
  async delete(id: number): Promise<void> {
    try {  
      const product: productType = await Product.destroy({where :{id:id}});
      }catch(err) { 
          throw new Error(`Could not delete product ${id}. Error: ${err}`)
    };
  }
}

export default productStore;