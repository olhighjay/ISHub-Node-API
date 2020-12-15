const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const User = require('../models/userModel');
const usersController = require('../controllers/usersController')(User);

  const router = express.Router();

  router.get('/', usersController.get);
  router.post('/register', usersController.signUp);
  router.post('/signin', usersController.signIn);
  router.get('/:userId', usersController.getUserById);
  router.post('/:userId', usersController.updateUser);
  router.delete('/:userId', usersController.deleteUser);


module.exports = router;