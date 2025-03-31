// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const verifyUser = async (req, res, next) => {
//   try {
//     // Check if the token exists
//     if (!req.headers.authorization) {
//       return res.status(401).json({ success: false, error: "Token not provided" });
//     }

//     const token = req.headers.authorization.split(" ")[1];

//     // Verify the token
//     const decoded = jwt.verify(token, "sagarsecretkey");

//     // Find user from token
//     const user = await User.findById(decoded._id).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, error: "User not found" });
//     }

//     req.user = user; // Attach user to request
//     next(); // Call the next middleware
//   } catch (error) {
//     console.error("JWT Verification Error:", error.message);

//     return res.status(401).json({ success: false, error: "Invalid or expired token" });
//   }
// };

// export default verifyUser;


import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const verifyUser = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, error: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user from token
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    // Handle token expiration and invalid token separately
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: "Session expired. Please log in again." });
    }

    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

export default verifyUser;
