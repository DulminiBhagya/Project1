import Participant from '../models/Participant.js';

/**
 * Validate QR Code data
 */
export const validateQRCode = async (req, res) => {
    try {
        const { qrData } = req.body;

        if (!qrData) {
            return res.status(400).json({ message: 'QR Code data is required' });
        }

        // Extract participant ID from QR Code data
        const participantId = qrData.split('Participant ID: ')[1];

        const participant = await Participant.findById(participantId);

        if (!participant) {
            return res.status(404).json({ message: 'Participant not found' });
        }

        res.status(200).json({
            message: 'QR Code validated successfully',
            participant,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to validate QR Code', error: error.message });
    }
};
