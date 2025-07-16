import { Router } from 'express'
import {createUser} from '../controllers/user.controller'
import {loginUser} from '../controllers/auth.controller'

const router = Router()

router.post('/users', createUser)
router.use('/auth', loginUser)

export default router
