const chalk = require('chalk');
const mongoose = require('mongoose');
const debug = require('debug')('app:postsController');

function postsController(Post) {
  async function get(req, res, next){
    try{
        const posts = await Post.find();
        const response = {
        count: posts.length,
          order: posts.map(post => {
            return {
              title: post.title,
              body: post.body,
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
    catch{
      console.log(err);
      res.status(500).json({error: err});
    }
  }

  async function post(req, res, next){
    
      try{
        const post = new Post({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          body: req.body.body
        });
        await post.save();
        console.log(post);
        res.status(201).json({
          message: 'Post was created successfully',
          createdProduct: {
            title: post.title,
            body: post.body,
            _id: post._id,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/api/products/' + post._id
            }
          }
        });
      }
      catch(err) {
        console.log(err);
        res.status(500).json({
          error: err.stack
        });
      };
    
    
  }

  

  return {
    get,
    post
  };
}

module.exports = postsController;