const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const usersController = require('../controllers/usersController')(User);


  const router = express.Router();

  router.get('/', usersController.get);
  router.post('/', usersController.signUp);
  router.get('/:userId', usersController.getUserById);


module.exports = router;