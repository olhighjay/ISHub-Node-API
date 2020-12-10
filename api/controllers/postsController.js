const chalk = require('chalk');
const mongoose = require('mongoose');
const { populate } = require('../models/postModel');
const debug = require('debug')('app:postsController');

function postsController(Post, Category) {
  async function get(req, res, next){
    try{
        const posts = await Post.find().populate("category");;
        // const category = await populate("category");
        console.log(posts);
        const response = {
        count: posts.length,
          posts: posts.map(post => {
            return {
              title: post.title,
              body: post.body,
              category: post.category,
              _id: post._id,
              request: {
                type: 'GET',
                url: 'http://localhost:4000/api/orders/' + post._id
              }
            }
          })
        };
        res.status(200).json(response);

    }
    catch(err){
      console.log(err);
      res.status(500).json({error: err.message});
    }
  }

  async function post(req, res, next){
    const id = req.body.categoryId;
    console.log(id);
    try{
      const category = await Category.findById(id);
      console.log(category);
        if(!category){
          return res.status(404).json({
            error: "Category does not exist"
          });
        }
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        category: id,
      });
      await post.save();
      console.log(post);
      res.status(201).json({
        message: 'Post was created successfully',
        createdProduct: {
          title: post.title,
          body: post.body,
          category: post.category,
          _id: post._id,
          request: {
            type: 'GET',
            url: 'http://localhost:4000/api/posts/' + post._id
          }
        }
      });
    }
    catch(err) {
      console.log(err);
      res.status(500).json({
        error: err.message
      });
    };
    
    
  }

  async   function getPostById(req, res, next){
    const id = req.params.postId;
    try{
     
      const post = await Post.findById(id);
      // .select("product quantity _id")
      // const user = populate('user');
    
        console.log("From database", post);
        if(post){
          res.status(200).json({
            post: post,
            request: {
              type: 'GET',
              description: 'Get all the posts', 
              url: 'http://localhost:4000/api/posts/'
            }
          });
        }
        else{
          res.status(404).json({
            error: "Post not found"
          });

        }
        
      
     
    }
    catch(err){
      console.log(err.message);
      res.status(500).json({
        error: err.stack
      });
    }
  };

  return {
    get,
    post,
    getPostById
  };
}

module.exports = postsController;