// models/Session.js
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    trackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track', // Reference to the track
        required: true,
    },
    order: {
        type: Number,
        required: true,
        unique: true, // Ensures unique order for sequencing
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true, // Only active sessions are considered
    },
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
