import { Comment } from "../../db/models/comment.model.js";
import { Post } from "../../db/models/post.model.js";
import { asyncHandler, messages } from "../../utils/index.js";

export const createComment = asyncHandler(async (req, res) => {
    
        const { postId } = req.params;
        const userId = req.authUser._id;
        const name = req.authUser.fullName;
        const { text } = req.body;
        
        const newComment = await Comment.create({
            userId: userId,
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
    
})

export const deleteComment = asyncHandler(async (req, res) => {
 
        const userId = req.authUser._id;
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment Not Found" });
        }

        if(!comment.userId.equals(userId) && !post.userId.equals(userId)){
            return res.status(401).json({message: "Unauthorized To Remove The Comment"});
        }
        post.comments.pull(commentId);
        await post.save();
        await Comment.findByIdAndDelete(commentId);

        return res.status(200).json({ message: "Comment Deleted Successfully" });
    
})

export const getPostComments = asyncHandler(async (req, res) => {
    
        const { postId } = req.params;
        const post = await Post.findById(postId).populate('comments');
        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }
        return res.status(200).json({ comments: post.comments });
    

})