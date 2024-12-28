import Track from '../models/Track.js';

/**
 * Create a new track
 */
export const createTrack = async (req, res) => {
  try {
    const { title, description, order, isActive } = req.body;

    // Validate required fields
    if (!title || typeof order !== "number") {
      return res.status(400).json({ message: "Title and order are required and must be valid" });
    }

    // Create a new track instance
    const track = new Track({ 
      title, 
      description, 
      order, 
      isActive 
    });

    // Save to the database
    await track.save();

    res.status(201).json({ 
      message: "Track created successfully", 
      track 
    });
  } catch (error) {
    // Handle unique constraint violation or other errors
    if (error.code === 11000) {
      res.status(400).json({ message: "Order must be unique" });
    } else {
      res.status(500).json({ message: "Failed to create track", error: error.message });
    }
  }
};

/**
 * Get all tracks
 */
export const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ order: 1 }); // Sort tracks by order
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tracks", error: error.message });
  }
};

/**
 * Get a track by ID
 */
export const getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findById(id);

    if (!track) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.status(200).json(track);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch track", error: error.message });
  }
};

/**
 * Update a track
 */
export const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, order, isActive } = req.body;

    // Find and update the track
    const updatedTrack = await Track.findByIdAndUpdate(
      id,
      { title, description, order, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedTrack) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.status(200).json({ message: "Track updated successfully", updatedTrack });
  } catch (error) {
    res.status(500).json({ message: "Failed to update track", error: error.message });
  }
};

/**
 * Delete a track
 */
export const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrack = await Track.findByIdAndDelete(id);

    if (!deletedTrack) {
      return res.status(404).json({ message: "Track not found" });
    }

    res.status(200).json({ message: "Track deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete track", error: error.message });
  }
};
