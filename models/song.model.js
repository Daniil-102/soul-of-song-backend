import mongoose from 'mongoose';

const LineSchema = mongoose.Schema({
  chords: {
    type: [String],
    default: [],
  },
  text: {
    type: String,
    required: true,
  },
});

const PartSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lines: {
    type: [LineSchema],
    required: true,
  },
});

const SongSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  originalTone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  parts: {
    type: [PartSchema],
    required: true,
  },
});

const Song = mongoose.model('Song', SongSchema);

export default Song;
