const { localsName } = require('ejs')
const express = require('express')
const user = require('../models/user')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index',{user:localsName.user||null})
})
router.get('/login', (req, res)=>{
    if(user!=null){
        res.redirect('/dashboard')
    }
    res.render('login',{user:new user})
})
router.get('/register', (req, res)=>{
    if(user!=null){
        res.redirect('/dashboard')
    }
    res.render('register',{user:new user})
})
router.get('/logout', (req,res)=>{
    res.clearCookie("token").status(200)
    res.redirect('/')

})

module.exports = router