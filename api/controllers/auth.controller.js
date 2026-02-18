import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({username, email, password : hashedPassword});
  try{
    await newUser.save();
    res.status(201).json({"newuser":"User created successfully"});

  } catch (err) {
    next(err);

  }
  
}

export const signin = async (req, res, next) => {
  const {email, password} = req.body; 
  try {
    const validUser = await User.findOne({email});
    if(!validUser){
      return next(errorHandler(404, "User not found"));
    } 
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if(!validPassword){
    return next(errorHandler(401, "Invalid credentials"));
  }
  const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
  const {password : hashedPassword, ...rest} = validUser._doc;
  res.status(200).cookie("access_token", token, {httpOnly: true}).json(rest);
  } catch (err) {
    next(err);
  }   
};
export const google = async (req, res, next) => { 
  try {
    const validUser = await User.findOne({email: req.body.email});
    if(validUser){
      const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
      const {password : hashedPassword, ...rest} = validUser._doc;
      res
      .status(200)
      .cookie("access_token", token, {httpOnly: true})
      .json(rest);
    } else{
      const generatedPassword =Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      
      const newUser = new User({
        username: req.body.name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashPassword,
        avatar: req.body.photo,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);
      const {password : hashedPassword, ...rest} = savedUser._doc;
      res
      .status(200)
      .cookie("access_token", token, {httpOnly: true})
      .json(rest);
    }
  } catch (err) {
    next(err);
  }   
};
