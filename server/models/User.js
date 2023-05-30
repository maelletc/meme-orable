import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        min: 3,
        max: 32,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        max: 32,
    },
    password: {
        type: String,
        required: true,
        min: 6,   
    }
},
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;