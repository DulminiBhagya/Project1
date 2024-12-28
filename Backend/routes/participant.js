import express from 'express';
import { registerParticipant } from '../controllers/participantcontroller.js';

const router = express.Router();

// Route to register a participant
router.post('/register', registerParticipant);

export default router;
