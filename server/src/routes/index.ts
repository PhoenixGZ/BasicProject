import { Application } from "express";

import publicRoutes from './public.routes';
import userRoutes from './user.routes';
import accountRoutes from './account.routes';
import { injectUser } from '../middleware/injectUser.middleware'
import { authenticate } from '../middleware/auth.middleware'


export default class Routes {
  constructor(app: Application) {
    app.use('/v1', publicRoutes);
    app.use(authenticate);
    app.use('/v1/users/:userId', injectUser, userRoutes);
    app.use('/v1/account', accountRoutes);
  }
}