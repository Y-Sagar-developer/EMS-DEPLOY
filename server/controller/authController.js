// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, error: "User not found" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(404).json({ success: false, error: "Wrong password" });
//     }

//     // Generate token
//     const token = jwt.sign(
//       { _id: user._id, role: user.role }, // ✅ Make sure role is in token
//       "sagarsecretkey",
//       { expiresIn: "10d" }
//     );

//     // Send success response
//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         role: user.role, // ✅ Ensure role is sent in response
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     return res.status(500).json({ success: false, error: "Server error" });
//   }
// };
// const verify=(req,res)=>{
//   return res.status(200).json({success:true, user:req.user})
// }
// export { login, verify };



import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT Token securely
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET, // 🔐 Use .env instead of hardcoding
      { expiresIn: "10d" }
    );

    // Send success response
    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const verify = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
