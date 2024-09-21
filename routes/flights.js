import { Router } from 'express';
import Flight from '../models/Flight.js';
import jwt from 'jsonwebtoken';

const { verify } = jwt;

const router = Router();

// JWT doğrulama middleware
const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.userId;
        next();
    });
};

// Uçuş ekleme
router.post('/', authenticate, async (req, res) => {
    const { flightNumber, destination, departureTime } = req.body;
    const flight = new Flight({ flightNumber, destination, departureTime, userId: req.userId });
    await flight.save();
    res.status(201).json(flight);
});

// Uçuşları listeleme
router.get('/', authenticate, async (req, res) => {
    const flights = await Flight.find({ userId: req.userId });
    res.json(flights);
});

export default router;
