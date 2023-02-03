////////////////////////
// Setup - Import deps and create app object
////////////////////////

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

//////////////////////
// Declare Middleware
//////////////////////
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

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