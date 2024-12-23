import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    uploadRepo,editRepo,deleteRepo,viewRepo
} from "../controllers/repo.controllers.js"

import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

// Secured routes for posts
router.route("/view-repo").get(verifyJwt, viewRepo); // View all posts
router.route("/create-repo").post(verifyJwt,upload.single("file"), uploadRepo); // Create a new post
router.route("/edit-repo/:id").patch(verifyJwt,upload.single("file"), editRepo); // Edit a post
router.route("/delete-repo/:id").delete(verifyJwt, deleteRepo); // Delete a post

export default router;
