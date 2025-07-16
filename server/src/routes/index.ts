import { Application } from "express";

import bankingRoutes from './banking.routes';

export default class Routes {
  constructor(app: Application) {
    app.use('/', bankingRoutes);
  }
}