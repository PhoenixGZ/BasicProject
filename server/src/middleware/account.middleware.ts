import { Request, Response, NextFunction } from 'express'
import Account from '../models/Account'

export async function injectAccount(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).userId
  const requestedAccountId = req.params.accountNumber

  if (!requestedAccountId) {
    console.log("No accountId found")
    return res.status(401)
  }

  try {
    const account = await Account.findOne({ id: requestedAccountId })
    if (!account) {
      return res.status(404).json({ error: 'Expected account not found' })
    }

    if(!isAuthorized(userId, account.userId)) {
      return res.status(403).json({ error: 'Access denied: cannot update other users account' })
    }


    ;(req as any).account = account
    next()
  } catch (err) {
    console.error('Error injecting user:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

function isAuthorized(authId: string, targetId: string): boolean {
    return String(authId).trim() === String(targetId).trim()
  }  