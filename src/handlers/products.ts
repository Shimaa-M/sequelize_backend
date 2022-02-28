import express, { NextFunction, Request, Response } from 'express';
import { productStore } from '../controllers/productController';
import { productType } from '../models/product';

const store = new productStore();

const index = async (_req: Request, res: Response):Promise<void> => {
  const products = await store.index();
  res.json(products);
}

const show = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
   const product = await store.show(parseInt(_req.params.id) );
   if(product==null)
   {      
    return next('product not found');
   }
   res.json(product);
}

const create = async (_req: Request, res: Response):Promise<void> => {
    try {
        const  { name ,price} = _req.body;
        const newproduct = await store.create(name,price);
        res.json(newproduct);
    } catch(err) {
        res.status(400);
        res.json(err);
    }
}

const edit = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    try{
            const product: productType ={
                id : parseInt(_req.params.id),
                name : _req.body.name,
                price : parseInt(_req.body.price)
            };
             
            const updatedProduct = await store.edit(product);
            if(updatedProduct==null)
            {      
            return  next('product not found');
            }
            res.json(updatedProduct);
        }catch(err){
          res.status(400);
          res.json(err);
        }
    }

const destroy = async (_req: Request, res: Response,next:NextFunction):Promise<void> => {
    const deleted = await store.delete(parseInt(_req.params.id));
    if(deleted==null)
    {      
    return  next('product not found');
    }
    res.json(deleted);
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.patch('/products/:id', edit)
  app.post('/products', create)
  app.delete('/products/:id', destroy)
};

export default productRoutes;