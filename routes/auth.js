
const bcrypt = require('bcrypt')
const {jwtAuthMiddleware,generatetoken}=require('../service/auth');
const userModel = require('../models/user');

const router=require('express').Router();

router.post("/signup", async(req,res)=>{
    try {
        // check uniqueness of the user 
        const existingUser = await userModel.findOne({email: req.body.email});
        
        // if user already exists 
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // encrypt the password using bycrypt
        const HashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: HashedPassword,
        })
        // save data in database 
        await user.save();

        const payload={email:req.body.email};

        // create token 
        const token=generatetoken(payload,process.env.JWT_SECRET)

        res.status(200).json({ message: 'User created successfully', token:token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Server error' })
    }
})

router.post("/login",async(req,res)=>{
			const { email, password } = req.body;

            // check user exists or not 
			const user = await userModel.findOne({ email })
            // if user not exists 
			if (!user) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}

            // password Compare 
			const isMatch = await bcrypt.compare(password, user.password);
            
            // wrong password 
			if (!isMatch) {
				return res.status(401).json({ error: 'Invalid credentials' });
			}
			// Create a token payload with user information
			const tokenPayload = { email: user.email };

			// Sign the token using the secret key
			const accessToken = generatetoken({email:req.body.email});
			
			// Send the token as a response
			res.status(200).json({ message:"User Sucessfully Authenticated" , token: accessToken });
})
module.exports=router