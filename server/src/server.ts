import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
const PORT: number = parseInt(process.env.FRONTEND_PORT!, 10);
const URL = process.env.FRONTEND_URL!

export default class Server {
  constructor(app: Application) {
    // TODO: Add Acceptable cors params
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    // TODO: Make CORS work as expected using real url/port
      app.use(cors({
      origin: '*', // You can also use origin: '*' for widest compatibility
      credentials: true,
    }));
    // const corsOptions: CorsOptions = {
    //   origin: `http://${URL}:${PORT}`
    // };

    // app.use(cors(corsOptions));
  }
}