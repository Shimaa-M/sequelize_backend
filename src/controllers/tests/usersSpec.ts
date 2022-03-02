
import { userType } from '../../models/user';
import userStore from '../userController';
import {sequelize} from '../../models/index';

const store = new userStore();

describe('Test users endpoint response', () => {
       
     const name:string= "Mariam";
     const email:string= "mariam@mailsac.com";
     const password:string= "test1234";
    
    it('should create new user', async () => {
        sequelize.sync({ force: true }).then( async() => {
        const res= await store.create(name,email,password);
        expect(res.name).toBe("Mariam"); 
        })
    });
    it('should update user', async () => {
        const editUser : userType ={
            id: 1,
            name: "Saeed",
            email: "Saeed@mailsac.com",
            password: "test1234"
        }
        sequelize.sync({ alter: true }).then(async () => {
        const res=await store.edit(editUser);
        expect(res.email).toBe("Saeed@mailsac.com"); 
        })
        
    });
    it('should get all users', async () => {
        sequelize.sync().then(async() => {
        const res = await store.index();
        expect(res?.length).toBe(1); 
        })
        
    });
    it('should get 1 user', async () => {
        sequelize.sync().then(async () => {
        const res= await store.show(1);
        expect(res?.id).toBe(1); 
        })
    });
    it('should authenticate user', async () => {
        const email: string="mariam@mailsac.com";
        const password: string="test1234"
        sequelize.sync().then(async() => {
        const response = await store.authenticate(email,password);
        expect(response).toThrowError(); 
        })
    });
    it('should delete the user', async () => {
        sequelize.sync().then(async() => {
        const response = await store.delete(2);
        expect(response).toThrowError(); 
        })
    });

    });
    