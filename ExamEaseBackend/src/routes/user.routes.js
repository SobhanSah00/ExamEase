import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentUserPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserResume,
  getUserData
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser); 

//secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changeCurrentUserPassword);
router.route("/update-account").patch(verifyJwt, updateAccountDetails);
router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router.route("/update-resume").patch(verifyJwt, upload.single("resume"), updateUserResume);
router.route("/getUserData").get(verifyJwt,getUserData)


export default router;
