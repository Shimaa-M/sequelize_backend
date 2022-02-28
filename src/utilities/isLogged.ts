import express ,{Response , Request, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { userStore } from '../controllers/userController';
import { userType } from '../models/user';
const jwtToken = process.env.JWT_TOKEN;

const store = new userStore();

  const isLogged = async (_req: Request, res: Response, next: NextFunction) => {
    let token;
    if (_req.headers.authorization && _req.headers.authorization.startsWith('Bearer')) {
      token = _req.headers.authorization.split(' ')[1];
    } else if (_req.cookies.jwt) {
      token = _req.cookies.jwt;
    }
    if(token)
    {
    try{
         // 1) verify token
         const decoded= await jwt.verify(_req.cookies.jwt, process.env.JWT_TOKEN as string) as userType;
         const userFound =Object.values(decoded)[0];
         const id = Object.values(userFound)[0];
         // 2) Check if user still exists
         const currentUser = await store.show(id);
         if (currentUser==undefined) {
            res.status(401).send("user not found");
         }
         // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        res.locals.user_id=id;
       next();
       } catch (err) {
        res.status(401).send("no token found");
       }
    } else {
        res.status(401).send("no token found");
    }
 }
    

export default isLogged;