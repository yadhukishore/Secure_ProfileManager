import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//auth user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  console.log("Email-"+email+"Pass-"+password);
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    console.log("Sucess",user);
  } else {
    res.status(401);
    throw new Error("Invalid email or Password!!");
  }
});

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User alredy Exists...!");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  console.log("user:- ", user);
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data!");
  }
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});
// get user
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});
//update user
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update UserProfile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
