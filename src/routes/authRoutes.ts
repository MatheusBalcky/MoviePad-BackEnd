import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import * as authControllers from '../controllers/authController';
import * as authSchemas from '../schemas/authSchemas';
import { tokenAuthenticationMiddle } from '../middlewares/tokenAuthenticationMiddle';

const authRoutes = Router();

authRoutes.post('/signup', validateSchemaMiddleware(authSchemas.signUp), authControllers.signUp);
authRoutes.post('/signin', validateSchemaMiddleware(authSchemas.signIn), authControllers.signIn);

authRoutes.post('/verifyToken', tokenAuthenticationMiddle, authControllers.tokenVerify);

export default authRoutes;
