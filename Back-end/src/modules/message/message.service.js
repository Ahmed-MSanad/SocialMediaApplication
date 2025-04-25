import express from "express";
import { getUsersList, getOtherUserChattingMessages, sendMessage } from "./message.controller.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", isAuthenticate, getUsersList);
router.get("/:otherUserId", isAuthenticate, getOtherUserChattingMessages);

router.post("/send/:sendToUserId", isAuthenticate, sendMessage);

export default router;