import { Request, Response } from 'express'

import Account from '../models/Account'

export async function createAccount(req: Request, res: Response) {
  const { accountNumber, type, userId } = req.body

  if (!accountNumber || !type || !userId) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['accountNumber', 'type', 'userId'],
    })
  }

  const validTypes = ['checking', 'savings']
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      error: 'Invalid account type',
      validOptions: validTypes,
    })
  }

  try {
    const account = await Account.create({ ...req.body })
    res.status(201).json(account)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create account', details: err })
  }
}

export async function listAccounts(_: Request, res: Response) {
  const accounts = await Account.find()
  res.json(accounts)
}

export async function fetchAccountByAccountNumber(req: Request, res: Response) {
  const account = await Account.findOne({ accountNumber: req.params.accountNumber })
  if (!account) return res.status(404).json({ error: 'Account not found' })
  res.json(account)
}

export async function updateAccountByAccountNumber(req: Request, res: Response) {
  const account = await Account.findOneAndUpdate(
    { accountNumber: req.params.accountNumber },
    req.body,
    { new: true }
  )
  if (!account) return res.status(404).json({ error: 'Account not found' })
  res.json(account)
}

export async function deleteAccountByAccountNumber(req: Request, res: Response) {
  const result = await Account.deleteOne({ accountNumber: req.params.accountNumber })
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Account not found' })
  res.status(204).send()
}