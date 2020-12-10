const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const postsController = require('../controllers/postsController')(Post, Category);


  const router = express.Router();

  router.get('/', postsController.get);
  router.post('/', postsController.post);
  router.get('/:postId', postsController.getPostById);


module.exports = router;