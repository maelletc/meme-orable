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
    likes:{
        type: Map,
        of: Boolean,
    },
    comments:{
        type: Array,
        default:[],
    }

},{timestamps: true});

const Post = mongoose.model("Post",postSchema);

export default Post;