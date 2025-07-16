import { Router } from 'express'
import {createUser, fetchUserByID, updateUserByID, deleteUserByID} from '../controllers/user.controller'
import {createTransaction, listAccountTransaction, fetchAccountTransactionByID} from '../controllers/transaction.controller'
import {createAccount, listAccounts, fetchAccountByAccountNumber, updateAccountByAccountNumber, deleteAccountByAccountNumber} from '../controllers/account.controller'

const router = Router()

// ======= ACCOUNTS =======

router.post('/v1/accounts', createAccount)
router.get('/v1/accounts', listAccounts)
router.get('/v1/accounts/:accountNumber', fetchAccountByAccountNumber)
router.patch('/v1/accounts/:accountNumber', updateAccountByAccountNumber)
router.delete('/v1/accounts/:accountNumber', deleteAccountByAccountNumber)

// ======= TRANSACTIONS =======

router.post('/v1/accounts/:accountNumber/transactions', createTransaction)
router.get('/v1/accounts/:accountNumber/transactions', listAccountTransaction)
router.get('/v1/accounts/:accountNumber/transactions/:transactionId', fetchAccountTransactionByID)

// ======= USERS =======

router.post('/v1/users', createUser)
router.get('/v1/users/:userId', fetchUserByID)
router.patch('/v1/users/:userId', updateUserByID)
router.delete('/v1/users/:userId', deleteUserByID)

export default router
