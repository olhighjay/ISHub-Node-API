require('./api/db/mongoose');
const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const chalk = require('chalk');


const postRouter = require('./api/routes/postRoutes');
const categoryRouter = require('./api/routes/categoryRoutes');
const userRouter = require('./api/routes/userRoutes');



app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);




app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status =404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});






const port = process.env.PORT || 3000;

app.server = app.listen(port, () => {
  console.log(chalk.blue('Running on port ' + port));
});




module.exports = app;