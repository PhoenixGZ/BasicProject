import { Router } from 'express'
import { fetchUserByID, updateUserByID, deleteUserByID } from '../controllers/user.controller'

const router = Router()

router.get('/', fetchUserByID)
router.patch('/', updateUserByID)
router.delete('/', deleteUserByID)

export default router
