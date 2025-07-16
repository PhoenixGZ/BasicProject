import { Request, Response } from 'express'

import Account from '../models/Account'
import Transaction from '../models/Transaction'
import { v4 as uuidv4 } from 'uuid'

export async function createTransaction(req: Request, res: Response) {
    const { accountNumber } = req.params
    const { type, amount, description } = req.body
  
    const account = await Account.findOne({ accountNumber })
    if (!account) return res.status(404).json({ error: 'Account not found' })
  
    const transactionId = uuidv4()
  
    const transaction = await Transaction.create({
      transactionId,
      accountNumber,
      type,
      amount,
      description
    })
  
    // update account balance
    if (type === 'deposit') {
      account.balance += amount
    } else if (type === 'withdrawal') {
      if (account.balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds' })
      }
      account.balance -= amount
    }
  
    await account.save()
    res.status(201).json(transaction)
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
  