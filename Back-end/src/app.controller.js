import connectDb from "./db/connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { globalError } from "./utils/Errors/global-error.js";
// import { notFound } from "./utils/index.js";
import messageRoutes from './modules/message/message.service.js';
import cors from 'cors'


const bootstrap = async (app, express) => {
  app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

  app.use(express.json());

  app.use((req, res, next) => {
    console.log('Raw request body:', req.body);
    console.log('Request header:', req.header);
    next();
  });
  
  
  await connectDb();
  
  app.use("/api/message", messageRoutes);
  
  app.use("/api/auth", authRouter);
  
  app.use("/api/user", userRouter);
  
  // app.all("*", notFound);
  
  app.use(globalError);
  
};

export default bootstrap