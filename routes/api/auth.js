const express = require('express')
const jwt = require("jsonwebtoken")
const { route } = require('..')
const keys = require("../../config/keys")



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

function authenticateToken(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.sendStatus(403)
    }
    try{
        const data = jwt.verify(token, keys.secretOrKey)
        req.user = {}
        req.user.id = data.id
        req.user.name = data.name
        req.user.instructor = data.instructor
        return next()
    }catch{
        return res.sendStatus(403)
    }
}  

//module.exports = router
module.exports = authenticateToken