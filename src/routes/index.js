var express = require('express');
var router = express.Router();
// const User = require("../models/users");
// const Post = require("../models/posts");
// const Comment = require("../models/comments");
// const Like = require("../models/likes");


/* GET home page. */
router.get('/', async (req, res, next) => {
  // await User.remove({})
  // await Post.remove({})
  // await Comment.remove({})
  // await Like.remove({})
  res.send({
    message: " Welcome Home"
  });
});

module.exports = router;
