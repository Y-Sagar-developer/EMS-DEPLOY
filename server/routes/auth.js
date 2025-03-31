// import express from "express";
// import { login, verify } from "../controller/authController.js";
// import authMiddleware from "../middleware/AuthMiddleware.js";

// const router = express.Router();

// router.post("/login", login);

// // ✅ Change POST to GET for verification
// router.get("/verify", authMiddleware, verify);

// export default router;
import express from "express";
import { login, verify } from "../controller/authController.js";
import verifyUser from "../middleware/AuthMiddleware.js"; // Ensure correct import

const router = express.Router();

router.post("/login", login);
router.get("/verify", verifyUser, verify); // ✅ Ensure it's a GET request

export default router;
