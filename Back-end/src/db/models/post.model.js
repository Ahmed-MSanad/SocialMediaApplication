import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema(
    {
        name: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const postSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
        userName: { type: String, required: true },
        content: {type: String},
        image: { type: String },
        comments: [commentSchema],
    },
    {
        timestamps: true
    }
)

export const Post = model("post",postSchema);