import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Song',
      default: [],
    },
  },
  { timestamp: true }
);

export default mongoose.model('User', userSchema);
