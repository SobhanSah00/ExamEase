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
router.route("/").get(verifyJwt, viewPosts); // View all posts
router.route("/").post(verifyJwt, createPost); // Create a new post
router.route("/:id").patch(verifyJwt, editPost); // Edit a post
router.route("/:id").delete(verifyJwt, deletePost); // Delete a post

export default router;
