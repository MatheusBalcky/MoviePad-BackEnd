import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import * as authControllers from '../controllers/authController';
import * as authSchemas from '../schemas/authSchemas';

const authRoutes = Router();

authRoutes.post('/signup', validateSchemaMiddleware(authSchemas.signUp), authControllers.signUp);
authRoutes.post('/signin', validateSchemaMiddleware(authSchemas.signIn), authControllers.signIn);

export default authRoutes;
