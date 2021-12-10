const Post = require("../models/posts");
const User = require("../models/users");
const Comment = require("../models/comments");
const Like = require("../models/likes");

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.query.id });
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find a  post. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.getByCategoryId = async (req, res) => {
  try {
    let { id } = req.query;
    if (id) {
      console.log({ id });
      Post.find() //grabs all subcategoris
        .where("categoryId")
        .equals(id)
        .exec(function (err, posts) {
          if (err) {
            return res.status(404).send({
              error: {
                message: "Could not find a  post. Try again later.",
              },
            });
          }

          console.log({ posts: posts.length });
          return res.status(200).send(posts);
        });
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find a  post. Because Category is not available.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.getPosts = async (req, res) => {
  try {
    let { content, greaterThan, lessThan } = req.query;
    if (content) {
      Post.find({ content: { $regex: content, $options: "i" } })
        .then((data) => {
          return res.status(200).send(data);
        })
        .catch((err) => {
          return res.status(404).send({
            error: {
              message: err,
            },
          });
        });
    } else {
      Post.find({ createdAt: { $gt: greaterThan, $lt: lessThan } })
        .limit(10)
        .sort("-createdAt")
        .then((data) => {
          return res.status(200).send(data);
        })
        .catch((err) => {
          return res.status(404).send({
            error: {
              message: err,
            },
          });
        });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};
exports.postPost = async (req, res) => {
  try {
    console.log({ body: req.body, query: req.query });
    const { content, title } = req.body;
    const auth = req.userData;
    const user = await User.findOne({ _id: auth._id });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User ot Found to create post. Try again later." });
    }
    if (!content || !title) {
      return res.status(404).send({ message: "Some  fileds are  missing." });
    }
    Post.create({ ...req.body, userId: auth._id }, (error, post) => {
      if (error) return res.send({ error });
      return res.send({ post });
    });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  let { postId } = req.body;
  try {
    Comment.find({})
      .where("postId")
      .equals(postId)
      .populate({ path: 'userId', select: 'image gender' })
      .then((data) => {
        console.log({ data });
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({
          error: {
            message: err,
          },
        });
      });
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.getLikes = async (req, res) => {
  console.log({ params: req.params });
  console.log({ body: req.body });

  let { postId } = req.body;
  try {
    Like.find({})
      .where("postId")
      .equals(postId)
      .then((data) => {
        console.log({ data });
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(404).send({
          error: {
            message: err,
          },
        });
      });
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.putPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.id });
    if (post) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        { ...req.body },
        (error, post) => {
          if (error) return res.send({ error });
          return res.send({ post });
        }
      );
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find the post. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.deletePost = async (req, res) => {
  try {
    Post.findOneAndDelete({ _id: req.body.id }, (error, post) => {
      if (error) {
        return res.status(404).send({
          error: {
            message: "Could not find th post. Try again later.",
          },
        });
      }
      return res.status(200).send({
        message: "success",
        post,
      });
    });
  } catch (e) {
    return res.status(404).send(e);
  }
};
