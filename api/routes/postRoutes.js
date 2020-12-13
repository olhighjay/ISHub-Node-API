const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Post = require('../models/postModel');
const Category = require('../models/categoryModel');
const postsController = require('../controllers/postsController')(Post, Category);
const router = express.Router();



const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './api/public/images/cover_images');
  },
  filename: function(req, file, cb){
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    // Store file
    cb(null, true);
  } else{
    // Do  not store file
    cb(new Error('only images with jpeg and png extensions can be uploaded'), false);
  }
};

const upload = multer({
  storage: storage, 
  limits:{
    fileSize: 1024 * 1024 *5
  },
  fileFilter: fileFilter
});


  router.get('/', postsController.get);
  router.post('/', upload.single('coverImage'), postsController.post);
  router.get('/:postId', postsController.getPostById);
  router.post('/:postId', upload.single('coverImage'), postsController.updatePost);
  router.delete('/:postId', postsController.deletePost);


module.exports = router;