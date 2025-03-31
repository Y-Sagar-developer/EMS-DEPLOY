// import mongoose from "mongoose";

// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/ems", {
//       serverSelectionTimeoutMS: 5000, // Prevents long wait times
//     });
//     console.log("✅ MongoDB connected successfully!");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//   }
// };

// export default connectToDatabase;

// import mongoose from "mongoose";

// const connectToDatabase = async () => {
//   try {
//     if (!process.env.MONGODB_URL) {
//       throw new Error("MONGODB_URL is not defined in environment variables.");
//     }

//     await mongoose.connect(process.env.MONGODB_URL, {
//       serverSelectionTimeoutMS: 5000, // Prevents long wait times
//     });

//     console.log("✅ MongoDB connected successfully!");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed:", error.message);
//     process.exit(1); // Exit process on failure (useful in production)
//   }
// };

// export default connectToDatabase;


import mongoose from "mongoose";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("❌ MONGODB_URL is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevents long wait times
    });

    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process on failure (useful in production)
  }
};

export default connectToDatabase;
