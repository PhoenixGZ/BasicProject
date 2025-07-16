import { Request, Response } from 'express'
import User from '../models/User'
import { v4 as uuidv4 } from 'uuid'

export async function createUser(req: Request, res: Response) {
    try {
      const user = await User.create({ ...req.body, id: uuidv4() })
      res.status(201).json(user)
    } catch (err) {
      res.status(400).json({ error: 'Failed to create user', details: err })
    }
  }
  
  export async function fetchUserByID(req: Request, res: Response) {
    const user = await User.findOne({ id: req.params.userId })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  }
  
  export async function updateUserByID(req: Request, res: Response) {
    const user = await User.findOneAndUpdate({ id: req.params.userId }, req.body, { new: true })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  }
  
  export async function deleteUserByID(req: Request, res: Response) {
    const result = await User.deleteOne({ id: req.params.userId })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' })
    res.status(204).send()
  }