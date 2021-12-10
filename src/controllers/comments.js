const Comment = require("../models/comments");
const Post = require("../models/posts");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate('userId', 'username').sort({createdAt:-1});
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

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.body.id });
    if (comment) {
      return res.status(200).send(comment);
    } else {
      return res.status(404).send({
        error: {
          message: "Could not find a  Comment. Try again later.",
        },
      });
    }
  } catch (e) {
    return res.status(404).send(e);
  }
};
exports.postComment = async (req, res) => {
  try {
    const auth = req.userData;
    const { postId } = req.body;
    const post = await Post.findOne({ _id: postId });
    console.log({postId,auth});
    if(!post) {
      
      return res.status(404).send({
        error: {
          message: "Post ot Found to create comment. Try again later.",
        },
      });
    }
    await Comment.create(
        {...req.body, userId: auth._id, postId},
        (error, comment) => {
          if (error) return res.status(404).send({error});
          Post.findOneAndUpdate(
              {_id: postId},
              {$push: {comments: comment._id}},
              (error, post) => {
                if (error) return res.status(404).send({error});
                return res.status(200).send(comment);
              }
          );
        }
    );
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

exports.deleteComment = async (req, res) => {

  const {id,postId} = req.body;
  try {
    Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: id } },
      (error, post) => {
        if (error) return res.status(404).send({ error });
        Comment.findOneAndDelete({ _id: req.body.id }, (error, comment) => {
          if (error) {
            return res.status(404).send({message: "Could not find th comment. Try again later."});
          }
          return res.status(200).send({
            message: "success",
            comment
          });
        });
      }
    );
    
  } catch (e) {
    return res.status(404).send({error:e});
  }
};
