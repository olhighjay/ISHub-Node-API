const chalk = require('chalk');
const mongoose = require('mongoose');
const debug = require('debug')('app:postsController');
const fs = require('fs'); 

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
    // console.log(req.file);
    const id = req.body.category;
    
    try{
      const category = await Category.findById(id);
      // console.log(category);
        if(!category){
          return res.status(404).json({
            error: "Category does not exist"
          });
        }
        // console.log(req.file);
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        category: id
      });
      if(req.file){
        post.coverImage= req.file.path;
      }
      await post.save();
      // console.log(post);
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

  async function updatePost(req, res){
   
    const id = req.params.postId;
    const update = req.body;
    const keysArray = Object.keys(update)
   
    try{
      const post = await Post.findById(id);
      // return res.send(catg);
      if(!post){
        return res.status(404).json({
          error: "Post not found"
        });
      }

      // Check if the category in the request is valid
      if(update.category){
        const catg = await Category.findById(update.category);
        if(!catg){
          throw new Error('Invalid category');
        }
      }
      // console.log(catg);

      keysArray.forEach(key => {
        post[key] = update[key];
      })
      //Update cover image
      if(req.file){
        // delete the image from storage
        fs.unlink( post.coverImage, err => { 
          if(err){
            console.log(err);
          }
        });
        // upload the image from  the database
        post.coverImage = req.file.path;
      }

      await post.save();
      
      // const category = await Category.findOneAndUpdate(id, {$set: {name: req.body.newName, description: req.body.newDescription}}, {
      //   new: true
      // });
      
      res.status(201).json({
        message: "Post updated successfully",
        post: post
      });  
    }
    catch(err){
      console.log(err.message);
      res.status(500).json({
        error: err.message
      });
    }
  };

  async function deletePost(req, res, next){
    const id = req.params.postId;
    try{
     
      const post = await Post.findById(id);
        if(post){
          if(post.coverImage){
            // delete the image from storage
            fs.unlink( post.coverImage, err => { 
              if(err){
                console.log(err);
              }
            });
          }
          await post.remove();
          res.status(200).json({
            message: "Post deleted successfully",
            request: {
              type: 'POST',
              description: 'Create new post', 
              url: 'http://localhost:4000/api/posts/',
              body: {
                title: 'String, required',
                body: 'String, required',
                category: 'String, required',
                coverImage: 'image, max-5mb, jpg-jpeg-png',
              }
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
  }

  return {
    get,
    post,
    getPostById,
    updatePost,
    deletePost
  };
}

module.exports = postsController;