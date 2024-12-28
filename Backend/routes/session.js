// routes/sessionRoutes.js
import express from 'express';
import { createSession, getNextSession } from '../controllers/sessioncontroller.js';

const router = express.Router();

// Route to create a session
router.post('/', createSession);

// Route to get the next session
router.get('/next/:currentOrder', getNextSession);

export default router;
