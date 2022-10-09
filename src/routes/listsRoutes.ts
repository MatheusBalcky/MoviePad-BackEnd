import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { tokenAuthenticationMiddle } from '../middlewares/tokenAuthenticationMiddle';
import * as listsSchemas from '../schemas/listsSchemas';
import * as listsController from '../controllers/listsController';

const listsRoutes = Router();

listsRoutes.use(tokenAuthenticationMiddle);

listsRoutes.post('/lists/create', validateSchemaMiddleware(listsSchemas.newList), listsController.createList);

listsRoutes.post(
  '/lists/:listId/addcontent',
  validateSchemaMiddleware(listsSchemas.contentData),
  listsController.addNewContentIntoList
);

listsRoutes.get('/lists', listsController.getListsFromUser);

listsRoutes.get('/lists/:listId', listsController.getOneListAndContentsById);

listsRoutes.delete('/lists/:listId/remove', listsController.deleteListById);

listsRoutes.get('/contentFromAList/:id', listsController.getOneContentDataFromAList);

export default listsRoutes;
