
import { Router } from 'express';
import { getEnvelopes, addIncome, allocateIncome, spendFromEnvelope, getIncomeAndEnvelopes, createEnvelope} from '../controllers/letter.controller';

const router = Router();

router.get('/', getIncomeAndEnvelopes)
router.get('/envelopes', getEnvelopes)
router.post('/create', createEnvelope);
router.post('/income', addIncome)
router.post('/allocate', allocateIncome)
router.post('/spend', spendFromEnvelope)

export default router