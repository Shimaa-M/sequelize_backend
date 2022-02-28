
import { orderType } from '../../models/order';
import orderStore from '../orderController';
import {sequelize} from '../../models/index';
import userStore from '../userController';
const store = new orderStore();
const userStore_= new userStore();

describe('Test orders endpoint response', () => {
    beforeAll(() => {
        const name:string= "Mariam";
     const email:string= "mariam@mailsac.com";
     const password:string= "test1234";
     sequelize.sync({ force: true }).then( async() => {
         await userStore_.create(name,email,password);
         await userStore_.authenticate(email,password);
    });
});

    it('should get all orders', async () => {
        sequelize.sync({ force: true }).then(async() => {
        const res = await store.index();
        expect(res?.length).toBe(1); 
        })
        
    });
    it('should get 1 order', async () => {
        sequelize.sync({ force: true }).then(async () => {
        const res= await store.show(1);
        expect(res?.id).toBe(1); 
        })
    });
     
    
    it('should create new order', async () => {
        const status:string= "open";
        const user_id:number=1;
        sequelize.sync({ force: true }).then( async() => {
        const res= await store.create(status,user_id);
        expect(res.status).toBe("open"); 
        })
    });
    it('should update order', async () => {
        const editOrder : orderType ={
            id: 1,
            status: "closed",
            user_id: 1
        }
        sequelize.sync({ force: true }).then(async () => {
        const res=await store.edit(editOrder);
        expect(res.status).toBe("Closed"); 
        })
        
    });
    
    
    it('should delete the order', async () => {
        sequelize.sync({ force: true }).then(async() => {
        const response = await store.delete(2);
        expect(response).toThrowError(); 
        })
    });
afterAll(() => {
    sequelize.sync({ force: true }).then( async() => {
        await userStore_.delete(1);
       
   });
})
    
})