////////////////////////
// Setup - Import deps
////////////////////////
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()
const DATABASE_URL = process.env.DATABASE_URL
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open", () => console.log('Mongo is connected'))
.on("closed", () => console.log('Mongo is disconnected'))
.on("error", (err) => console.log(err))
///////////////////////
// Exports
///////////////////////
export default mongoose