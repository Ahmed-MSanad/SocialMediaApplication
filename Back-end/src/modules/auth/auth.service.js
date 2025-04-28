import User from "../../db/models/user.model.js";
import { asyncHandler, compare, encrypt, generateToken, hash} from "../../utils/index.js";
import { messages } from "../../utils/Messages/index.js";

export const register = asyncHandler(async (req, res, next) => {
  try {
    console.log('Request body:', req.body);
    const { fullName, email, password, phone, gender, profilePicture } = req.body;
    const createdUser = await User.create({
      fullName,
      email,
      password: hash({ password }),
      phone: encrypt({ data: phone }),
      gender,
      profilePicture
    });
    return res.status(201).json({
      success: true,
      message: messages.user.createdSuccessfully
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }

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