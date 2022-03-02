import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const inProductsInOrders = async (_req: Request, res: Response) => {
  const dataOrderProduct = [
    {
       ProductId: _req.body.ProductId,
       OrderId: _req.body.OrderId,
       quantity:_req.body.quantity
     }
   ]
  const products = await dashboard.create(dataOrderProduct);
  res.json(products);
}

const productsInOrders = async (_req: Request, res: Response) => {
  const products = await dashboard.productsInOrders();
  res.json(products);
}
const productsInOneOrder = async (_req: Request, res: Response) => {
    const  id: number= parseInt(_req.params.id);
    const products = await dashboard.productsInOneOrder(id);
    res.json(products);
    }
const dashboardRoutes = (app: express.Application) => {
  app.post('/products_in_orders', productsInOrders);
    app.get('/products_in_orders', productsInOrders);
    app.get('/order/:id/products', productsInOneOrder);
}

export default dashboardRoutes;