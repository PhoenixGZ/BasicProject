import { Router } from 'express'
import { fetchUserByID, updateUserByID, deleteUserByID } from '../controllers/user.controller'

const router = Router()

router.get('/:userId', fetchUserByID)
router.patch('/:userId', updateUserByID)
router.delete('/:userId', deleteUserByID)

export default router
