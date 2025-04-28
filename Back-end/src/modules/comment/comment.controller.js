import { Router } from "express";
import * as commentService from "./comment.service.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/post/:postId/comment",isAuthenticate,commentService.createComment);

router.delete("/post/:postId/comment/:commentId",commentService.deleteComment);

router.get("/post/:postId/comments",commentService.getPostComments);


export default router;