import { Router } from 'express'
import { fetchUserByID, updateUserByID, deleteUserByID } from '../controllers/user.controller'

const router = Router()

router.get('/users/:userId', fetchUserByID)
router.patch('/users/:userId', updateUserByID)
router.delete('/users/:userId', deleteUserByID)

export default router
