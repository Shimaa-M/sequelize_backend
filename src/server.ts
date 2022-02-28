import express  from 'express';
import bodyParser from 'body-parser';
import cookiesParser from 'cookie-parser';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import db from './models'
import dashboardRoutes from './handlers/order_products';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cookiesParser());

app.get('/', function (req: express.Request , res: express.Response) {
    res.send('Hello World'); 
});
userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

db.sequelize.sync().then(() => {
app.listen(3000,  () => {
    console.log(`starting listening at ${address}`);
});
});

export default app;