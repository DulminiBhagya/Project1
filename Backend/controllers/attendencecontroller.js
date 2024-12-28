import Attendance from '../models/Attendence.js';

/**
 * Record attendance
 */
export const recordAttendance = async (req, res) => {
    try {
        const { participantId, sessionId, trackId, attended } = req.body;

        // Validate input
        if (!participantId || !sessionId || !trackId) {
            return res.status(400).json({ message: 'Participant ID, Session ID, and Track ID are required' });
        }

        // Create or update the attendance record
        const attendance = await Attendance.findOneAndUpdate(
            { participantId, sessionId, trackId },
            { attended },
            { upsert: true, new: true }
        );

        res.status(200).json({
            message: 'Attendance recorded successfully',
            attendance,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to record attendance', error: error.message });
    }
};

/**
 * Get attendance for a session
 */
export const getAttendanceForSession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Fetch attendance for the session
        const attendanceRecords = await Attendance.find({ sessionId }).populate('participantId');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance', error: error.message });
    }
};

/**
 * Get attendance for a participant
 */
export const getAttendanceForParticipant = async (req, res) => {
    try {
        const { participantId } = req.params;

        // Fetch attendance for the participant
        const attendanceRecords = await Attendance.find({ participantId })
            .populate('sessionId')
            .populate('trackId');

        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch attendance', error: error.message });
    }
};
