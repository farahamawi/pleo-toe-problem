import { Router } from 'express';
import { router as v1 } from './routes/v1-user';

export const router = Router();

router.use('/v1', v1);
