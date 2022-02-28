import "reflect-metadata";
import { where } from "sequelize/types";
import db from "../models";
const User = db.User;
import { userType } from "../models/user";
import bcrypt from 'bcrypt';

const saltRounds =parseInt( process.env.SALT_ROUNDS as string);
const pepper = process.env.BCRYPT_PASSWORD


export class userStore{
    async index() : Promise<userType[]|null > {
        try{
        const users : userType[]= await User.findAll();
        return users;
        }catch(err) {
         throw new Error(`Could not get users. Error: ${err}`);
    };
  }

  async show(id: number): Promise<userType|null> {
    try{
        const user : userType= await User.findOne({where: {id:id}});
        return user;
        }catch(err) {
        throw new Error(`Could not find User ${id}. Error: ${err}`);
    };
  }

  async create(n:string,e:string,p:string): Promise<userType> {
    try {  
        const hash = bcrypt.hashSync(p + pepper, saltRounds);
        const user : userType= await User.create({name:n,email:e,password:hash});
        return user;
        }catch(err) { 
        throw new Error(`Could not add new User. Error: ${err}`);
    }
  }
  
  async edit(u: userType): Promise<userType> {
    try {  
        const hash = bcrypt.hashSync(u.password + pepper, saltRounds);
        const user : userType= await User.update({name:u.name,email: u.email,password:hash},{ where :{id:u.id}});
        return user;
        }catch(err) { 
        throw new Error(`Could not update the User. Error: ${err}`);
    };
  }
  
  async delete(id: number): Promise<void> {
    try {  
        const user: userType =await User.destroy({where :{id:id}});
        }catch(err) { 
          throw new Error(`Could not delete User ${id}. Error: ${err}`)
    };
  }

  async authenticate(email: string, password: string): Promise<userType | null> {
    try{
        const result: userType= await User.findOne({where: {email:email}});
        if(result) {
            const user = result[0].dataValues;
            if (bcrypt.compareSync(password+pepper, user.password)) {
              return user;
      }
    }
    return null;
    }catch (err){
    throw new Error(`Could not authenticate user . Error: ${err}`)
    }
  }
}

export default userStore;