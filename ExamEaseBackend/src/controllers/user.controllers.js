import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccesstokenAndRefreshTokens = async (userId) => {    
  try {
    // 1 . create refresh token
    const user = await User.findById(userId);

    const accessToken = user.generateAccesstoken();
    const refreshToken = user.generateRefreshToken(); 

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, age, gender, address, skills } = req.body;

  if (
    [fullName, email, username, password, gender, address, age].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const skillsArray = Array.isArray(skills) ? skills : typeof skills === 'string' ? skills.split(',').map((s) => s.trim()) : [];

  if (skillsArray.length === 0 || !skillsArray.every(skill => typeof skill === 'string')) {
    throw new ApiError(400, "Skills must be a non-empty array of strings");
  }


  // if (!Array.isArray(skills) || skills.length === 0 || !skills.every(skill => typeof skill === 'string')) {
  //   throw new ApiError(400, "Skills must be a non-empty array of strings");
  // }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarFile = req.files?.avatar?.[0];
  const resumeFile = req.files?.resume?.[0];

  if (!avatarFile || !resumeFile) {
    throw new ApiError(400, "Both avatar and resume are required");
  }

  const avatar = await uploadonCloudinary(avatarFile.path);
  const resume = await uploadonCloudinary(resumeFile.path);

  if (!avatar || !resume) {
    throw new ApiError(500, "Error uploading files to Cloudinary");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    resume: resume.url,
    email,
    username: username.toLowerCase(),
    password,
    age,
    gender,
    address,
    skills
  });

  const created_user = await User.findById(user._id).select("-password -refreshToken");

  if (!created_user) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res.status(201).json(new ApiResponse(200, created_user, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
 

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Please provide username or email");
  }

  /*
  await User.findOne({
    $or: [
      { email },
      { username }
    ]
  })
  .catch(() => {
    throw new ApiError(404, "Please sign up first");
  });
  */
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(404, "Please sign up first");
  }

  const isPasswordValidawait = user.isPasswordCorrect(password);

  if (!isPasswordValidawait) {
    throw new ApiError(401, "Please provide valid password");
  }

  const { accessToken, refreshToken } =
    await generateAccesstokenAndRefreshTokens(user._id);

  const loginuser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loginuser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "invalid refresh Token .");
    }

    if (incomingRefreshToken != user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccesstokenAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed "
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  /* 
  we can also work this we can extract the conform password and then check with new password , if 
  it is correct then procide , if it is not then give a ApiError code and message
  */

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Passwrod Changed Successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // Step 1: Retrieve New Avatar Local Path
  const newAvatarLocalPath = req.file?.path;

  if (!newAvatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  // Step 2: Upload New Avatar to Cloudinary
  const newAvatar = await uploadonCloudinary(newAvatarLocalPath);

  if (!newAvatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  // Step 3: Retrieve User Document and Previous Avatar URL
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const previousAvatarURL = user.avatar;

  // Step 4: Delete Previous Avatar from Cloudinary
  if (previousAvatarURL) {
    const publicId = previousAvatarURL.split("/").pop().split(".")[0];
    await deleteOnCloudinary(publicId);
  }

  // Step 5: Update User's Avatar URL
  user.avatar = newAvatar.url;
  await user.save();

  // Step 6: Respond with Success
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

const updateUserResume = asyncHandler(async (req,res) => {
  
  const newResumePath = req.file?.path;

  if (!newResumePath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const newResume = await uploadonCloudinary(newResumePath);

  if (!newResume.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const previousResumeURL = user.resume;

  if (previousResumeURL) {
    const publicId = previousResumeURL.split("/").pop().split(".")[0];
    await deleteOnCloudinary(publicId);
  }

  user.resume = newResume.url;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Resume image updated successfully"));
})

const getUserData = asyncHandler(async (req,res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, user, "User data retrieved successfully"));
})

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentUserPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserResume,
  getUserData
};