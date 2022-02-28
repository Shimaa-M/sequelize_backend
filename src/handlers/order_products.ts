import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

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
    app.get('/products_in_orders', productsInOrders);
    app.get('/order/:id/products', productsInOneOrder);
}

export default dashboardRoutes;