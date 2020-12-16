const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const authWare = require('../middlewares/auth');
const adminWare = require('../middlewares/adminAuth');
const postWare = require('../middlewares/self-postAuth');
const categoriesController = require('../controllers/categoriesController')(Category);


  const router = express.Router();

  
  router.get('/', categoriesController.get);
  router.post('/', adminWare, categoriesController.post);
  router.post('/:categoryId', adminWare, categoriesController.updateCategory);
  router.delete('/:categoryId', adminWare, categoriesController.deleteCategory);

  


module.exports = router;