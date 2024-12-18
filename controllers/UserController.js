import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { validationResult } from 'express-validator';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      passwordHash: hash,
      email: req.body.email,
      name: req.body.name,
    });

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({
      message: 'Wrong data',
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      console.log('no user');
      return res.status(404).json({
        message: 'Wrong data',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: 'Wrong data',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret',
      { expiresIn: '30d' }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return res.status(404).json({ message: 'Wrong data' });
  }

  const { passwordHash, ...userData } = user._doc;

  res.json(userData);
  try {
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
};
