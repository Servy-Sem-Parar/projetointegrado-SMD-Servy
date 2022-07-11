import express from 'express';
import turmaController from '@controllers/turmaController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', turmaController.list);
router.get('/:id', turmaController.read);
router.use(authMiddleware);
router.put('/:id', roleMiddleware([Role.TEACHER]), turmaController.update);
router.post('/finalizar/:id', roleMiddleware([Role.TEACHER]), turmaController.finalizar);
router.delete('/:id', roleMiddleware([Role.TEACHER]), turmaController.delete);
router.post('/', roleMiddleware([Role.TEACHER]), turmaController.create);

export default router;
