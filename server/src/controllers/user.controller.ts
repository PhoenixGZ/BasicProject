import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

export async function createUser(req: Request, res: Response) {
    const { name, email , password} = req.body
  
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'password'],
      })
    }
  
    try {
      const hashed = await bcrypt.hash(password, 10)
      const user = await User.create({ id: uuidv4(), name, email, password: hashed })
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