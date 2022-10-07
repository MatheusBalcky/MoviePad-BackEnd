import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import * as listsSchemas from '../schemas/listsSchemas';
import { tokenAuthenticationMiddle } from '../middlewares/tokenAuthenticationMiddle';
import * as listsController from '../controllers/listsController';

const listsRoutes = Router();

listsRoutes.use(tokenAuthenticationMiddle);

listsRoutes.post('/lists/create', validateSchemaMiddleware(listsSchemas.newList), listsController.createList);
// listsRoutes.post('/lists/:listId/new-content')

listsRoutes.get('/lists', listsController.getListsFromUser);

listsRoutes.get('/lists/:listId', listsController.getOneListAndContentsById);

listsRoutes.delete('/lists/:id/remove', listsController.deleteListById);

export default listsRoutes;
