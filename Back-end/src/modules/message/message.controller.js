import User from "../../db/models/user.model.js";
import Message from "../../db/models/message.model.js";

export const getUsersList = async (req, res) => {
    try{
        const currentlyLoggedInUserId = req.authUser._id;
        const otherUsers = await User.find({_id: {$ne:currentlyLoggedInUserId}}).select("-password");

        res.status(200).json(otherUsers);
    }catch(error){
        console.log("Error in getUsersList controller => ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getOtherUserChattingMessages = async (req, res) => {
    try{
        const { otherUserId } = req.params;
        const currentlyLoggedInUserId = req.authUser._id;

        const messagesBetweenThem = await Message.find({
            $or:[
                {senderId: currentlyLoggedInUserId, receiverID: otherUserId},
                {senderId: otherUserId, receiverID: currentlyLoggedInUserId}
            ]
        });

        res.status(200).json(messagesBetweenThem);
    }catch(error){
        console.log("Error in getUserMessages controller => ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try{
        const { text } = req.body;
        const { sendToUserId } = req.params;
        const currentlyLoggedInUserId = req.authUser._id;

        const theMessage = new Message({
            senderId: currentlyLoggedInUserId,
            receiverID: sendToUserId,
            text,
        });

        await theMessage.save();

        res.status(201).json(theMessage);

    }catch(error){
        console.log("Error in sendMessage controller => ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

