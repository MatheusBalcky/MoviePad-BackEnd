import { Request, Response,Router } from 'express';
import authRoutes from './authRoutes';
import listsRoutes from './listsRoutes';

const routes = Router();

routes.get('/testmoviepad', (req: Request, res: Response) => {
  res.status(200).send('Hellow World');
});

routes.use(authRoutes);
routes.use(listsRoutes);

export default routes;
