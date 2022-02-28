
import { orderProductType } from '../../models/orderproduct';
import {DashboardQueries} from '../dashboard';
import {sequelize} from '../../models/index';

const store = new DashboardQueries();

describe('Test products in orders endpoint response', () => {

    it('should create new relation in join table', async () => {
        const dataOrderProduct = [
            {
               ProductId: 1,
               OrderId: 1,
               quantity:5
             }
           ]
        sequelize.sync({ force: true }).then( async() => {
        const res= await store.create(dataOrderProduct);
        expect(res).toBeTruthy(); 
        })
    });
     
    it('should get all orders included products', async () => {
        sequelize.sync({ force: true }).then(async() => {
        const res = await store.productsInOrders();
        expect(res?.length).toBe(1); 
        })
        
    });
    it('should get products in certain order', async () => {
        sequelize.sync({ force: true }).then(async () => {
        const res= await store.productsInOneOrder(1);
        expect(res?.ProductId).toBe(1); 
        })
    });
    
    });
    