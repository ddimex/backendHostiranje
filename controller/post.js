const express = require("express");
const Posts = require("../pkg/db/posts/postSchema");
const User = require("../pkg/db/users/userSchema");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.find().populate("author").sort({ createdAt: -1 });

    res.status(200).render("homepage", {
      posts: posts,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};