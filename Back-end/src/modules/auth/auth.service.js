import { User } from "../../db/models/user.model.js";
import { asyncHandler, compare, encrypt, generateToken, hash} from "../../utils/index.js";
import { messages } from "../../utils/Messages/index.js";

export const register = asyncHandler(async (req, res, next) => {

  const { userName, email, password, phone } = req.body;
  

  const createdUser = await User.create({
    userName,
    email,
    password: hash({ password }),
    phone: encrypt({ data: phone }),
  });
  

  return res.status(201).json({
    success: true,
    message: messages.user.createdSuccessfully
  });

});

export const login = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body;


  const userExist = await User.findOne({ email });
 
  if (!userExist) {
    return next(new Error(messages.user.Credentials, { cause: 401 }));
  }
  const match = compare({ password, hashedPassword: userExist.password })
  if (!match) {
    return next(new Error(messages.user.Credentials, { cause: 401 }));
  }


const Token = generateToken({
  payload: { email, id: userExist._id },
  options: { expiresIn: "1d" },
});



return res.status(200).json({
  success: true,
  message: "login successfully",
  token: Token
});


})