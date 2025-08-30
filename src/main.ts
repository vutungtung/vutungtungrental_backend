import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./Router/userRouter";
import { loginRouter, logoutRouter } from "./Router/loginRouter";
import cookieParser from "cookie-parser";
import { vehicleRouter } from "./Router/vehicleRouter";
import { categoryRouter } from "./Router/categoryRouter";
import { bookingRouter } from "./Router/bookingRouter";
import session from "express-session";
import resetPasswordRouter from "./Router/resetPasswordRoutes";

const app = express();
const PORT = 4000;
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET || "somesecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 }, // 15 min
  })
);
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (req.session && typeof req.session.save === "function") {
      req.session.save((err) => {
        if (err) console.error("Session save error:", err);
        originalSend.call(this, body);
      });
    } else {
      originalSend.call(this, body);
    }
    return this;
  };
  next();
});

app.use("/user", userRouter);
app.use("/userlogin", loginRouter);
app.use("/userlogout", logoutRouter);
app.use("/userlogin/reset-password", resetPasswordRouter);
app.use("/vehicle/book", bookingRouter);
app.use("/api/vehicles", vehicleRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
