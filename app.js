require('./api/db/mongoose');
require("dotenv").config();
const config = require('./api/db/_config');
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
//make the folder public
app.use('/api/public/images', express.static('api/public/images'))
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if(req.method === 'OPTIONS'){
    res.header("Access-Control-Allow-Methods", 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})





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
  console.log(app.settings.env);
  // console.log(JSON.stringify(process.env.NODE_ENV));
  console.log(config["mongoURI"][process.env.NODE_ENV]);
});




module.exports = app;