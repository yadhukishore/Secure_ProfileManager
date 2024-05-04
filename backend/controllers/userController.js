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
  res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
  })
  res.status(200).json({ message: "User Logged out" });
});
// get user
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name:req.user.name,
    email:req.user.email
  }
  res.status(200).json(user);
});
//update user
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user){
      user.name = req.body.name || user.name;
      user.email= req.body.email || user.email;

      if(req.body.password){
        user.password = req.body.password;
      }
      const updateUser = await user.save();
      res.status(200).json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
      })
  }else{
    res.status(404);
    throw new Error('User Nott Found!')
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
