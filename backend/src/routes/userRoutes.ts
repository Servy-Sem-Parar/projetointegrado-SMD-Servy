import express from 'express';
import userController from '@controllers/userController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', roleMiddleware([Role.ADMIN]), userController.list);
router.get('/professoras', roleMiddleware([Role.ADMIN, Role.TEACHER]), userController.professoras);
router.get('/alunas', roleMiddleware([Role.ADMIN, Role.TEACHER]), userController.alunas);
router.get('/:id', roleMiddleware([Role.ADMIN, Role.SELF]), userController.read);
router.put('/:id', roleMiddleware([Role.ADMIN, Role.SELF]), userController.update);
router.delete('/:id', roleMiddleware([Role.ADMIN, Role.SELF]), userController.delete);
router.post('/', roleMiddleware([Role.ADMIN]), userController.create);

export default router;
