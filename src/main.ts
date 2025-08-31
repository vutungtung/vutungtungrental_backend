import express from "express";
import dotenv from "dotenv";
import { vehicleRouter } from "./Router/vehicleRouter";
import { categoryRouter } from "./Router/categoryRouter";
import path from "path";
import { getVehicleById, getVehicles } from "./Modal/vehicleModal";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Must have JSON body parser middleware
app.use(express.json());

app.use("/api/vehicles", vehicleRouter);
app.use("/api/category", categoryRouter);
// app.use("/uploads", express.static("uploads"));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.urlencoded({ extended: true }));

// Simple route to view uploaded images
// to check if images are uploaded successfully
// Access via: http://localhost:4000/view-images

app.get("/:v_id/view-images", async (req, res) => {
  const id = Number(req.params.v_id);
  const vehicle = await getVehicleById(id);
  if (!vehicle) {
    res.status(404).json({ error: "Vehicle not found" });
    return;
  }
  let html = "<h1>Vehicle Images</h1>";
  html += `<div>
    <h3>${vehicle.name}</h3>
      <img src="/uploads/vehicles/${vehicle.image}" width="300"/><br/>
      <img src="/uploads/vehicles/${vehicle.image1}" width="300"/><br/>
      <img src="/uploads/vehicles/${vehicle.image2}" width="300"/><br/>
    </div><hr/>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
