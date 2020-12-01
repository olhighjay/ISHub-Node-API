require('./db/mongoose');

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;
const postRouter = require('./routes/postRoutes')();

app.get('/', (req, res) => {
  res.send('Welcome to my first node js API');
  console.log('work');
});



app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', postRouter);

app.listen(port, () => {
  debug(`Server is running on ${chalk.green(port)}`);
});

debug('my name is Ifeoluwa');