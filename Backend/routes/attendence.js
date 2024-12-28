import express from 'express';
import {
    recordAttendance,
    getAttendanceForSession,
    getAttendanceForParticipant,
} from '../controllers/attendencecontroller.js';

const router = express.Router();

// Record attendance
router.post('/', recordAttendance);

// Get attendance for a session
router.get('/session/:sessionId', getAttendanceForSession);

// Get attendance for a participant
router.get('/participant/:participantId', getAttendanceForParticipant);

export default router;
