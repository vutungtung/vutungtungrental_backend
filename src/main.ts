import express from "express";
import dotenv from "dotenv";
import { vehicleRouter } from "./Router/vehicleRouter";

const app = express();
const PORT = 4000;
dotenv.config();

app.use(express.json());

app.use("/api/vehicles", vehicleRouter);

app.listen(process.env.PORT, () => {
  console.log("You are on port number:", process.env.PORT || PORT);
});
