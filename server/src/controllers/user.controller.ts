import { Request, Response } from 'express'
import User from '../models/User'
import Account from '../models/Account'
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

    const user = await User.findOne({ email })
    if(user) {
        return res.status(400).json({ error: 'User with the same email already exists' })
    }
  
    try {
      const hashed = await bcrypt.hash(password, 10)
      const user = await User.create({ id: uuidv4(), name, email, password: hashed })
      res.status(201).json(user)
    } catch (err) {
      console.log("Failed to create user:", err)
      res.status(400).json({ error: 'Failed to create user'})
    }
  }
  
  export async function fetchUserByID(req: Request, res: Response) {
    const authUserId = (req as any).userId
    const requestedUserId = req.params.userId
  
    const user = await getUser(requestedUserId)
  
    // This seems a bit weird, but its the only way I can fulfill both conditions(User not found + user authenticated)
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        userId: requestedUserId
      })
    }

    if (!isAuthorized(authUserId, requestedUserId)) {
        return res.status(403).json({ error: 'Access denied: cannot view other users' })
      }
  
    res.status(200).json(user)
  }
  
  export async function updateUserByID(req: Request, res: Response) {
    const authUserId = (req as any).userId
    const requestedUserId = req.params.userId

    const { name, email, password } = req.body

    if (!name && !email && !password) {
      return res.status(400).json({ error: 'No valid fields to update' })
    }
  
    try {
      const user = await getUser(requestedUserId)

      if (!user) {
        return res.status(404).json({ error: 'User not found', userId: requestedUserId })
      }

      if (!isAuthorized(authUserId, requestedUserId)) {
        return res.status(403).json({ error: 'Access denied: cannot update other users' })
      }

      const updateData: Partial<{ name: string; email: string; password: string }> = {}
      if (name) updateData.name = name
      if (email) updateData.email = email
      if (password) {
        updateData.password = await bcrypt.hash(password, 10)
      }
  
      const userUpdated = await User.findOneAndUpdate(
        { id: requestedUserId },
        updateData,
        { new: true }
      )
    
      res.status(200).json(userUpdated)
    } catch (err) {
      res.status(400).json({ error: 'Failed to update user', details: err })
    }
  }
  
  export async function deleteUserByID(req: Request, res: Response) {
    const userId = req.params.userId
  
    try {
      const user = await User.findOne({ id: userId })
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
  
      const accounts = await Account.find({ userId })
      if (accounts.length > 0) {
        return res.status(400).json({
          error: 'User cannot be deleted while linked accounts exist',
          accounts,
        })
      }
  
      const result = await User.deleteOne({ id: userId })
      if (result.deletedCount === 0) {
        return res.status(400).json({ error: 'Failed to delete user' })
      }
  
      return res.status(204)
    } catch (err) {
      console.error('Error deleting user:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  async function getUser(userId: string) {
    try {
      return await User.findOne({ id: userId }).lean() || null
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }

  function isAuthorized(authId: string, targetId: string): boolean {
    return String(authId).trim() === String(targetId).trim()
  }  