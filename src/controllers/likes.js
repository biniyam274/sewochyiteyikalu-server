const Comment = require("../models/comments");
const Post = require("../models/posts");
const Like = require("../models/likes");

exports.getByComment = async (req, res) => {
  try {
    const {id} = req.body;
    const likes = await Like.find({}).where('commentId').equals(id);
    if (likes) {
      return res.status(200).send(likes);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find comments. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};


exports.getByPost= async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('userId', 'username');
    if (comments) {
      return res.status(200).send(comments);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find comments. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.getLike = async (req, res) => {
  try {
    const like = await Like.findOne({ _id: req.body.id });
    if (like) {
      return res.status(200).send(like);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find a  like. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};
exports.postLike = async (req, res) => {
  try {
    const auth = req.userData;
    const { postId, commentId } = req.body;
    const post = await Post.findOne({ _id: postId });
    const comment = await Comment.findOne({ _id: commentId });
    if(!post && !comment) {
      return res.status(404).send({
        error: {
          message: "Post or Comment ot Found to create Like. Try again later.",
        },
      });
    }
    if(post){
      Like.create(
        {  userId: auth._id, postId },
        (error, like) => {
          if (error) return res.status(404).send({ error });
          Post.findOneAndUpdate(
            { _id: postId },
            { $push: { likes: like._id } },
            (error, post) => {
              if (error) return res.status(404).send({ error });
              return res.status(200).send(like);
            }
          );
        }
      );
    }
    else{
      Like.create(
        {userId: auth._id, commentId },
        (error, like) => {
          if (error) return res.status(404).send({ error });
          Comment.findOneAndUpdate(
            { _id: postId },
            { $push: { likes: like._id } },
            (error, comment) => {
              if (error) return res.status(404).send({ error });
              return res.status(200).send(like);
            }
          );
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(404).send({ error });
  }
};

exports.putComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.body.id });
    if (comment) {
      Comment.findOneAndUpdate(
        { _id: req.body.id },
        { ...req.body },
        (error, comment) => {
          if (error) return res.status(404).send({ error });
          return res.send({ comment });
        }
      );
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find the Comment. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};

exports.deleteLike = async (req, res) => {
  console.log({body:req.body})
  try {
    Comment.findOneAndDelete({ _id: req.body.id }, (error, comment) => {
      if (error) {
        return res.status(404).send({message: "Could not find th comment. Try again later."});
      }
      return res.status(200).send({
        message: "success",
        comment
      });
    });
  } catch (e) {
    return res.status(404).send({error:e});
  }
};
