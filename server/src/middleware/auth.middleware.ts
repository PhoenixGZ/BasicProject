import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET must be defined')
  }

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid token' })
    }
  
    const token = authHeader.split(' ')[1]
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
      ;(req as any).userId = decoded.userId // attach user ID to request
      next()
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
  }
  