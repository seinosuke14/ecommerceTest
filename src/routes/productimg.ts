import { Router } from 'express';
import { ProductImgController } from '../controllers/productimg';

const router = Router();

router.get('/', ProductImgController.getAll);
router.get('/:id', ProductImgController.getById);
router.post('/', ProductImgController.create);
router.put('/:id', ProductImgController.update);
router.delete('/:id', ProductImgController.delete);
router.post('/bulk', ProductImgController.createBulk);

export default router;
