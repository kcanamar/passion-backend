////////////////////////
// Setup 
////////////////////////
import express from 'express'
import Test from "../models/test.js"
import isAuth from '../utils/isAuth.js'

///////////////////////
// Declare Router and Routes
///////////////////////
const router = express.Router()

// mount authentication middleware
router.use(isAuth)

// Index 
router.get("/", async (req, res ) => {
    try {
        // grab the username from the payload defined in isAuth
        const username = req.payload.username
        // get all tests from the same user
        const tests = await Test.find({username})
        // send response as json
        res.json(tests)
    } catch (error) {
        res.status(400).json({error})
    }
})

// Show
router.get("/:id", async (req, res ) => {
    try {
        // grab the username from the payload defined in isAuth
        const username = req.payload.username
        // get one test from the username && request params id 
        const test = await Test.findOne({username, _id: req.params.id})
        // send response as json
        res.json(test)
    } catch (error) {
        res.status(400).json({error})
    }
})

// Create
router.post("/", async (req, res ) => {
    try {
        // grab the username from the payload defined in isAuth
        const username = req.payload.username
        // assign the username to req.body
        req.body.username = username
        //  create the test object
        const test = await Test.create(req.body)
        // send response as json
        res.json(test)
    } catch (error) {
        res.status(400).json({error})
    }
})

// Update
router.put("/:id", async (req, res ) => {
    try {
        // grab the username from the payload defined in isAuth
        const username = req.payload.username
        // assign the username to req.body
        req.body.username = username
        //  update the test object
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // send response as json
        res.json(test)
    } catch (error) {
        res.status(400).json({error})
    }
})

// Destroy
router.delete("/:id", async (req, res ) => {
    try {
        // grab the username from the payload defined in isAuth
        const username = req.payload.username
        // assign the username to req.body
        req.body.username = username
        //  delete the test object mathcing request params && username
        const test = await Test.deleteOne({_id: req.params.id, username})
        // send response as json
        res.json(test)
    } catch (error) {
        res.status(400).json({error})
    }
})

///////////////////////
// Exports
///////////////////////
export default router