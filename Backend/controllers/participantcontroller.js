import Participant from '../models/Participant.js';
import { generateQRCode } from '../utils/qrCodeGenerator.js';
import QRCode from 'qrcode';

// Register a new participant and generate a QR code
export const registerParticipant = async (req, res) => {
    const { name, email, organization } = req.body;
    try {
        // Check if the participant already exists
        const existingParticipant = await Participant.findOne({ email });
        if (existingParticipant) {
            return res.status(400).json({ message: 'Participant already registered' });
        }

        // Create a new participant
        const participant = new Participant({ name, email, organization });
        await participant.save();

        // Generate QR Code
        const qrCode = await generateQRCode(`Participant ID: ${participant._id}`);
        participant.qrCode = qrCode; // Assuming the Participant model has a qrCode field
        await participant.save();

        res.status(201).json({
            message: 'Participant created successfully',
            participant,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create participant', error: error.message });
    }
};
export default { registerParticipant };
