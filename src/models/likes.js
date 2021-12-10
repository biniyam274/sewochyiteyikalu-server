const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: function () {
      return this.commentId ? false : true;
    },
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: function () {
      return this.postId ? false : true;
    },
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
