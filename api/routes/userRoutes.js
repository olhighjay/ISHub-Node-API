const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const usersController = require('../controllers/usersController')(User);


  const router = express.Router();

  router.get('/', usersController.get);
  router.post('/register', usersController.signUp);
  router.get('/:userId', usersController.getUserById);
  router.post('/:userId', usersController.updateUser);
  router.delete('/:userId', usersController.deleteUser);


module.exports = router;