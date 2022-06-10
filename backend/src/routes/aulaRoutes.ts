import express from 'express';
import aulaController from '@controllers/aulaController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', roleMiddleware([Role.TEACHER, Role.STUDENT]), aulaController.list);
router.get('/:id', roleMiddleware([Role.TEACHER, Role.STUDENT]), aulaController.read);
router.put('/:id', roleMiddleware([Role.TEACHER]), aulaController.update);
router.delete('/:id', roleMiddleware([Role.TEACHER]), aulaController.delete);
router.post('/', roleMiddleware([Role.TEACHER]), aulaController.create);

export default router;
