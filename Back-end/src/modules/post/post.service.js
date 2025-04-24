import {Post} from "../../db/models/post.model.js"
import { asyncHandler } from "../../utils/index.js"

export const createPost = asyncHandler(async (req,res)=>{
    const userId = req.authUser._id;
    const userName = req.authUser.userName;
    const { content, image } = req.body;

    if(!content && !image){
        return res.status(400).json({
            message: "Enter Text or Image or both."
        });
    }

    const post = {
        userId:userId,
        userName:userName,
        content:content||null,
        image:image||null,
        comments: []
    };

    const newPost = await Post.create(post);

    res.status(201).json({
        message: "Post created successfully!",
        post: newPost,
    });
    
})

export const deletePost = asyncHandler(async (req,res)=>{
    const {id}  = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        return res.status(404).json({
             message: 'Post not found.'
        });
    }

    res.status(200).json({
         message: 'Post deleted successfully.'
        });
});

export const editPost = asyncHandler(async (req,res)=>{
    const {id} = req.params
    const {content,image} = req.body
    if(!content && !image){
        return res.status(400).json({
            message: "Enter Text or Image or both."
        });
    }
    const post = await Post.findByIdAndUpdate(id,{
        content:content,
        image:image
    },{new:true});

    if(!post){
        return res.status(500).json({ message: "Couldn't Update Post" });
    }
    
    return res.status(200).json({message:"Updated Successfully"})
    
});

export const getMyPosts = asyncHandler(async (req,res)=>{
    const userId = req.authUser._id;
    const posts = await Post.find({ userId });
    if (!posts || posts.length === 0) {
        return res.status(404).json({
          message: "No posts found for this user"
        });
      }
    return res.status(200).json({posts});
});