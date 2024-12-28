import express from 'express';
import { createTrack } from '../controllers/trackcontroller.js';

const router = express.Router();


// POST: Create a track
router.post("/create", createTrack);

export default router;
