import Post from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";
import { User } from "../models/user.model.js";

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user._id; // `req.user` is populated by the `verifyJwt
  const post = await Post.create({ title, content, createdBy: userId });
  // i do not want to send full post with user data ,return  only username and avartar 
  const user = await User.findById(userId);
  const postResponse = {
    _id: post._id,
    title: post.title,
    content: post.content,
    username: user.username,
    avatar: user.avatar,
  }
  return res.status(201).json(postResponse);
})

export const editPost  = asyncHandler(async(req,res) => {
  const { id } = req.params; 
  const userId = req.user._id;
  const { title, content } = req.body;
  const user = await User.findById(userId)
  if(!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const post = await Post.findOne({ _id: id, createdBy: userId });
  if(!post){
    return res.status(403).json(new ApiResponse(403, "Unauthorized or post not found"))
  }
  post.title = title;
  post.content = content;
  await post.save();
  const postResponse = {
    _id: post._id,
    title: post.title,
    content: post.content,
    username: user.username,
    avatar : user.avatar
  }
  res.status(200).json(new ApiResponse(200, "Post edited successfully", post));
})

export const deletePost = asyncHandler(async(req,res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const post = await Post.findOneAndDelete({ _id: id, createdBy: userId });
  if(!post){
    return res.status(403).json(new ApiResponse(403, "Unauthorized or post not found"))
  }
  res.status(200).json(new ApiResponse(200, "Post deleted successfully"));
})

export const viewPosts = asyncHandler(async(req,res) => {
  // View all posts (own posts and others' posts)
  const posts = await Post.find().populate('createdBy');
  res.status(200).json(posts);
})