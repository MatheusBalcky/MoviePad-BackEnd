import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';

const app = express();
app.use(express.json(), cors());

app.get('/testing', (req: Request, res: Response) => {
  res.status(200).send('Server test ok!');
});

export default app;
