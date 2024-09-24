import dotenv from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import flightRoutes from "./routes/flights.js";

import cors from "cors";

// .env dosyasını yükle
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend çalıştığı URL
    credentials: true,
  })
);

app.use(json());

// MongoDB bağlantısıß
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB bağlantı hatası: ${error.message}`);
    process.exit(1); // Hata durumunda uygulamayı kapat
  }
};

// Bağlantıyı başlat
connectDB();

// API
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
