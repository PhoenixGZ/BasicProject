import { Router } from 'express'

import {createAccount, listAccounts, fetchAccountByAccountNumber, updateAccountByAccountNumber, deleteAccountByAccountNumber} from '../controllers/account.controller'
import {createTransaction, listAccountTransaction, fetchAccountTransactionByID} from '../controllers/transaction.controller'

const router = Router()

router.post('/', createAccount)
router.get('/', listAccounts)
router.get('/:accountNumber', fetchAccountByAccountNumber)
router.patch('/:accountNumber', updateAccountByAccountNumber)
router.delete('/:accountNumber', deleteAccountByAccountNumber)

// Transactions seemed to fit here too
router.post('/:accountNumber/transactions', createTransaction)
router.get('/:accountNumber/transactions', listAccountTransaction)
router.get('/:accountNumber/transactions/:transactionId', fetchAccountTransactionByID)

export default router;