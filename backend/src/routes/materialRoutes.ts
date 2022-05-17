import express from 'express';
import materialController from '@controllers/materialController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', roleMiddleware([Role.TEACHER, Role.STUDENT]), materialController.list);
router.get('/:id', roleMiddleware([Role.TEACHER, Role.STUDENT]), materialController.read);
router.post('/:id', roleMiddleware([Role.TEACHER]), materialController.update);
router.delete('/:id', roleMiddleware([Role.TEACHER]), materialController.delete);
router.put('/', roleMiddleware([Role.TEACHER]), materialController.create);

export default router;
