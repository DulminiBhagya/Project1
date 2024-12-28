import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    order: {
        type: Number,
        required: true, // Order to determine the sequence of tracks
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true, // To filter active tracks
    },
}, { timestamps: true });

export default mongoose.model('Track', trackSchema);
