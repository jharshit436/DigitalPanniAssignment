const bcrypt = require('bcrypt')
const { jwtAuthMiddleware, generatetoken } = require('../service/auth');
const router = require('express').Router();
const userModel = require('../models/user');
const bookModel = require('../models/book');


router.post("/add", jwtAuthMiddleware, async (req, res) => {
    try {
        const existingbook = await bookModel.findOne({ title: req.body.title })
        if (existingbook) {
            return res.status(400).json({ message: 'Book already exists' });
        }
        const userEmail = req.userPayload.email;
        const User = userModel.findOne({ email: userEmail })
        const newBook = new bookModel({
            title: req.body.title,
            publicationYear: req.body.publicationYear,
            author: User._id
        })
        await newBook.save();
        return res.status(200).json({ message: "Book add Successfully" })
    } catch (e) {
        return res.status(500).json({ message: "Server Error" })
    }
})

router.get("/search_all", async (req, res) => {
    try {
        const AllBooks = await bookModel.find();
        res.status(200).json({ data: AllBooks })

    } catch (e) {
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/search_by_user", jwtAuthMiddleware, async (req, res) => {
    try {

        const userEmail = req.userPayload.email;
        const User = await userModel.findOne({ email: userEmail })
        const books = await bookModel.find({ author: User._id })
        res.status(200).json({ data: books })
    } catch (e) {
        res.status(500).json({ message: "Server Error" })
    }
})

router.get("/search_by_year", jwtAuthMiddleware, async (req, res) => {
    try {

        const books = await bookModel.find({ publicationYear: req.body.publicationYear })
        res.status(200).json({ data: books })
    } catch (e) {
        res.status(500).json({ message: "Server Error" })
    }
})
module.exports = router;