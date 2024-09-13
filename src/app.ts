// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import { ProductRoutes } from './product/product.route';
// // const port = 3000

// const app: Application = express();

// //Parsers
// app.use(express.json);
// app.use(cors());

// // application routes
// app.use('api/products', ProductRoutes);


// const getProduct = (req: Request, res: Response) => {
//   res.send('Hello World next')
// };

// app.get('/',getProduct);

// export default app;
// app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './product/product.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/products', ProductRoutes);

const getProduct = (req: Request, res: Response) => {
    res.send('Hello World next');
};

app.get('/', getProduct);

export default app;
