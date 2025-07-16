import { Request, Response } from 'express'

import Account from '../models/Account'
import Transaction from '../models/Transaction'
import { v4 as uuidv4 } from 'uuid'

export async function createTransaction(req: Request, res: Response) {
    const { accountNumber } = req.params
    const { type, amount, description } = req.body
  
    if (!type || typeof amount !== 'number') {
      return res.status(400).json({
        error: 'Missing or invalid fields',
        required: ['type', 'amount'],
      })
    }
  
    const validTypes = ['deposit', 'withdrawal']
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: 'Invalid transaction type',
        validOptions: validTypes,
      })
    }
  
    const account = await Account.findOne({ accountNumber })
    if (!account) {
      return res.status(404).json({ error: 'Account not found' })
    }
  
    if (type === 'withdrawal' && account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' })
    }
  
    try {
      const transaction = await Transaction.create({
        transactionId: uuidv4(),
        accountNumber,
        type,
        amount,
        description,
      })
  
      account.balance += type === 'deposit' ? amount : -amount
      await account.save()
  
      res.status(201).json(transaction)
    } catch (err) {
      res.status(400).json({ error: 'Failed to create transaction', details: err })
    }
  }
  export async function listAccountTransaction(req: Request, res: Response) {
    const { accountNumber } = req.params
    const transactions = await Transaction.find({ accountNumber })
    res.json(transactions)
  }
  
  export async function fetchAccountTransactionByID(req: Request, res: Response) {
    const { transactionId } = req.params
    const transaction = await Transaction.findOne({ transactionId })
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' })
    res.json(transaction)
  }
  