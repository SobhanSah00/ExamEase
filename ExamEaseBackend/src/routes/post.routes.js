import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createPost,
  editPost,
  deletePost,
  viewPosts,
} from "../controllers/post.controllers.js";

const router = Router();

// Secured routes for posts
router.route("/view-posts").get(verifyJwt, viewPosts); // View all posts
router.route("/create-post").post(verifyJwt, createPost); // Create a new post
router.route("/edit-post/:id").patch(verifyJwt, editPost); // Edit a post
router.route("/delete-post/:id").delete(verifyJwt, deletePost); // Delete a post

export default router;
