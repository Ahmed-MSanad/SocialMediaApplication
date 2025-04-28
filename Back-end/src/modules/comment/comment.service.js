import { Comment } from "../../db/models/comment.model.js";
import { Post } from "../../db/models/post.model.js";
import { asyncHandler } from "../../utils/index.js";

export const createComment = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const name = req.authUser.fullName;
        const { text } = req.body;
        
        const newComment = await Comment.create({
            name: name,
            text: text
        })

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        post.comments.push(newComment._id);
        await post.save()

        res.status(201).json({ message: "Comment Created Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);
        post.comments.pull(commentId);
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({ message: "Comment Deleted Successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export const getPostComments = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('comments');
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        return res.status(200).json({ comments: post.comments });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }

})