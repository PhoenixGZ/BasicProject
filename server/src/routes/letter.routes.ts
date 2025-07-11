
import { Router } from 'express';
import { getEnvelopes, addIncome, allocateIncome, spendFromEnvelope} from '../controllers/letter.controller';

const router = Router();

router.get('/envelopes', getEnvelopes)
router.post('/income', addIncome)
router.post('/allocate', allocateIncome)
router.post('/spend', spendFromEnvelope)

export default router