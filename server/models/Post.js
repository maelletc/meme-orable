import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    pseudo:{
        type: String,
        required: true,
    },
    timeEnd:{
        type: Date,
        required: true,
    },
    picturePath:{
        type: String,
        required: true,
    },
    likes:{
        type: Map,
        of: Boolean,
    },
    description:{
        type: String,
        max: 500,
    }

},{timestamps: true});

const Post = mongoose.model("Post",postSchema);

export default Post;