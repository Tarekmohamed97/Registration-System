const router = require('express').Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

router.post("/register", async (req, res) => {

    try{
        let {email, password, passwordCheck, displayname} = req.body;
        //validate
        if(!email || !password || !passwordCheck){
            return res.status(400).json({msg: 'not all field have been filled'});
        }

        if(password.length < 5)
            return res.status(400).json({msg: "password must be more than 5 character"});

        if(password !== passwordCheck){
            res.status(400)
                .json({msg: "password and passwordCheck must be the same"})
        }

        const existingUser = await User.findOne({email: email})
        if(existingUser){
            res.status(400).json({msg: "email already exists"})
        }

        if(!displayname)
            displayname = email

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            email,
            password: hashedPassword,
            displayname
        });
        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        res.status(500).json( {error: err.message} )
    }
})


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body

        //validate
        if(!email || !password)
            return res.status(400).json({msg: 'not all field have been filled'});

        const user = await User.findOne({email: email});
        if(!user)
            return res.status(400).json({msg: 'no account with this email has been registred'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({msg: "invalid login data"});

        const token = jwt.sign({id: user._id}, process.env.JWT_PASSWORD);

        res.json({
            token,
            user : {
                id: user._id,
                displayname: user.displayname,
                //email: user.email
            },
        });
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

router.delete('/delete', auth, async (req, res) => {
    try{
        const deletedUser = await User.findOneAndDelete(req.user);
        res.json(deletedUser);
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})


router.post("/tokenIsValid", async (req, res) => {
    try{
        const token = req.header("x-auth-token");
        if(!token)
            return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_PASSWORD)
        if(!verified)
            return res.json(false);

        const user = await User.findById(verified.id);
        if(!user)
            return res.json(false)
        return res.json(true)
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})

router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayname: user.displayname,
        id: user._id
    });
});

module.exports = router;