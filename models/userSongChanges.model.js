import mongoose from 'mongoose';

const LineSchema = new mongoose.Schema({
  chords: {
    type: [String],
    default: [],
  },
  text: {
    type: String,
    required: true,
  },
});

const ModifiedPartSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  lines: {
    type: [LineSchema],
    required: true,
  },
});

const SongChangesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  songId: {
    type: String,
    required: true,
  },
  modifiedParts: {
    type: [ModifiedPartSchema],
    required: true,
  },
});

const SongChanges = mongoose.model('SongChanges', SongChangesSchema);

export default SongChanges;
