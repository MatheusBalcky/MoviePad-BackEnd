import { Router } from 'express';
import authRoutes from './authRoutes';
import listsRoutes from './listsRoutes';

const routes = Router();

routes.use(authRoutes);
routes.use(listsRoutes);

export default routes;
