import "dotenv/config";
import { Router } from 'express';
import { createFeatureController, deleteFeatureController, getFeaturesController, updateFeatureController, updateFeatureStatusController } from './controller';
import { validate } from '../middleware/validate';
import { createFeatureSchema, featureQuerySchema, updateFeatureSchema, updateFeatureStatusSchema } from './validations';


const router = Router();

router.get('/', validate(featureQuerySchema, "query"), getFeaturesController);
router.post('/', validate(createFeatureSchema, "body"), createFeatureController);
router.put('/:id', validate(updateFeatureSchema, "body"), updateFeatureController);
router.patch('/:id/status', validate(updateFeatureStatusSchema, "body"), updateFeatureStatusController);
router.delete('/:id', deleteFeatureController);

export default router;