const express = require('express');
const { body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email')   
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (value, { }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject('E-Mail address already exists!');
        }
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;

