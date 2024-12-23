import Repo from "../models/repo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";
import { User } from "../models/user.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";

export const uploadRepo = asyncHandler(async (req, res) => {
  const { title, file } = req.body;
  const userId = req.user._id; 
  const newFileLocalPath = req.file?.path;

  if (!newFileLocalPath) {
    throw new ApiError(400, " file is missing");
  }

  const newFile = await uploadonCloudinary(newFileLocalPath);

  if (!newFile.url) {
    throw new ApiError(400, "Error while uploading file");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const CreatedFile = await Repo.create({
    title: title,
    file: newFile.url,
    createdBy: req.user._id
  })
  return res.status(201).json(CreatedFile);
})

export const editRepo  = asyncHandler(async(req,res) => {
  const {title, file} = req.body;
  const userId = req.user._id;
  const repoId = req.params.id;
  const newFileLocalPath = req.file?.path;
  if (!newFileLocalPath) {
    throw new ApiError(400, " file is missing");
  }
  const newFile = await uploadonCloudinary(newFileLocalPath);
  if (!newFile.url) {
    throw new ApiError(400, "Error while uploading file");
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const updatedFile = await Repo.findByIdAndUpdate(repoId, {
    title: title,
    file: newFile.url,
    updatedBy: req.user._id
  }, {new: true})
    return res.status(200).json(updatedFile);
})

export const deleteRepo = asyncHandler(async(req,res) => {
  const repoId = req.params.id;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const repo = await Repo.findById(repoId);
  if (!repo) {
    throw new ApiError(404, "Repo not found");
  }
  await repo.remove();
  return res.status(200).json({message: "Repo deleted successfully"});
})

export const viewRepo = asyncHandler(async(req,res) => {
  const repoId = req.params.id;
  const repo = await Repo.findById(repoId).populate('file');
  if (!repo) {
    throw new ApiError(404, "Repo not found");
  }
  return res.status(200).json(repo.posts);
})