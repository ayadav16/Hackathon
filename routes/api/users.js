const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation


const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/user");


router.post('/register', (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body)
    if(!isValid){
        return res.status(400).render('register',{errorMessage:errors})
    }
    User.findOne({email: req.body.email}).then( user=>{
        if(user){
            return res.status(400).render('register',{user:req.body, errorMessage:"Email already exists, Please login or use another email"})
        }else{
            const newUser = new User({
                name: req.body.name,
                email:req.body.email,
                password: req.body.password,
                instructor: req.body.instructor=="on"?true:false
            });
            try{
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password, salt,(err,hash) =>{
                        if(err){
                            throw err;
                        }
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.redirect('/'))
                            .catch(err => console.log(err))
    
                    })
                })
            }catch{
                res.render('register', {user:newUser})
            }
        }
    })
})


router.post('/login', (req, res) =>{
    const {errors, isValid} = validateLoginInput(req.body)
    if(!isValid)return res.status(400).json(errors)

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user =>{
        if(!user){
            return res.status(404).json({emailNotFound:"Email not Found"})
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(!isMatch){
                return res.status(400).json({passwordIncorrect:"Password incorrect"})
            }else{
                const payload = {
                    id: user.id,
                    name: user.name,
                    instructor: user.instructor
                };
                const token = jwt.sign( payload,keys.secretOrKey,{expiresIn: 7*24*60*60})
                res.cookie("token",token,{
                    httpOnly:true,
                })
                res.redirect('/dashboard')
            }
        })
    })
})

module.exports = router