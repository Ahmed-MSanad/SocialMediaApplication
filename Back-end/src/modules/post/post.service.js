import { Post } from "../../db/models/post.model.js"
import { asyncHandler } from "../../utils/index.js"

export const createPost = asyncHandler(async (req, res) => {
    try {
        const userId = req.authUser._id;
        const userName = req.authUser.userName;
        const { content, image } = req.body;

        if (!content && !image) {
            return res.status(400).json({
                message: "Enter Text or Image or both."
            });
        }

        const post = {
            userId: userId,
            userName: userName,
            content: content || null,
            image: image || null,
            comments: []
        };

        const newPost = await Post.create(post);

        res.status(201).json({
            message: "Post created successfully!",
            post: newPost,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

})

export const deletePost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                message: 'Post not found.'
            });
        }

        res.status(200).json({
            message: 'Post deleted successfully.'
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

});

export const editPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const { content, image } = req.body
        if (!content && !image) {
            return res.status(400).json({
                message: "Enter Text or Image or both."
            });
        }

        const updateData = {};
        if (content !== undefined) updateData.content = content;
        if (image !== undefined) updateData.image = image;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post updated successfully", });
    }
    catch(error){
        return res.status(500).json("Internal Server Error");
    }
});

export const getMyPosts = asyncHandler(async (req, res) => {
    try {
        const userId = req.authUser._id;
        const posts = await Post.find({ userId });
        if (!posts || posts.length === 0) {
            return res.status(404).json({
                message: "No posts found for this user"
            });
        }
        return res.status(200).json({ posts });
    }
    catch (error) {
        return res.status(500).json("Internal Server Error");
    }
});