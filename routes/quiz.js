const express = require('express')
const router = express.Router()
const authenticateToken = require('./api/auth')
const Quiz = require('../models/quiz')

router.get('/',authenticateToken,async (req,res)=>{
    const quiz = await Quiz.find({status:true})
    res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})

router.get('/take',authenticateToken,async (req,res)=>{
    const quiz = await Quiz.find({status:true})
    res.render('quiz/quiz',{user:req.user, quizzes:quiz})
})
router.get('/submitted',authenticateToken,(req,res)=>{
    res.render('quiz/submitted',{user:req.user})
})

router.get('/new',authenticateToken,(req,res)=>{
    if(!req.user.instructor){
        res.sendStatus(403)
    }
    res.render('quiz/new', { quiz: new Quiz()})
})

router.post('/',authenticateToken,async (req,res)=>{
    const quiz = new Quiz({
        title:req.body.title,
        status:req.body.status=="on"?true:false,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        ip:req.body.ip
    })
    try{
        const newQuiz = await quiz.save()
        res.redirect('/dashboard')
    }catch(e){
        console.log(quiz)
        console.log(e)
        res.render('quiz/new',{quiz:quiz,errorMessage:"Cannot create quiz"})
    }
})

router.get("/:id", async (req,res)=>{
    const quiz = await Quiz.findById(req.params.id,{id:1,title:1})
    res.render('quiz/take',{quiz:quiz})
})

router.post("take/:id", async (req,res)=>{
    const submission = new Submission({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        ip: req.body.ip,
        quiz:req.body.quiz
    })
    try{
        const newsubmission= await submission.save()
        res.redirect('/dashboard')
    }catch(e){
        console.log(submission)
        console.log(e)
        res.render('quiz/take/',{quiz:quiz,errorMessage:"Cannot submit quiz"})
    }
})

module.exports = router