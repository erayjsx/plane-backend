import { Schema, model } from "mongoose";

const FlightSchema = new Schema({
  flightNumber: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureAirplane: { type: String, required: true },
  arrivalAirplane: { type: String, required: true },
  time: { type: Number, required: true }, // flight duration or some time-related value
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model("Flight", FlightSchema);
