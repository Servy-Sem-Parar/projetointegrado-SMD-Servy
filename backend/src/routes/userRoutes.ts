import express from 'express';
import userController from '@controllers/userController';
import roleMiddleware from '../middlewares/roleMiddleware';
import Role from '../enums/role';

const router = express.Router();

router.get('/', userController.list);
router.put('/', roleMiddleware([Role.ADMIN]), userController.create);

export default router;
