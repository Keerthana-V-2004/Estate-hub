import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type : String,
    required:true,
    unique:true
  },
  username: {
    type : String,
    required:true,
    unique:true
  },
  username: {
    type : String,
    required:true,
    
  }

},{timestamps:true}); //User login time and logout time is recorded

const User = mongoose.model('User',userSchema);

export default User;