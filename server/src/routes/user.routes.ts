import { Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers)
console.log(`Added route /users\nget: get all created users\npost: create a new user({"name": "Persons Name", "email": "Email@address.com"})\n`)
export default router;