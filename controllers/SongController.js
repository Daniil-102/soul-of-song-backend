import Song from '../models/song.model.js';
import SongChanges from '../models/userSongChanges.model.js';

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSong = async (req, res) => {
  try {
    const song = await Song.create(req.body);

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeSong = async (req, res) => {
  const { songId, modifiedParts } = req.body;

  try {
    let userChanges = await SongChanges.findOne({
      userId: req.userId,
      songId,
    });

    if (userChanges) {
      userChanges.modifiedParts = modifiedParts;
    } else {
      userChanges = new SongChanges({
        userId: req.userId,
        songId,
        modifiedParts,
      });
    }

    await userChanges.save();
    res.status(200).send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
};

export const getSong = async (req, res) => {
  const { id: songId } = req.params;

  try {
    const song = await Song.findById(songId);
    if (!song) return res.status(404).send('Песня не найдена');

    const userChanges = await SongChanges.findOne({
      userId: req.userId,
      songId: String(song.id),
    });

    const songs = await SongChanges.find();

    if (userChanges) {
      const modifiedSong = { ...song.toObject() };
      userChanges.modifiedParts.forEach((modifiedPart) => {
        const part = modifiedSong.parts.find((p) => p.id === modifiedPart.id);
        if (part) {
          part.lines = modifiedPart.lines;
        }
      });

      return res.json(modifiedSong);
    }

    res.json({ ...song, name: 'usual' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
};
