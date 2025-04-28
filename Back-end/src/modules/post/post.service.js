import { Post } from "../../db/models/post.model.js"
import { asyncHandler } from "../../utils/index.js"

export const createPost = asyncHandler(async (req, res) => {
    try {
        const userId = req.authUser._id;
        const userName = req.authUser.fullName;
        
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


        await Post.create(post);

        return res.status(201).json({ message: "Post Created Successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

})

export const deletePost = asyncHandler(async (req, res) => {
    try {
        const userId = req.authUser._id;
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if(!post.userId.equals(userId)){
            return res.status(401).json({message: "Unauthorized To Remove The Post"});
        }

        await post.deleteOne();

        return res.status(200).json({ message: "Post Deleted Successfully" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

export const editPost = asyncHandler(async (req, res) => {
    try {
        const userId = req.authUser._id;
        const { id } = req.params
        const { content, image } = req.body
        if (!content && !image) {
            return res.status(400).json({
                message: "Enter Text or Image or both."
            });
        }

        const newData = {};
        newData.content = content || null;
        newData.image = image || null;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post Not Found" });
        }

        if(!post.userId.equals(userId)){
            return res.status(401).json({message: "Unauthorized To Edit The Post"});
        }

        Object.assign(post, newData);

        await post.save();

        return res.status(200).json({ message: "Post Updated Successfully" });
    }
    catch(error){
        return res.status(500).json({ error: error.message });
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
        return res.status(500).json({ error: error.message });
    }
});