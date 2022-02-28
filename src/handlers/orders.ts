import express, { NextFunction, Request, Response } from 'express';
import { orderStore } from '../controllers/orderController';
import { orderType } from '../models/order';
import isLogged from '../utilities/isLogged';

const store = new orderStore();

const index = async (_req: Request, res: Response):Promise<void> => {
    try {
        const orders = await store.index();
        res.json(orders);  
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    try {
        const order = await store.show(parseInt(_req.params.id));
        if(order==null)
        {      
        return  next('order not found');
        }
        res.json(order);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (_req: Request, res: Response):Promise<void> => {
    try {
        const user_id: number =parseInt( res.locals.user_id);
        console.log(user_id);
        const {status} = _req.body

        const neworder = await store.create(status,user_id);
        res.json(neworder);

    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const edit = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    const user_id: number =parseInt( res.locals.user_id);
    try{
            const order: orderType ={
                id : parseInt(_req.params.id),
                status : _req.body.status,
                user_id: user_id
            };  
            const updatedProduct = await store.edit(order);
            if(updatedProduct==null)
            {      
             return next('order not found');
            }
            res.json(updatedProduct);
        }catch(err){
          res.status(400);
          res.json(err);
        }
    }

const destroy = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    try{
    const deleted = await store.delete(parseInt(_req.params.id));
    if(deleted==null)
    {      
     return next('order not found');
    }
    res.json(deleted);
    }catch(err){
        res.status(400);
        res.json(err);
    }
}


const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders',isLogged, create)
    app.delete('/orders/:id',isLogged, destroy)
    app.patch('/orders/:id',isLogged, edit)
  
  };

  export default orderRoutes;


