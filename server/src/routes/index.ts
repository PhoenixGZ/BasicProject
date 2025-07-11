import { Application } from "express";
import homeRoutes from "./home.routes";
import userRoutes from './user.routes';
import letterRoutes from './letter.routes';

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use('/', userRoutes);
    app.use("/envelope", letterRoutes)
    console.log("Added route /api")
  }
}