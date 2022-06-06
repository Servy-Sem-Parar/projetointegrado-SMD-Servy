import express from 'express';
import disciplinaController from '@controllers/disciplinaController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', roleMiddleware([Role.TEACHER, Role.STUDENT]), disciplinaController.list);
router.get('/:id', roleMiddleware([Role.TEACHER, Role.STUDENT]), disciplinaController.read);
router.put('/:id', roleMiddleware([Role.TEACHER]), disciplinaController.update);
router.delete('/:id', roleMiddleware([Role.TEACHER]), disciplinaController.delete);
router.post('/', roleMiddleware([Role.TEACHER]), disciplinaController.create);

export default router;
