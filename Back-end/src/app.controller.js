import connectDb from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/Errors/global-error.js";
// import { notFound } from "./utils/index.js";
import messageRoutes from './modules/message/message.service.js';


const bootstrap = async (app, express) => {
  app.use(express.json());

  await connectDb();

  app.use("/api/message", messageRoutes);

  app.use("/api/auth", authRouter);

  app.use("/api/user", userRouter);

  // app.all("*", notFound);

  app.use(globalError);
};

export default bootstrap