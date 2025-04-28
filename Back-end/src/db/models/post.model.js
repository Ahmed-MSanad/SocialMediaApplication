import { model, Schema } from "mongoose";


const postSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        userName: { type: String, required: true },
        content: {type: String},
        image: { type: String },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
    },
    {
        timestamps: true
    }
)

export const Post = model("post",postSchema);