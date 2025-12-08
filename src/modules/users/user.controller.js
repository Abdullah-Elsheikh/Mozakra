import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../db/models/user.model.js";
import dotenv from "dotenv";
import { messages } from "../../../utils/messages.js";


//add user
const addUsers =  async (req, res) => {
    const { userName, name ,password, roles } = req.body;
    const exists = await User.findOne({ userName });
    if (exists) return res.status(409).json({ message: "Username exists" });
    const hash = await bcrypt.hash(password, 12);
    const doc = await User.create({ userName, name, roles, password: hash });
    res.status(201).json({ 
      id: doc._id, 
      userName: doc.userName,
       name: doc.name,
        role: doc.roles });
  }


//login
const login = async (req, res, next) => {
  
    const { userName, password } = req.body;

    // Find user by userName including password
    const user = await User.findOne({ userName }).select("+password");

    // Check if user exists and password is correct
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: messages.auth.invalidCredentials });
    }

    // Remove password from user object
    user.password = undefined;

    // Generate token 
    const token = jwt.sign(
      { _id: user._id,userName: user.userName },
      process.env.JWT_SECRET || " ",
      { expiresIn: "7d" }
    );


    res.status(200).json({
      success: true,
      message: messages.auth.loginSuccessful,
      user: {
        _id: user._id,
        userName: user.userName,
        name: user.name,
        roles : user.roles,
        phone : user.phone
      },
      token,
    });
  
};


//add user only admin
const addUserByAdmin = async (req, res) => {
  const { userName,name, password, phone } = req.body;
  const userExists = await User.findOne({ userName });
  if (userExists) return res.status(409).json({ message: "Username exists" });
  const hash = await bcrypt.hash(password, 12);
  const doc = await User.create({ userName, name, roles:"student",password: hash, phone });
  res.status(201).json({ 
    message: "User created successfully",
    id: doc._id,
     userName: doc.userName ,
     name: doc.name,
      roles: doc.roles,
      phone: doc.phone
     });
};

//update password by admin
const updatePasswordByAdmin = async(req,res,next)=>{
  const { userName } = req.body;
  const { newPassword } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.password = await bcrypt.hash(newPassword, 12);
  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

//upate user by admin
const updateUserByAdmin = async(req,res,next)=>{
  const { id } = req.params;
  const { name, phone } = req.body;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name;
  user.phone = phone;
  await user.save();
  res.status(200).json({ message: "User updated successfully" });
};

  export { addUsers , login , addUserByAdmin , updatePasswordByAdmin , updateUserByAdmin };