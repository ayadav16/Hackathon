const express = require('express')
const { route } = require('..')
const router = express.Router()
const authenticateToken = require('../api/auth')

router.get('/',authenticateToken, (req,res)=>{
    if(req.user.instructor){
        res.redirect('/dashboard/instructor')
    }else{
        res.redirect('/dashboard/student')
    }
})

router.get('/student',authenticateToken,(req,res)=>{
    res.render('dashboard/student', {user:req.user})
})

router.get('/instructor',authenticateToken,(req,res)=>{
    res.render('dashboard/instructor', {user:req.user})
})




module.exports = router