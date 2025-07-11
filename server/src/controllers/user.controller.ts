import { Request, Response } from 'express';
import { User } from '../models/User';

async function createUser(req: Request, res: Response) {
    try {
        const { name, email } = req.body ?? {};
        console.log(name, email);
        
        const user = new User({ name, email });
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Failed to get users' });
    }
}

async function getUsers(req: Request, res: Response) {
    try {
        const users = await User.find().lean();
        res.status(200).json(users);
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to get users' });
      }
}

async function updateUser (req: Request, res: Response){
    const { id } = req.params
    const { name, email } = req.body
  
    try {
      const user = await User.findByIdAndUpdate(id, { name, email }, { new: true })
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
  
      res.json(user)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }

export {createUser, getUsers, updateUser}