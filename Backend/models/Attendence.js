import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
    {
        participantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Participant', // Reference to the Participant model
            required: true,
        },
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Session', // Reference to the Session model
            required: true,
        },
        trackId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Track', // Reference to the Track model
            required: true,
        },
        attended: {
            type: Boolean,
            default: false, // Mark if the participant attended the session
        },
    },
    { timestamps: true }
);

export default mongoose.model('Attendance', attendanceSchema);
