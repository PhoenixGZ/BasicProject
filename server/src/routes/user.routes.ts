import { Router } from 'express';
import { createUser, getUsers, updateUser} from '../controllers/user.controller';

const router = Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
console.log(`Added route /users\nget: get all created users\npost: create a new user({"name": "Persons Name", "email": "Email@address.com"})\nput: edit existing user`)
export default router;