// import express from "express";

// import cors from "cors";
// import authRouter from "./routes/auth.js";
// import departmentRouter from "./routes/department.js";
// import employeeRouter from "./routes/employee.js";
// import salaryRouter from "./routes/salary.js"
// import connectTodatabase from "./db/db.js";
// import leaveRouter from "./routes/leave.js"
// import settingRouter from "./routes/setting.js"
// import dashboardRouter from "./routes/dashboard.js"
// connectTodatabase();
// const app = express();
// // app.use(cors());
// app.use(cors({
//   origin:"https://employee-frontend-ebon.vercel.app",
//   credentials:true
// }))
// app.use(express.json());
// app.use(express.static("public/uploads"))
// app.use("/api/auth", authRouter);
// app.use("/api/department", departmentRouter);
// app.use("/api/employee", employeeRouter);
// app.use("/api/salary",salaryRouter)
// app.use("/api/leave",leaveRouter)
// app.use("/api/setting",settingRouter)
// app.use("/api/dashboard",dashboardRouter)


// app.listen(5000, () => {
//   console.log("server has running at 5000");
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db/db.js";

// Import Routes
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";

// Load Environment Variables
dotenv.config();

// Connect to Database
connectToDatabase();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ["https://employee-frontend-ebon.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());
app.use(express.static("public/uploads"));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/api/dashboard", dashboardRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
