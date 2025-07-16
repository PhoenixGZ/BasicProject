import { Request, Response, NextFunction } from 'express'
import User from '../models/User'

export async function injectUser(req: Request, res: Response, next: NextFunction) {
  const userId = (req as any).userId
  const requestedUserId = req.params.userId

  if (!requestedUserId) {
    console.log("No userId found")
    return res.status(401)
  }

  try {
    const user = await User.findOne({ id: requestedUserId })
    if (!user) {
      return res.status(404).json({ error: 'Expected user not found' })
    }

    if(!isAuthorized(userId, requestedUserId)) {
      return res.status(403).json({ error: 'Access denied: cannot update other users' })
    }


    ;(req as any).user = user
    next()
  } catch (err) {
    console.error('Error injecting user:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

function isAuthorized(authId: string, targetId: string): boolean {
    return String(authId).trim() === String(targetId).trim()
  }  