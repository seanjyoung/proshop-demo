import express from "express";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 6100;

connectDB(); // Connect to MongDB

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);

// Allows us to handle errors by just throwing a new error and setting a status code
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
