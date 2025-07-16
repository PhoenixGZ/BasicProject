import { Router } from 'express'
import {createUser} from '../controllers/user.controller'
import {loginUser} from '../controllers/auth.controller'
import { authenticate } from '../middleware/auth.middleware'

const router = Router()

router.post('/users', createUser)
router.use('/auth', loginUser)

router.use(authenticate)

export default router
