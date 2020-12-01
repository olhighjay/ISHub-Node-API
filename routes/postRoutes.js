const express = require('express');
const postsController = require('../controllers/postsController');

function router(){
  const postRouter = express.Router();
  const controller = postsController();

  postRouter.route('/posts')
  .post(controller.post);

  return postRouter;
}


module.exports = router;