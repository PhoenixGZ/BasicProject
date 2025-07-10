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

export {createUser, getUsers}