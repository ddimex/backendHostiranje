const mongoose = require("mongoose");
const User = require("../users/userSchema");

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Post must contain text"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
