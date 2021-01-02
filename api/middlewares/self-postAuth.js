const jwt = require('jsonwebtoken');
const Post = require('../models/postModel');
async function postMiddleware(req, res, next){
  try{
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    // console.log(req.userData);
    const id = req.params.postId;
    const post = await Post.findById(id);
    // console.log(req.userData.userId);
    console.log(post);
    if(req.userData.userId !== post.author && req.userData.role !== 'admin'){
      return res.status(402).json({
        message: 'You are not authorized to perform this action'
      });
    }
    next();
  }
  catch(error){
    return res.status(401).json({
      message: 'Auth failed. make sure you are logged and check the post Id you are trying to delete if it exists'
    });
  }
}

module.exports = postMiddleware;