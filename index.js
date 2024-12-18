import express from 'express';
import mongoose from 'mongoose';
import checkAuth from './utils/checkAuth.js';
import cors from 'cors';
import { loginValidation, registerValidation } from './validations/auth.js';
import { getMe, login, register } from './controllers/UserController.js';
import {
  changeSong,
  createSong,
  getSong,
  getSongs,
} from './controllers/SongController.js';
import {
  changeFavorites,
  getFavorites,
} from './controllers/FavoritesContraller.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.ljuinnt.mongodb.net/songs?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('error: ', err));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/auth/register', registerValidation, register);

app.post('/auth/login', loginValidation, login);

app.get('/auth/me', checkAuth, getMe);

app.get('/songs', getSongs);

app.get('/songs/:id', checkAuth, getSong);

app.post('/songs', createSong);

app.post('/save-chords', checkAuth, changeSong);

app.get('/favorites', checkAuth, getFavorites);

app.post('/favorites', checkAuth, changeFavorites);

app.listen(3000, () => {
  console.log('Server started');
});
