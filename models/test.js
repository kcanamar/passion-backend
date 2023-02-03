////////////////////////
// Setup 
////////////////////////
import mongoose from "../config/db.js";

const { Schema, model } = mongoose;

const testSchema = new Schema({
    title: String,
    msg: String,
    username: String
}, {timestamps: true})

const Test = model("Test", testSchema)
///////////////////////
// Exports
///////////////////////
export default Test