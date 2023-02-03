////////////////////////
// Setup - Imports
////////////////////////
import express from 'express'
import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
///////////////////////
// Declare Router and Routes
///////////////////////
const router = express.Router()

// Signup POST
router.post("/signup", async (req, res) => {
    try {
        // encrypt by hasing password
        req.body.password = await bcrypt.hash(
            req.body.password, 
            await bcrypt.genSalt(10)
        )
        // generate the user
        await User.create(req.body)
        // response
        res.json({status: 'User Created'})
    } catch (err) {
        res.status(400).json({err})
    }
})

// Login POST
router.post("/login", async (req, res) => {
    try {
        // destructure req.body
        const {username, password} = req.body
        // get user
        const user = await User.findOne({username})
        // condtional does user exist
        if (user){
            // check the password
            const passwordCheck = await bcrypt.compare(password, user.password)
            if (passwordCheck){
                // remove password from user data
                const userData = { username }
                // sign token
                const token = await jwt.sign(userData, process.env.SECRET)
                // respond with token, httpOnly prevents frontend from touching the token, send json with user data
                res
                .cookie("token", token, { httpOnly: true })
                .json({userData, status: "logged in"})
            } else {
                res.status(400).json({error: "Password doesn't match"})
            }
        } else {
            res.status(400).json({error: "User does not exist"})
        }
    } catch (err) {
        res.status(400).json({err})
    }
})

// Logout POST
router.post("/logout", async (req, res) => {
    // destroy cookie
    res.clearCookie("token").json({ status: "logged out"})
})

///////////////////////
// Exports
///////////////////////
export default router