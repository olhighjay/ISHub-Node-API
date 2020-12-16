const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require("express-validator");
const authWare = require('../middlewares/auth');
const adminWare = require('../middlewares/adminAuth');
const postWare = require('../middlewares/self-postAuth');
const validationWare = require('../middlewares/validationAuth');
const valError = require('../middlewares/valError');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const usersController = require('../controllers/usersController')(User, Post);

  const router = express.Router();

  router.get('/', usersController.get);
  router.post('/register',[validationWare],valError, usersController.signUp);
  router.post('/signin', usersController.signIn);
  router.get('/:userId', usersController.getUserById);
  router.post('/:userId', usersController.updateUser);
  router.delete('/:userId', adminWare, usersController.deleteUser);


module.exports = router;