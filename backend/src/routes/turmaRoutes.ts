import express from 'express';
import turmaController from '@controllers/turmaController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', roleMiddleware([Role.TEACHER, Role.STUDENT]), turmaController.list);
router.get('/:id', roleMiddleware([Role.TEACHER, Role.STUDENT]), turmaController.read);
router.put('/:id', roleMiddleware([Role.TEACHER]), turmaController.update);
router.delete('/:id', roleMiddleware([Role.TEACHER]), turmaController.delete);
router.post('/', roleMiddleware([Role.TEACHER]), turmaController.create);

export default router;
