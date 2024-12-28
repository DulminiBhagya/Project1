// controllers/sessionController.js
import Session from '../models/Session.js';

/**
 * Get the next session
 */
export const getNextSession = async (req, res) => {
    try {
        const { currentOrder } = req.params;

        // Find the next session based on the order
        const nextSession = await Session.findOne({
            order: { $gt: currentOrder }, // Order should be greater than the current session
            isActive: true, // Only active sessions
        }).sort({ order: 1 }); // Sort by ascending order to get the next session

        if (!nextSession) {
            return res.status(404).json({ message: 'No next session found' });
        }

        res.status(200).json(nextSession);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * Create a session
 */
export const createSession = async (req, res) => {
    try {
        const { title, trackId, order, startTime, endTime, isActive } = req.body;

        // Validate required fields
        if (!title || !trackId || typeof order !== 'number' || !startTime || !endTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new session
        const session = new Session({
            title,
            trackId,
            order,
            startTime,
            endTime,
            isActive,
        });

        // Save the session to the database
        await session.save();

        res.status(201).json({ message: 'Session created successfully', session });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Order must be unique' });
        }
        res.status(500).json({ message: 'Failed to create session', error: error.message });
    }
};
