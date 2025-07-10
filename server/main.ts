import express, { Application } from "express";
import Server from "./src/server";
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { connectToDatabase } from './src/config/mongoose';
const server: Server = new Server(app);
const PORT: number = parseInt(process.env.PORT!, 10);
const URL = process.env.URL!
console.log(`Server is running on ${URL}:${PORT}.`);

connectToDatabase().then(() => {
  app.listen(PORT, URL, function () {
    console.log(`Server is running on ${URL}:${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
});