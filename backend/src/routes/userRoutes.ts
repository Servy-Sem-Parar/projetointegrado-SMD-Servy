import express from 'express';
import userController from '@controllers/userController';

const router = express.Router();

router.get('/', userController.list);
router.put('/', userController.create);

export default router;
