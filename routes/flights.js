import { Router } from "express";
import Flight from "../models/Flight.js";
import jwt from "jsonwebtoken";

const { verify } = jwt;

const router = Router();

// JWT doğrulama middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
};

// Uçuş ekleme
router.post("/", authenticate, async (req, res) => {
  try {
    const {
      flightNumber,
      departureTime,
      arrivalTime,
      departureCity,
      arrivalCity,
      departureAirplane,
      arrivalAirplane,
      time,
    } = req.body;

    const flight = new Flight({
      flightNumber,
      departureTime,
      arrivalTime,
      departureCity,
      arrivalCity,
      departureAirplane,
      arrivalAirplane,
      time,
      userId: req.userId,
    });

    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create flight", details: error.message });
  }
});

// Uçuşları listeleme
router.get("/", authenticate, async (req, res) => {
  const flights = await Flight.find({ userId: req.userId });
  res.json(flights);
});

// Uçuş silme
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Kullanıcının silmek istediği uçuşu bul
    const flight = await Flight.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.status(200).json({ message: "Flight deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete flight", details: error.message });
  }
});

export default router;
