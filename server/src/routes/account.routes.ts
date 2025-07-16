import { Router } from 'express'

import {createAccount, listAccounts, fetchAccountByAccountNumber, updateAccountByAccountNumber, deleteAccountByAccountNumber} from '../controllers/account.controller'
import {createTransaction, listAccountTransaction, fetchAccountTransactionByID} from '../controllers/transaction.controller'
import { injectAccount } from '../middleware/account.middleware'

const router = Router()

router.post('/', createAccount)
router.get('/', listAccounts)
router.get('/:accountNumber', injectAccount, fetchAccountByAccountNumber)
router.patch('/:accountNumber', injectAccount,updateAccountByAccountNumber)
router.delete('/:accountNumber', injectAccount, deleteAccountByAccountNumber)

// Transactions seemed to fit here too
router.post('/:accountNumber/transactions', injectAccount, createTransaction)
router.get('/:accountNumber/transactions', injectAccount, listAccountTransaction)
router.get('/:accountNumber/transactions/:transactionId', injectAccount, fetchAccountTransactionByID)

export default router;