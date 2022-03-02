import express, { NextFunction, Request, Response } from 'express';
import { userStore } from '../controllers/userController';
import { userType } from '../models/user';
import jwt from 'jsonwebtoken';
import isLogged from '../utilities/isLogged';

const store = new userStore();

const createSendToken = (user: userType, statusCode: number, _req: Request, res: Response) :void => {
 
    const token = jwt.sign({user}, (process.env.JWT_TOKEN as unknown)as string);
    res.cookie('jwt', token, {
        expires: new Date(
          Date.now() + parseInt((process.env.JWT_COOKIE_EXPIRES_IN as unknown)as string) * 24 * 60 * 60 * 1000
        ),
      httpOnly: true,
      secure: _req.secure || _req.headers['x-forwarded-proto'] === 'https'
    });
    // Remove password from output
    user.password = "undefined";
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  }
 

const index = async (_req: Request, res: Response):Promise<void> => {
  try{
      const users = await store.index();
      res.json(users);
  } catch(err) {
      res.status(400);
      res.json(err);
  }
}

const show = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
  try{
   const user = await store.show(parseInt(_req.params.id));
   if(!user)
   {
    return next('user not found');
   }
   res.json(user);
  } catch(err){
    res.status(400);
    res.json(err);
}
}

const create = async (_req: Request, res: Response):Promise<void> => {
    try {
        const { name,email,password} = _req.body;
        const newUser = await store.create(name,email,password);
        createSendToken(newUser,201,_req,res);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const edit = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    try{
        const user: userType ={
        id :parseInt( _req.params.id),
        name : _req.body.name,
        email : _req.body.email,
        password: _req.body.password
        };
             
        const updatedUser = await store.edit(user);
        if(!updatedUser){
            return next('user not found');
        }
        res.json('the user is updated sucessfully');
    }catch(err){
        res.status(400);
        res.json(err);
        }
    }

const destroy = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    try{
        const deleted = await store.delete(parseInt(_req.params.id));
        if(!deleted)
        {      
        return next('user not found');
        }
        res.json('the user is deleted sucessfully');
  } catch(err) {
        res.status(401);
        res.json(err )
  }
}

const authenticate = async (_req: Request, res: Response):Promise<void> => {
  const {email , password} = _req.body;
    try {
        const user = await store.authenticate(email,password);
       console.log(user);
        if(!user){
            res.status(401).json({message : 'error login credintial' });
        }
        else createSendToken(user,200,_req,res);
    } catch(err) {
        res.status(401);
        res.json(err )
    }
}


const userRoutes = (app: express.Application) => {
  app.get('/users',isLogged, index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.delete('/users/:id',isLogged, destroy)
  app.patch('/users/:id', edit)
  app.post('/login', authenticate)
};

export default userRoutes;