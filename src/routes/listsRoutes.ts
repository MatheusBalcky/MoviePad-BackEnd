import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import * as listsSchemas from '../schemas/listsSchemas';
import { tokenAuthenticationMiddle } from '../middlewares/tokenAuthenticationMiddle';
import * as listsController from '../controllers/listsController';

const listsRoutes = Router();

listsRoutes.post(
  '/lists/create',
  tokenAuthenticationMiddle,
  validateSchemaMiddleware(listsSchemas.newList),
  listsController.createList
);
// listsRoutes.post('/lists/:listId/new-content', tokenAuthenticationMiddle,)

listsRoutes.get('/lists', tokenAuthenticationMiddle, listsController.getListsFromUser);

listsRoutes.get('/lists/:listId', tokenAuthenticationMiddle, listsController.getOneListAndContentsById);

export default listsRoutes;
