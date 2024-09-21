import { Schema, model } from 'mongoose';

const FlightSchema = new Schema({
    flightNumber: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model('Flight', FlightSchema);
