import express, { Application } from "express";
import Server from "./src/server";

const app: Application = express();
import { connectToDatabase } from './src/config/mongoose';
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const URL = "localhost";
console.log("Hey1?")

connectToDatabase().then(() => {
  app.listen(PORT, URL, function () {
    console.log(`Server is running on port ${URL}:${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
});