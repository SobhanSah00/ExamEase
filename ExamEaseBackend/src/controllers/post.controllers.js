import Post from "../models/post.model.js";

// Create a new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id; // `req.user` is populated by the `verifyJwt` middleware

  try {
    const post = await Post.create({ title, content, createdBy: userId });
    res.status(201).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating post", error });
  }
};

// Edit an existing post
export const editPost = async (req, res) => {
  const { id } = req.params; // Post ID
  const userId = req.user.id; // Authenticated user's ID
  const { title, content } = req.body;

  try {
    const post = await Post.findOne({ _id: id, createdBy: userId });
    if (!post) {
      return res.status(403).json({ success: false, message: "Unauthorized or post not found" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error editing post", error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const post = await Post.findOneAndDelete({ _id: id, createdBy: userId });
    if (!post) {
      return res.status(403).json({ success: false, message: "Unauthorized or post not found" });
    }

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting post", error });
  }
};

// View all posts (own posts and others' posts)
export const viewPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await Post.find({});
    const ownPosts = posts.filter(post => post.createdBy.toString() === userId);
    const othersPosts = posts.filter(post => post.createdBy.toString() !== userId);

    res.status(200).json({ success: true, ownPosts, othersPosts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching posts", error });
  }
};
