const router = require('express').Router();
const User = require("../models/userModel")

router.post("/register", async (req, res) => {

    try{
        const {email, password, passwordCheck, displayname} = req.body;
        //validate
        if(!email || !password || !passwordCheck){
            return res.status(404).json({msg: 'not all field have been filled'});
        }

        if(password.length < 5)
            return res.status(404).json({msg: "password must be more than 5 character"});

        if(password !== passwordCheck){
            res.status(404)
                .json({msg: "password and passwordCheck must be the same"})
        }

        const existingUser = await User.find({email: email})
        if(existingUser){
            res.status(404).json({msg: "email already exists"})
        }
    } catch (err) {
        res.status(500).json( err )
    }
})

module.exports = router;