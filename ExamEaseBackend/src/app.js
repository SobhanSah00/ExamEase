import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes decalration
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import repoRouter from "./routes/repo.routes.js";

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter); 
app.use("/api/v1/repos", repoRouter);


export { app };