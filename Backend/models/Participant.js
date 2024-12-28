import mongoose from 'mongoose'; 

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    organization: {
        type: String,
    },
    qrCode: {
        type: String,
    },
    sessionsRegistered: {
        type: [String], // Array of session IDs
        default: [],
    },
}, { timestamps: true });

export default mongoose.model('Participant', participantSchema);