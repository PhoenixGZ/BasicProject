import { Application } from "express";

import publicRoutes from './public.routes';
import userRoutes from './user.routes';
import accountRoutes from './account.routes';

export default class Routes {
  constructor(app: Application) {
    app.use('/v1', publicRoutes);
    app.use('/v1/user', userRoutes);
    app.use('/v1/account', accountRoutes);
  }
}