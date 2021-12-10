const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
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

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
