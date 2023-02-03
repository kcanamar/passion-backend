////////////////////////
// Setup - Import deps and create app
////////////////////////
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import corsOptions from './utils/cors.js'
dotenv.config()
const app = express()
//////////////////////
// Declare Middleware
//////////////////////
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

///////////////////////
// Declare Routes and Routers 
///////////////////////
app.get("/", (req, res) => {
    res.send("It lives")
})

///////////////////////////
// Server Listener
///////////////////////////
const PORT = process.env.PORT  || 4444
app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))