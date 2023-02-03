////////////////////////
// Setup 
////////////////////////
import mongoose from "../config/db.js";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const User = model("User", userSchema)
///////////////////////
// Exports
///////////////////////
export default User