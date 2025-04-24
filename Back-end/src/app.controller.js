import connectDB from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/Errors/global-error.js";
import { notFound } from "./utils/index.js";


const bootstrap = async (app, express) => {

  app.use(express.json());
  await connectDB();
  app.use("/auth", authRouter);

  app.use("/user", userRouter);

  app.all("*", notFound);


  app.use(globalError);
};
export default bootstrap