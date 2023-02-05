const { localsName } = require('ejs')
const express = require('express')
const user = require('../models/user')
const router = express.Router()
const auth = require('../routes/api/auth')

router.get('/', async (req,res)=>{
    if(await auth.isLoggedIn(req)){
        res.redirect('/dashboard')
    }
    res.render('index',{user:localsName.user||null})
})
router.get('/login', async (req, res)=>{
    if(await auth.isLoggedIn(req)){
        res.redirect('/dashboard')
    }
    res.render('login',{user:new user})
})
router.get('/register', async (req, res)=>{
    if(await auth.isLoggedIn(req)){
        res.redirect('/dashboard')
    }
    res.render('register',{user:new user})
})
router.get('/logout', async (req,res)=>{
    if(await auth.isLoggedIn(req)){
        res.clearCookie("token").status(200)
        
    }
    res.redirect('/')


})

module.exports = router