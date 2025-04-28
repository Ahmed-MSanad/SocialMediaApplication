import connectDb from "./db/connection.js";
import cors from 'cors';
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/Errors/global-error.js";
// import { notFound } from "./utils/index.js";
import messageRoutes from './modules/message/message.service.js';
import postRoute from './modules/post/post.controller.js';
import commentRoute from './modules/comment/comment.controller.js';

const bootstrap = async (app, express) => {
  app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));

  app.use(express.json());

  await connectDb();

  app.use("/api/message", messageRoutes);

  app.use("/api/auth", authRouter);

  app.use("/api/user", userRouter);

  app.use("/api/post",postRoute);

  app.use("/api/comment",commentRoute);

  // app.all("*", notFound);

  app.use(globalError);
};

export default bootstrap