import User from "../../db/models/user.model.js";
import { asyncHandler, messages , decrypt } from "../../utils/index.js";


export const getProfile =asyncHandler(async (req, res) => {
  const userEmail = req.authUser.email;


  // Fetch the authenticated user's profile
  const user = await User.findOne({ email: userEmail });

  if (!user) return res.status(404).json({ message: messages.user.notFound });


  const decryptedPhoneNumber = decrypt({ encryptedData: user.phone});


  res.status(200).json({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: decryptedPhoneNumber,
    profilePicture: user.profilePicture
  });
});

  