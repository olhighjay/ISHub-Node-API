const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
const categoriesController = require('../controllers/categoriesController')(Category);


  const router = express.Router();

  
  router.get('/', categoriesController.get);
  router.post('/', categoriesController.post);
  router.put('/:categoryId', categoriesController.updateCategory);
  router.delete('/:categoryId', categoriesController.deleteCategory);

  


module.exports = router;