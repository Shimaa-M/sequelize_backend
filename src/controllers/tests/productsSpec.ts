
import { productType } from '../../models/product';
import productStore from '../productController';
import {sequelize} from '../../models/index';

const store = new productStore();

describe('Test products endpoint response', () => {
       
     const name:string= "camera";
     const price:number=1000;
    
    it('should create new product', async () => {
        sequelize.sync({ force: true }).then( async() => {
        const res= await store.create(name,price);
        expect(res.name).toBe("camera"); 
        })
    });
    it('should update product', async () => {
        const editProduct : productType ={
            id: 1,
            name: "TV",
            price: 10000
        }
        sequelize.sync().then(async () => {
        const res=await store.edit(editProduct);
        expect(res.name).toBe("TV"); 
        })
        
    });
    it('should get all products', async () => {
        sequelize.sync().then(async() => {
        const res = await store.index();
        expect(res?.length).toBe(1); 
        })
        
    });
    it('should get 1 product', async () => {
        sequelize.sync().then(async () => {
        const res= await store.show(1);
        expect(res?.id).toBe(1); 
        })
    });
    
    it('should delete the product', async () => {
        sequelize.sync().then(async() => {
        const response = await store.delete(2);
        expect(response).toThrowError(); 
        })
    });

    });
    