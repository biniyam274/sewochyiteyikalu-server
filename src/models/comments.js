const  mongoose = require("mongoose");
const { Schema } = mongoose;

const  CommentSchema = new Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
},
{
  timestamps: true
});

const  Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment