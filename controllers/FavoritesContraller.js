import Song from '../models/song.model.js';
import User from '../models/user.model.js';

export const changeFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ message: 'Song ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.favorites.includes(songId)) {
      user.favorites = user.favorites.filter((id) => id.toString() !== songId);
    } else {
      user.favorites.push(songId);
    }

    await user.save();

    res.json({
      message: 'Song added/deleted to/from favorites',
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add/delete to/from favorites',
      error: error.message,
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve favorites', error: error.message });
  }
};
