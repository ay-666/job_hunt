import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const file = req.file;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        msg: "Some inputs are missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    //existing user or not
    if (user) {
      return res.status(400).json({
        msg: "User already exists with this email",
        success: false,
      });
    }

    let profilePic = "";


    

    const hashedPassword = await bcrypt.hash(password, 10);

    //creating user
    const newUser = await User.create({
      fullname: fullname,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      role: role,
      profile:{
        profilePic: profilePic
      }
    });

    if(file){
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
        public_id:`${newUser._id}/profilepic`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      if(cloudResponse){
        profilePic = cloudResponse.secure_url;
        newUser.profile.profilePic = profilePic;
      }

    }

    newUser.save();


    
    return res.status(200).json({
      msg: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        msg: "Some inputs are missing",
        success: false,
      });
    }
    //user exists or not
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User does not exists with this email",
        success: false,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    //password macth
    if (!match) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        success: false,
      });
    }

    // check role is correct  or not

    if (role !== user.role) {
      return res.status(400).json({
        msg: "Account doesn't exits with current role",
        success: false,
      });
    }

    //siging jwt token
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("jwtToken", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
      })
      .json({
        msg: "Welcome back," + user.fullname,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('jwtToken',{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path:'/'
    });
    return res.status(200).json({
      msg: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;


    if (!fullname && !email && !phoneNumber && !bio && !skills) {
      return res.status(400).json({
        msg: "Inputs are missing",
        success: false,
      });
    }

    // authntication of user or verification

    const userId = req.id;

    let user = await User.findById(userId);

    // check whether user exists or not

    if (!user) {
      return res.status(400).json({
        msg: "User does not exists",
        success: false,
      });
    }

    //updating data

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      const skillsArray = skills.split(",");
      user.profile.skills = skillsArray;
    }

    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
        public_id:`${user._id}/resume`,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      if (cloudResponse) {
        // save the cloudinary url

        

        user.profile.resume = cloudResponse.secure_url;

        // save original file name
        user.profile.resumeName = file.originalname;
      }
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      msg: "Profile updated",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// module.exports = {register , login , logout , updateProfile };
