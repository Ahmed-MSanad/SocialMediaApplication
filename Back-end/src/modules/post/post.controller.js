import { Router } from "express";
import * as postService from "./post.service.js";
import { isAuthenticate } from "../../middlewares/auth.middleware.js";
const router = Router();

router.post("/post",isAuthenticate,postService.createPost)

router.delete("/post/:id",isAuthenticate,postService.deletePost)

router.patch("/post/:id",isAuthenticate,postService.editPost)

router.get("/myposts",isAuthenticate,postService.getMyPosts)

export default router;