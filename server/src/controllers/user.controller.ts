import { Request, Response } from 'express';
import { User } from '../models/User';

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json(user);
}