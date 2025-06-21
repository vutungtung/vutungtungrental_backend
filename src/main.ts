import express from "express";
import dotenv from "dotenv";
import { vehicleRouter } from "./Router/vehicleRouter";
import { categoryRouter } from "./Router/categoryRouter";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;

// Must have JSON body parser middleware
app.use(express.json());

app.use("/api/vehicles", vehicleRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
