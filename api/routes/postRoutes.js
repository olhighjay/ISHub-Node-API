const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/postModel');
const postsController = require('../controllers/postsController')(Post);


  const router = express.Router();

  router.get('/posts', postsController.get);
  router.post('/posts', postsController.post);


module.exports = router;