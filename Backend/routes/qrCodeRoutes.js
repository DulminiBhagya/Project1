import express from 'express';
import { validateQRCode } from '../controllers/qrCodeController.js';

const router = express.Router();

// Route to validate QR Code
router.post('/validate', validateQRCode);

export default router;
