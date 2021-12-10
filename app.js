const express = require('express');
const logger = require('morgan');
const  cors = require('cors')

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const postRouter = require('./src/routes/post');
const commentRouter = require('./src/routes/comment');
const categoryRouter = require('./src/routes/categories');
const likeRouter = require('./src/routes/like');

const app = express();
app.use(cors());


app.use(logger('dev'));

// parse application/json
// parse application/x-www-form-urlencoded
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/category', categoryRouter);
app.use('/like', likeRouter);


module.exports = app;
