const chalk = require('chalk');

const debug = require('debug')('app:postsController');

function postsController() {
  function post(req, res){
    const posted = req.body;
    debug(chalk.green('The Post endpoint is active'));
    return res.json(posted);
  }

  return {post};
}

module.exports = postsController;