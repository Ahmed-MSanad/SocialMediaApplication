import { model, Schema } from "mongoose";

const commentSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

export const Comment = model("Comment",commentSchema);