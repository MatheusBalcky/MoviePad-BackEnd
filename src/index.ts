import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes/routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json(), cors());

app.use(routes);
app.use(errorHandler);

app.get('/testing', (req: Request, res: Response) => {
  res.status(200).send('Server test ok!');
});

export default app;
