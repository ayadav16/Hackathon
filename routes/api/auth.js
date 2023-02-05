const express = require('express')
const jwt = require("jsonwebtoken")
const { route } = require('..')
const keys = require("../../config/keys")
const User = require("../../models/user")


// router.get('/verify', (req,res)=>{
//     const token = req.body.token
//     if(token!=null){
//         const decode = jwt.verify(token, keys.secretOrKey)
//         res.json({
//             login:true,
//             data:decode
//         })
//     }else{
//         res.json({
//             login:false,
//             data:decode
//         })
//     }
// })

async function authenticateToken(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.sendStatus(403)
    }
    try{
        const data = jwt.verify(token, keys.secretOrKey)
        let user = await User.findById(data.id)
        if(!user){
            return res.sendStatus(404)
        }
        req.user = {}
        req.user.id = data.id
        req.user.name = data.name
        req.user.instructor = data.instructor
        return next()
    }catch{
        return res.sendStatus(403)
    }
}  

async function isLoggedIn(req){
    const token = req.cookies.token
    if(!token){
        return false
    }
    try{
        const data = jwt.verify(token, keys.secretOrKey)
        let user = await User.findById(data.id)
        if(!user){
            return false
        }
        return true
    }catch{
        return false
    }
}  


//module.exports = router
module.exports = authenticateToken
module.exports.isLoggedIn = isLoggedIn